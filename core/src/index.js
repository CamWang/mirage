const pino = require("pino");
const EventEmitter = require("events").EventEmitter;

const { Inferno } = require("../build/Release/inferno");
const config = require("../assets/config.json");
const task = require("../assets/task.json");

/**
 * index.js
 * 
 * 测试判题核心代码
 * 判题核心需要传入一个EventEmitter用于接收事件
 */

const logger = pino({
  prettyPrint: { colorize: true },
});

const emitter = new EventEmitter();

emitter.on("init", function() {
  logger.warn("START INIT");
});
emitter.on("compile", function() {
  logger.warn("START COMPILE");
});
emitter.on("judge", function() {
  logger.warn("START JUDGE");
});

for (let i = 0; i < 5; i++) {
  let inferno;
  try {
    inferno = new Inferno(emitter.emit.bind(emitter));
    inferno.setJudger(
      config.direcotry,
      config.ptrace,
      config.seccomp,
      config.rlimit,
      config.command[1].source,
      config.command[1].executable,
      config.command[1].compile,
      config.command[1].run
    );
    inferno.setTask(
      task.id,
      task.tlmt,
      task.mlmt,
      task.lang,
      task.type,
      task.mode,
      task.data,
      task.spj,
      task.code
    );
  } catch (err) {
    logger.error(err);
  }

  let result;

  // try {
  //   result = inferno.judge();
  // } catch (err) {
  //   logger.error(err);
  // }
  // logger.info(parseInt(result.record).toString(2))

  // logger.info(result);

  inferno.judgeAsync((result) => {
    logger.info(result);
  });

  console.log("this should comes first when async");
}