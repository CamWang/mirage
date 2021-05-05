const pino = require('pino');

const { Inferno } = require("../build/Release/inferno");
const config = require("../assets/config.json");
const task = require("../assets/task.json");

const logger = pino({
  prettyPrint: { colorize: true }
});

const inferno;

try {
  inferno = new Inferno();
  inferno.setJudger(config.direcotry, config.command[1].compile, config.command[1].run);
  inferno.setTask(task.id, task.pid, task.tlmt, task.mlmt, task.lang, task.type, task.data, task.spj, task.code);
} catch(err) {
  logger.error(err);
}