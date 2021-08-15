const Router = require("@koa/router");
const EventEmitter = require("events").EventEmitter;

const { Inferno } = require("../core/inferno");
const config = require("../config").core;
const { Submission } = require("../model/submission");
const { Problem } = require("../model/problem");
const {
  InternalServerError,
  RequestError,
  UnprocessableEntityError
} = require("../util/error");

let log = global.log;

const judger = new Router();

function judge(task) {
  let inferno;
  try {
    inferno = new Inferno(emitter.emit.bind(emitter));
    inferno.setJudger(config.direcotry, config.ptrace, config.seccomp, config.rlimit, config.command[task.lang].source, 
      config.command[task.lang].executable, config.command[task.lang].compile, config.command[task.lang].run
    );
    inferno.setTask(task.id, task.tlmt, task.mlmt, task.lang, task.type, task.mode, task.data, task.spj, task.code);
  } catch(err) {
    return Promise.reject(err);
  }
  return new Promise((resolve, reject) => {
    inferno.judgeAsync(result => {
      resolve(result);
    });
  });
}

// Judge controller
judger.post('/submit', async (ctx, next) => {
  // default task object
  const defaultTask = {
    id: "",
    pid: "",
    uid: "",
    lang: 1,
    type: 0,
    mode: 0,
    spj: "",
    code: "",
    mlmt: 5000,
    tlmt: 5000
  }
  if (!ctx.request.body.task) {
    throw new RequestError("[Judge] No task present in request");
  }
  // actual task user submitted
  let userTask = ctx.request.body.task;
  const problemExist = await Problem.exists({_id: userTask.pid});
  if (problemExist) {
    userTask.data = `${config.data}/${userTask.pid}`;
  } else {
    throw new UnprocessableEntityError(`problem id:${userTask.pid} doesn't exists`);
  }
  
  const emitter = new EventEmitter();
  emitter.on("init", () => {
  });
  emitter.on("compile", () => {
  });
  emitter.on("judge", () => {
  });

  // delete params user not supposed to submit
  const dels = ["type", "spj", "mlmt", "tlmt"];
  dels.forEach(val => { if (userTask[val]) { delete userTask[val] } });
  const problem = await Problem.findById({_id: userTask.pid}).exec();
  userTask.spj = problem.specialJudge;
  userTask.mlmt = problem.memoryLimit;
  userTask.tlmt = problem.timeLimit;
  // test critical parameters
  const props = ["uid", "pid", "lang", "code"];
  if (props.every(val => {return userTask[val] && userTask[val] !== undefined})) {
    userTask = {...defaultTask, ...userTask};
  } else {
    throw new RequestError("[Judge] Not enough parameter");
  }

  // save to database
  const submission = new Submission({
    author: userTask.uid,
    problem: userTask.pid,
    language: userTask.lang,
    code: userTask.code,
    mode: userTask.mode,
  });

  const savedSub = await submission.save();
  userTask.id = savedSub._id.toString();
  // judge
  let result;
  try {
    result = await judge(userTask);
  } catch(err) {
    log.error(err);
    throw new InternalServerError("[Inferno] Start judger fail. Please contact admin.")
  }

  submission.cec = result.cec;
  submission.testcase = result.testcase;
  submission.result = result.result;
  submission.record = result.record;
  submission.time = result.timerun;
  submission.memory = result.memory;
  await submission.save();
  ctx.body = result;
});

module.exports = judger;