const Router = require("@koa/router");

const config = require("../config").core;
const { Submission } = require("../model/submission");
const { Problem } = require("../model/problem");
const {
  InternalServerError,
  RequestError,
  UnprocessableEntityError
} = require("../util/error");
const { queueTask } = require("../core/judge");

// TODO Queue judge task
// TODO WS active message push

const judger = new Router();

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
    result = await queueTask(userTask);
  } catch(err) {
    global.log.error(err);
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