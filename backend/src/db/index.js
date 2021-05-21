const { MongoClient } = require("mongodb");
const config = require("../config");
const assert = require("assert");

let log;

class Database {
  constructor() {
    log = global.logger;
    this.uri = this.getUri();
    this.setupDatabase();
  }

  setupDatabase() {
    log.info(this.uri);
    const dbName = "mirage";
    const client = new MongoClient(this.uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    client.connect((err) => {
      if (err == null) {
        log.info("database connected");
        global.db = client.db(dbName);
      } else {
        log.error("database connect fail " + err);
      }
    })
  }

  getUri() {
    let uri = "";
    if (typeof config.db.protocol == "string" && config.db.protocol.length > 0) {
      uri += `${config.db.protocol}://`;
    } else {
      log.error("config.db.protocol wrong");
    }
    if (
      typeof config.db.username == "string" &&
      typeof config.db.password == "string" &&
      config.db.username.length > 0 &&
      config.db.password.length > 0
    ) {
      uri += `${config.db.username}:${config.db.password}@`;
    }
    if (
      typeof config.db.hostname == "string" && 
      config.db.hostname.length > 0 &&
      Number.isInteger(config.db.port) &&
      config.db.port > 0
    ) {
      uri += `${config.db.hostname}:${config.db.port}`;
    } else {
      log.error("config.db.hostname wrong");
    }
    if (Array.isArray(config.db.options)) {
      if (config.db.options.length > 0) {
        uri += `/?${config.db.options.join("&")}`;
      }
    }
    return uri;
  }
}

module.exports = Database;
