const path = require('path');
const Koa = require("koa");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const Http = require("http");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const Winston = require("winston");

const router = require("./router");
const config = require("./config");
const Database = require("./db");
const SocketServer = require("./io");

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
  io;
  development = true;
  production = false;

  constructor() {
    this.init();
  }

  init() {
    this.setupLogger();
    const log = global.log;
    if (typeof config.mode == "string") {
      this.production = config.mode === "production";
      this.development = config.mode === "development";
    } else {
      log.error("config wrong mode type");
    }
    if (this.development) {
      log.warn("development mode");
    } else {
      log.warn("production mode");
    }
    log.info("mongoose is initializing");
    this.setupDatabase();
    log.info("server is initializing");
    this.setupServer();
    log.info(`server running at http://localhost:${config.server.port}`);
    log.info("socket.io is initializing");
    this.setupSocketIO();
  }

  setupLogger() {
    const logger =  Winston.createLogger(config.logger);
    const handler = {
      apply: function(target, thisArg, args) {
        target.apply(thisArg, args);
        // throw Error(args.join());
      }
    }
    logger.error = new Proxy(logger.error, handler);
    global.log = logger;
  }

  setupDatabase() {
    this.db = new Database(config).db;
  }

  setupServer() {

    if (!Number.isInteger(config.server.port)) {
      global.log.error("config.server.port wrong port type");
    }
    this.port = config.server.port;
    const app = new Koa();

    if (this.development) {
      app.use(cors({
        origin: 'http://localhost:9000'
      }));
    }

    app.use(historyApiFallback({ whiteList: ['/api']}));
    app.use(serve('dist'), {
      gzip: true
    });

    // error handler
    if (!this.development) {
      Error.stackTraceLimit = 5;
    }

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch(err) {
        if (!err.status || !Number.isInteger(err.status)) {
          err.status = 500;
        // koa-jwt error handler
        } else if (401 == err.status) {
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else if (err.code && Number.isInteger(err.code)) {
          ctx.status = err.code;
        }
        ctx.body = err.message;
        global.log.error(err);
      }
      if (ctx.response.status === 404) {
        ctx.body = "Sorry. I didn't find that page on mirage";
        global.log.error(`404 visit to: ${ctx.url}`);
      }
    });

    // time calculate
    if (this.development) {
      app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
        const rt = ctx.response.get('X-Response-Time');
        global.log.http(`${ctx.method} ${ctx.url} - ${rt}`);
      });
    }

    // parse parameter
    app.use(bodyParser());

    app.use(router.routes());
    app.use(router.allowedMethods());

    const http = Http.createServer(app.callback());
    http.listen(config.server.port);
    this.http = http;
    this.koa = app;
  }

  setupSocketIO() {
    let setting;
    if (this.development) {
      setting = {
        cors: {
          origin: "http://localhost:9000",
        },
      }
    }
    this.io = new SocketServer(this.http, setting).io;
  }
}

module.exports = Server;