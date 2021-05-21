const pino = require("pino");

const { Inferno } = require("../build/Release/inferno");
const config = require("../assets/config.json");
const task = require("../assets/task.json");

const logger = pino({
  prettyPrint: { colorize: true },
});

let inferno;

try {
  inferno = new Inferno();
  logger.info(
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
  logger.info(
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
} catch (err) {
  logger.error(err);
}

let result;

try {
  result = inferno.judge();
} catch (err) {
  logger.error(err);
}

logger.info(result);