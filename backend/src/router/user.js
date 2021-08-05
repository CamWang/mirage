const Router = require("@koa/router");
const { User } = require("../model/user");

const user = new Router();

user.get('/', async (ctx, next) => {
  ctx.body = "Hello World";
});

user.post('/register', async (ctx, netx) => {
  console.log(JSON.stringify())
})

module.exports = user;