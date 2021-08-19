const config = require("../config").core;
const { Inferno } = require("../core/inferno");
const EventEmitter = require("events").EventEmitter;
const TaskQueue = require("../util/queue");

const queue = new TaskQueue(config.concurrency);

const emitter = new EventEmitter();

const queueTask = function (task) {
  const judge = function() {
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
  return queue.runTask(judge);
}

module.exports = {
  queueTask
}