const Koa = require("koa");
const serve = require("koa-static");
const router = require("./router");
const config = require("./config");
const Database = require("./db");

class Server {
  constructor() {
    this.init();
  }

  init() {
    this.setupServer();
  }

  setupDatabase() {
    global.Database = new Database();
  }

  setupServer() {
    if (!Number.isInteger(config.server.port)) {
      throw TypeError("[server] wrong port setting");
    }
    const app = new Koa();
    app.use(serve('dist'), {
      gzip: true,
      maxage: 3600
    });
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(config.server.port);
  }
}

module.exports = Server;