/**
 * error.js
 * 定义了常见的Web错误
 */

// 用户已登录但权限不够
class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.code = 401,
    this.message = message;
  }
}

// 未登录且未授权
class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.code = 403,
    this.message = message;
  }
}

// 某种请求方法不可使用，比如POST方法
class MethodNotAllowedError extends Error {
  constructor(message) {
    super();
    this.code = 405,
    this.message = message;
  }
}

export default {
  UnauthorizedError,
  ForbiddenError,
  MethodNotAllowedError
}