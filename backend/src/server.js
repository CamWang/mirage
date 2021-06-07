const Koa = require("koa");
const serve = require("koa-static");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const winston = require("winston");

const router = require("./router");
const config = require("./config");
const Database = require("./db");

// even in other modules you should initialize log in constructor
// or in other words, in a delayed manner. If you initialize log
// in here. It will be initialized as undefined as initialization
// will be executed when require() not execution.
let log;


/**
 * global.db
 * global.logger
 * global.koa
 */
class Server {
  constructor() {
    this.init();
  }

  init() {
    this.setupLogger();
    log = global.logger;
    log.info("logger established");
    this.setupDatabase();
    log.info("mongodb established");
    this.setupServer();
    log.info(`server running at http://localhost:${config.server.port}`);
  }

  setupLogger() {
    const logger =  winston.createLogger(config.logger);
    const handler = {
      apply: function(target, thisArg, args) {
        target.apply(thisArg, args);
        throw Error(args.join());
      }
    }
    logger.error = new Proxy(logger.error, handler);
    global.logger = logger;
  }

  setupDatabase() {
    new Database(config);
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
    app.listen(config.server.port);
    global.koa = app;
  }
}

module.exports = Server;