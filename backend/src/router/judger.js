const Router = require("@koa/router");
const { Inferno } = require("../core/inferno");
const config = require("../config").core;
const {
  InternalServerError,
  RequestError
} = require("../util/error");

const judger = new Router();

function judge(task) {
  let inferno;
  try {
    inferno = new Inferno();
    global.log.info(
      inferno.setJudger(config.direcotry, config.ptrace, config.seccomp, config.rlimit, config.command[task.lang].source, 
        config.command[task.lang].executable, config.command[task.lang].compile, config.command[task.lang].run
      )
    );
    global.log.info(
      inferno.setTask(task.id, task.pid, task.tlmt, task.mlmt, task.lang, task.type, task.mode, task.data, task.spj, task.code)
    );
  } catch(err) {
    return Promise.reject(err);
  }
  return new Promise((resolve, reject) => {
    inferno.judgeAsync(result => {
      resolve(result);
    });
  });
}

judger.post('/submit', async (ctx, next) => {
  // default task object
  const defaultTask = {
    id: 1,
    pid: 1,
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
  // compose data directory
  userTask.data = `${config.core.data}/${userTask.pid}`;

  // test critical parameters
  const props = ["id", "pid", "lang", "code"];
  if (props.every(val => {return userTask[val] !== undefined;})) {
    userTask = {...defaultTask, ...userTask};
    global.log.info(`submit judge task ${userTask.id}`);
  } else {
    throw new RequestError("[Judge] Not enough parameter");
  }



  // judge
  let result;
  try {
    result = await judge(userTask);
  } catch(err) {
    global.log.error(err);
    throw new InternalServerError("[Inferno] Start judger fail. Please contact admin.")
  }
  ctx.body = result;
});

module.exports = judger;