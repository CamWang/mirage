const Koa = require("koa");
const serve = require("koa-static");
const router = require("./router");

class Server {
  constructor(port) {
    this.init(port);
  }

  init(port) {
    if (Number.isInteger(port)) {
      this.setupServer(port)
    }
  }

  setupServer(port) {
    const app = new Koa();
    app.use(serve('dist'), {
      gzip: true,
      maxage: 3600
    });
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
  }
}

module.exports = Server;