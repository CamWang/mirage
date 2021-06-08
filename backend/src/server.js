const Koa = require("koa");
const serve = require("koa-static");
const Http = require("http");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const Winston = require("winston");
const Socket = require("socket.io").Server;

const router = require("./router");
const config = require("./config");
const Database = require("./db");

// even in other modules you should initialize log in constructor
// or in other words, in a delayed manner. If you initialize log
// in here. It will be initialized as undefined as initialization
// will be executed when require() not execution.
let log;

// global.logger
class Server {
  port = 3000;
  db;
  http;
  koa;
  log;
  development = true;
  production = false;

  constructor() {
    this.init();
  }

  init() {
    this.setupLogger();
    const log = global.log;
    log.info("logger established");
    log.info("mongodb is initializing");
    this.setupDatabase();
    log.info("mongodb established");
    log.info("server is initializing");
    this.setupServer();
    log.info(`server running at http://localhost:${config.server.port}`);
    log.info("socket.io is initializing");
    this.setupSocketIO();
    log.info("socket.io is running");
  }

  setupLogger() {
    const logger =  Winston.createLogger(config.logger);
    const handler = {
      apply: function(target, thisArg, args) {
        target.apply(thisArg, args);
        throw Error(args.join());
      }
    }
    logger.error = new Proxy(logger.error, handler);
    global.log = logger;
  }

  setupDatabase() {
    this.db = new Database(config).db;
  }

  setupServer() {
    if (typeof config.mode == "string") {
      if (config.mode === "production") {
        this.production = true;
        this.development = false;
      } else if (config.mode === "development") {
        this.production = false;
        this.development = true;
      }
    } else {
      log.error("config wrong mode type");
    }

    if (!Number.isInteger(config.server.port)) {
      log.error("config.server.port wrong port type");
    }
    this.port = config.server.port;
    const app = new Koa();
    app.use(serve('dist'), {
      gzip: true,
      maxage: 3600
    });
    app.use(historyApiFallback({ whiteList: ['/api']}));
    app.use(router.routes());
    app.use(router.allowedMethods());
    const http = Http.createServer(app.callback());
    this.http = http;
    this.koa = app;
  }

  setupSocketIO() {
    this.io = new Socket(this.http);
  }
}

module.exports = Server;