const parameterError = (name) => {
  return {
    code: 412,
    message: `Parameter${name?" \"" + name + "\"":" "}Error`,
    message_zh: `参数${name?" \"" + name + "\"":" "}格式错误`
  }
};

export default {
  parameterError
}