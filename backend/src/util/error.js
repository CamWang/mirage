/**
 * error.js
 * 定义了常见的Web错误
 * https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status
 * 
  RequestError           - 请求错误。参数不够
  UnauthorizedError      - 权限不足。用户权限不够访问该API
  ForbiddenError         - 禁止访问。未登录且没权限
  MethodNotAllowedError  - 不支持该请求方法
  GoneError              - 请求的实体不存在。取数据之后检查数据是否存在
  PayloadTooLargeError   - 参数过大
  UnprocessableEntityError    - 参数格式错误。比如应该数字的字段传来字符串
  InternalServerError    - 服务器内部错误，由于代码bug等出现的错误
  NotImplementedError    - 该API未被实现
 *
 */
// 请求或请求参数错误
class RequestError extends Error {
  constructor(message) {
    super();
    this.code = 400,
    this.message = "Request Error: " + message;
  }
}

// 用户已登录但权限不够
class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.code = 401,
    this.message = "Unauthorized: " + message;
  }
}

// 未登录且未授权
class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.code = 403,
    this.message = "Forbidden: " + message;
  }
}

// 某种请求方法不可使用，比如POST方法
class MethodNotAllowedError extends Error {
  constructor(message) {
    super();
    this.code = 405,
    this.message = "Method Not Allowed: " + message;
  }
}

// 不存在某个数据，比如请求一个不存在的用户id
class GoneError extends Error {
  constructor(message) {
    super();
    this.code = 410,
    this.message = "Entity Gone: " + message;
  }
}

// 文件太大了
class PayloadTooLargeError extends Error {
  constructor(message) {
    super();
    this.code = 413,
    this.message = "Payload Too Large: " + message;
  }
}

// 参数格式错误，参数是全的但是某个参数格式不合适
class UnprocessableEntityError extends Error {
  constructor(message) {
    super();
    this.code = 422,
    this.message = "Unprocessable Entity: " + message;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super();
    this.code = 500,
    this.message = "Internal Server Error: " + message;
  }
}

// 待开发
class NotImplementedError extends Error {
  constructor(message) {
    super();
    this.code = 501;
    this.message = "Not Implemented: " + message;
  }
}

module.exports = {
  RequestError,
  UnauthorizedError,
  ForbiddenError,
  MethodNotAllowedError,
  GoneError,
  PayloadTooLargeError,
  UnprocessableEntityError,
  InternalServerError,
  NotImplementedError
}