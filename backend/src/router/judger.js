const Router = require("@koa/router");

const judger = new Router();

function judge(task) {

}

judger.get('/submit', async (ctx, next) => {
  ctx.body = ctx.request.body;
});

module.exports = judger;