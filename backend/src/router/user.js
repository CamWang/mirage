const Router = require("@koa/router");
const { User } = require("../model/user");
const { onlyExecInDev } = require("../util/constant");

const user = new Router();

const log = global.log;

user.get('/', async (ctx, next) => {
  if (!ctx.request.body.id) {
    throw new Error("id is not present");
  }
  let data = await User.findOne({ _id: ctx.request.body.id }).exec();
  ctx.body = data;
});

user.get('/list', async (ctx, next) => {
  let data = await User.find();
  ctx.body = data;
})

user.post('/register', async (ctx, netx) => {
  const body = ctx.request.body;
  if (!body.username || !body.password) {
    throw new Error("username or password is not present");
  }
  const user = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  });
  const error = user.validateSync();
  if (error) {
    throw new Error(error);
  }
  await user.save();
  ctx.body = {
    username: ctx.request.body.username
  };
});

module.exports = user;