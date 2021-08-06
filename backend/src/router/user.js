const Router = require("@koa/router");
const { User } = require("../model/user");
const config = require("./config");

const user = new Router();

const log = global.log;

user.get('/', async (ctx, next) => {
  let data = await User.find({});
  ctx.body = data;
});

user.get('/list', async (ctx, next) => {
  let data = await User.find();
  ctx.body = data;
})

user.post('/register', async (ctx, netx) => {
  const user = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  });
  const error = user.validateSync();
  if (error && config.mode === "development") {
    log.error(error);
  }
  await user.save();
  ctx.body = "user";
});

module.exports = user;