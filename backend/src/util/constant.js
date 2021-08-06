const role = {
  list: ["default", "balloon", "teacher", "jury", "admin"],
  default: ["default"]
};

// 仅在开发模式执行 onlyExecInDev(log.error, error);
const onlyExecInDev = (method) => {
  if (global.Server.development === true) {
    method();
  }
}

// 仅在生产模式执行
const onlyExecInProd = (method) => {
  if (global.Server.development === false) {
    method();
  }
}

module.exports = {
  onlyExecInDev,
  onlyExecInProd,
  role
}