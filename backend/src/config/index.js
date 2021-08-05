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
    base: "/api",
    port: 3000,
    upload: {
      sizeLimit: 50 * 1024 * 1024,
      path: 'public/upload/'
    }
  },
  db: {
    username: "",
    password: "",
    hostname: "127.0.0.1",
    port: 27017,
    protocol: "mongodb",
    database: "mirage",
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
  },
  core: {
    direcotry: "/tmp",
    ptrace: false,
    seccomp: false,
    rlimit: false,
    command : [
      {
        language: "c",
        source: "main.c",
        executable: "main",
        compile: "gcc main.c -o main -std=c99 -static -Wall -fmax-errors=10",
        run: "./main"
      },
      {
        language: "cpp",
        source: "main.cpp",
        executable: "main",
        compile: "g++ main.cpp -o main -std=c++11 -lm -static -Wall -fmax-errors=10 -fno-asm",
        run: "./main"
      }
    ]
  }
}