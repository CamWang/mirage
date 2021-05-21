const winston = require("winston");
const chalk = require("chalk");

let logToConsole = true;    // change here for log to console or to file

let loggerFormat, transports;
if (logToConsole) {
  loggerFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return chalk.black(chalk.bgMagenta(` ${timestamp} `)) +
      chalk.black(chalk.bgCyan(`[${label}]:`)) + 
      chalk.black(chalk.bgGreen(` ${level} `)) + 
      ` ${message} `;
  });
  transports = [new winston.transports.Console()];
} else {
  loggerFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp}:${label}:${level}:${message}`;
  });
  transports = [
    new winston.transports.File({ filename: 'log/err.log', level: 'error'}),
    new winston.transports.File({ filename: 'log/log.log' })
  ];
}

module.exports = {
  mode: "development",
  server: {
    port: 3000,
  },
  db: {
    username: "",
    password: "",
    hostname: "127.0.0.1",
    port: 27017,
    protocol: "mongodb",
    options: [
      "poolSize=20",
      "writeConcern=majority"
    ]
  },
  logger: {
    level: "info",    // only log less than this. error,warn,info,http,verbose,debug,silly.
    format: winston.format.combine(
      winston.format.label({ label: 'mirage' }),
      winston.format.timestamp(),
      loggerFormat
    ),
    transports: transports
  }
}