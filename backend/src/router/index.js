const Router = require("@koa/router");
const config = require("../config");

const user = require("./user");
const judger = require("./judger");

const router = new Router();

router.use(`${config.server.base}/user`, user.routes(), user.allowedMethods());
router.use(`${config.server.base}/judger`, judger.routes(), judger.allowedMethods());

module.exports = router;