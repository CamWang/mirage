const Router = require("@koa/router");

const user = new Router();

user.get('/', async (ctx, next) => {
  ctx.body = "Hello World";
})

module.exports = user;