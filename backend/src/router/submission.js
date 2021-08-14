const Router = require("@koa/router");

const { Submission } = require("../model/submission");

const submission = new Router();

submission.get('/list', async (ctx, next) => {
  const body = ctx.request.body;
  let page = 1, items = 30;
  if (body.page && Number.isInteger(body.page)) { page = body.page }
  if (body.items && Number.isInteger(body.items)) { items = body.items }
  let data = await Submission.find().sort({created: 'desc'}).skip((page - 1) * items).limit(items).exec();
  ctx.body = data;
});

module.exports = submission;