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
        config.command[task.lang].source,
        config.command[task.lang].executable,
        config.command[task.lang].compile,
        config.command[task.lang].run
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
        task.mode,
        task.data,
        task.spj,
        task.code
      )
    );
  } catch(err) {
    global.log.error(err);
  }
  return new Promise((resolve, reject) => {
    inferno.judgeAsync(result => {
      resolve(result);
    });
  });
}

judger.post('/submit', async (ctx, next) => {
  const defTask = {
    id: undefined,
    pid: undefined,
    data: "/home/ubuntu/data/1",
    lang: 1,
    type: 0,
    mode: 0,
    spj: "",
    code: "",
    mlmt: 5000,
    tlmt: 5000
  }
  if (!ctx.request.body.task) {
    global.log.error("No task present in request");
  }
  let userTask = ctx.request.body.task;
  if (!userTask.data) {
    userTask.data = `/home/ubuntu/data/${userTask.pid}`;
  }
  const props = ["id", "pid", "lang", "code"];
  let result;
  if (props.every(val => {return userTask[val] !== undefined;})) {
    userTask = {...defTask, ...userTask};
    global.log.info(`submit judge task ${userTask.id}`);
    result = await judge(userTask);
  } else {
    ctx.status = 400;
    ctx.body = "Not enough parameter"
  }
  ctx.body = result;
});

module.exports = judger;