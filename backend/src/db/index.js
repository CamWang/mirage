const mongoose = require('mongoose');
const config = require("../config");

let log;

// init MongoDB db object to global.db
class Database {
  constructor() {
    log = global.log;
    this.uri = this.getUri();
    this.setupDatabase();
  }

  setupDatabase() {
    const dbName = "mirage";
    mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    log.info("wait database to connect...");
    db.on('error', function() {
      log.error("database connect fail " + err);
    });
    db.once('open', function() {
      log.info("database connected");
    });
    this.db = mongoose;
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
    uri += `/`;
    if (
      typeof config.db.database == "string" &&
      config.db.database.length > 0
    ) {
      uri += config.db.database
    } else {
      log.error("config.db.database wrong");
    }
    if (Array.isArray(config.db.options)) {
      if (config.db.options.length > 0) {
        uri += `?${config.db.options.join("&")}`;
      }
    }
    return uri;
  }
}

module.exports = Database;
