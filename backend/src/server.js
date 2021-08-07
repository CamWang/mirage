const path = require('path');
const Koa = require("koa");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const Http = require("http");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const Winston = require("winston");
const Socket = require("socket.io").Server;

const router = require("./router");
const config = require("./config");
const Database = require("./db");
const { onlyExecInDev } = require("./util/constant");

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
    log.info("mongoose is initializing");
    this.setupDatabase();
    log.info("mongoose established");
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
    if (typeof config.mode == "string") {
      if (config.mode === "production") {
        this.production = true;
        this.development = false;
      } else if (config.mode === "development") {
        this.production = false;
        this.development = true;
      }
    } else {
      global.log.error("config wrong mode type");
    }

    if (!Number.isInteger(config.server.port)) {
      global.log.error("config.server.port wrong port type");
    }
    this.port = config.server.port;
    const app = new Koa();

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
        // 404 error handler - koa default status is 404
        if (ctx.status === 404) {
          ctx.body = "Sorry. I didn't find that page on mirage";
          global.log.error(`404 visit to: ${ctx.url}`);
        }
      } catch(err) {
        if (err) {
          console.log("error status", err.status);
          // koa-jwt error handler
          if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
          }
          if (err.status) {
            ctx.status = err.status;
          }
          global.log.error(err.message);
          ctx.body = err.message;
          ctx.app.emit("error", err, ctx);
        }
        global.log.error(err);
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
        global.log.info(`${ctx.method} ${ctx.url} - ${rt}`);
      });
    }

    // parse parameter
    app.use(bodyParser());

    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(historyApiFallback({ whiteList: ['/api']}));
    const http = Http.createServer(app.callback());
    http.listen(config.server.port);
    this.http = http;
    this.koa = app;
  }

  setupSocketIO() {
    this.io = new Socket(this.http);
  }
}

module.exports = Server;