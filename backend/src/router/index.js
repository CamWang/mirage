const Router = require("@koa/router");
const config = require("../config");

const user = require("./user");
const judger = require("./judger");
const submission = require("./submission");

const router = new Router();

router.use(`${config.server.base}/user`, user.routes(), user.allowedMethods());
router.use(`${config.server.base}/judger`, judger.routes(), judger.allowedMethods());
router.use(`${config.server.base}/submission`, submission.routes(), submission.allowedMethods());

module.exports = router;