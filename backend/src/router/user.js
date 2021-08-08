const Router = require("@koa/router");
const { User } = require("../model/user");
const { onlyExecInDev } = require("../util/constant");
const {
  RequestError,
  GoneError,
  UnprocessableEntityError
} = require("../util/error");

const user = new Router();

const log = global.log;

user.get('/', async (ctx, next) => {
  const body = ctx.request.body;
  if (!body.id) {
    throw new RequestError("id is not present");
  }
  let data = await User.findOne({ _id: ctx.request.body.id }).select('-password').exec();
  if (!data) {
    throw new GoneError("no entity matched");
  }
  ctx.body = data;
});

user.get('/list', async (ctx, next) => {
  const body = ctx.request.body;
  let page = 1, items = 30;
  if (body.page && Number.isInteger(body.page)) { page = body.page }
  if (body.items && Number.isInteger(body.items)) { items = body.items }
  let data = await User.find().select('-password').skip((page - 1) * items).limit(items).exec();
  ctx.body = data;
})

user.post('/register', async (ctx, netx) => {
  const body = ctx.request.body;
  if (!body.username || !body.password) {
    throw new RequestError("username or password is not present");
  }
  const user = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  });
  const error = user.validateSync();
  if (error) {
    throw new UnprocessableEntityError(error);
  }
  await user.save();
  ctx.body = {
    username: ctx.request.body.username
  };
});

module.exports = user;