const { MongoClient } = require("mongodb");

class Database {
  constructor(config) {
    this.uri = this.getUri(config);
  }

  getUri(config) {
    let uri = "";
    if (typeof config.protocol == "string" && config.protocol.length > 0) {
      uri += `${config.protocol}://`;
    } else {
      throw TypeError("[db] no protocol");
    }
    if (
      typeof config.username == "string" &&
      typeof config.password == "string" &&
      config.username.length > 0 &&
      config.password.length > 0
    ) {
      uri += `${config.username}:${config.password}@`;
    }
    if (
      typeof config.hostname == "string" && 
      config.hostname.length > 0 &&
      Number.isInteger(config.port) &&
      config.port > 0
    ) {
      uri += `${config.hostname}:${config.port}`;
    } else {
      throw TypeError("[db] no hostname");
    }
    if (Array.isArray(config.options)) {
      if (config.options.length > 0) {
        uri += `/?${config.options.join("&")}`;
      }
    }
    return uri;
  }
}

module.exports = Database;
