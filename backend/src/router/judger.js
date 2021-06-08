const Router = require("@koa/router");
const { Inferno } = require("../core/inferno");
const config = require("../config").core;

const judger = new Router();

function judge(task) {
  let inferno;
  try {
    inferno = new Inferno();
    global.log.info(
      inferno.setJudger(
        config.direcotry,
        config.ptrace,
        config.seccomp,
        config.rlimit,
        config.command[1].source,
        config.command[1].executable,
        config.command[1].compile,
        config.command[1].run
      )
    );
    global.log.info(
      inferno.setTask(
        task.id,
        task.pid,
        task.tlmt,
        task.mlmt,
        task.lang,
        task.type,
        task.data,
        task.spj,
        task.code
      )
    );
  } catch(err) {
    global.log.error(err);
  }
  let result;
  try {
    result = inferno.judge();
  } catch (err) {
    global.log.error(err);
  }
  global.log.info(result.result);
}

judger.get('/submit', async (ctx, next) => {
  const defTask = {
    id: 1,
    pid: 1,
    data: "/home/ubuntu/data/1",
    lang: 1,
    type: 0,
    spj: "",
    code: "",
    mlmt: 5000,
    tlmt: 5000
  }
  if (!ctx.request.body.task) {
    global.log.error("No task present in request");
  }
  let userTask = ctx.request.body.task;
  const props = ["id", "pid", "data", "lang", "code"];
  global.log.info(userTask.id);
  if (props.every(val => {return userTask[val] !== undefined;})) {
    userTask = {...defTask, ...userTask};
    judge(userTask);
  } else {
    ctx.status = 400;
    ctx.body = "Not enough parameter"
  }
});

module.exports = judger;