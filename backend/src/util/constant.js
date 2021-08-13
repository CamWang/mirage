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

const lang = [
  {
    index: 0,
    abbr: "c",
    name: "C",
    timeFactor: 1,
    memoryFactor: 1,
  }, {
    index: 1,
    abbr: "cpp",
    name: "C++",
    timeFactor: 1,
    memoryFactor: 1,
  }, {
    index: 2,
    abbr: "csharp",
    name: "C#",
    timeFactor: 2,
    memoryFactor: 2
  }, {
    index: 3,
    abbr: "java",
    name: "Java",
    timeFactor: 5,
    memoryFactor: 10
  }, {
    index: 4,
    abbr: "python",
    name: "Python",
    timeFactor: 5,
    memoryFactor: 10
  }, {
    index: 5,
    abbr: "golang",
    name: "Go",
    timeFactor: 2,
    memoryFactor: 2
  }, {
    index: 6,
    abbr: "javascript",
    name: "JavaScript",
    timeFactor: 5,
    memoryFactor: 10
  }
]

const status = [
  {
    index: 0,
    abbr: "DEF",
    full: "Default",
  }, {
    index: 1,
    abbr: "SCE",
    full: "Security Check Error",
  },{
    index: 3,
    abbr: "CE",
    full: "Compile Error",
  },{
    index: 4,
    abbr: "RE",
    full: "Runtime Error",
  },{
    index: 5,
    abbr: "TLE",
    full: "Time Limit Exceeded",
  },{
    index: 6,
    abbr: "MLE",
    full: "Memory Limit Exceeded",
  },{
    index: 7,
    abbr: "OLE",
    full: "Output Limit Exceeded",
  },{
    index: 8,
    abbr: "PE",
    full: "Presentation Error",
  },{
    index: 9,
    abbr: "WA",
    full: "Wrong Answer",
  },{
    index: 10,
    abbr: "AC",
    full: "Accepted",
  }
];

const parseNum = (num) => {
  let i = 0;
  if (typeof num === "string") {
    i = Number.parseInt(num);
  } else if (typeof num === "number") {
    i = num;
  } else {
    throw "[Util] Status typo error";
  }
  if (i < 0 || i > status.length) {
    throw "[Util] Status index out of bound";
  }
  return i;
}

const getStatusObjectFromNumber = (num) => {
  return status[parseNum(num)];
}

const getStatusAbbrFromNumber = (num) => {
  return status[parseNum(num)].abbr;
}

const getStatusFullFromNumber = (num) => {
  return status[parseNum(num)].full;
}

module.exports = {
  onlyExecInDev,
  onlyExecInProd,
  role,
  getStatusObjectFromNumber,
  getStatusAbbrFromNumber,
  getStatusFullFromNumber
}