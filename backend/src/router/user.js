const Router = require("@koa/router");
const { User } = require("../model/user");

const user = new Router();

user.get('/', async (ctx, next) => {
  let data = await User.find({});
  ctx.body = data;
});

user.post('/register', async (ctx, netx) => {
  const user = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  });
  const error = user.validateSync();
  console.log(error);
  await user.save();
  ctx.body = "user";
});

module.exports = user;