const status = [
  {
    abbr: "DEF",
    full: "Default",
  }, {
    abbr: "SCE",
    full: "Security Check Error",
  },{
    abbr: "CE",
    full: "Compile Error",
  },{
    abbr: "RE",
    full: "Runtime Error",
  },{
    abbr: "TLE",
    full: "Time Limit Exceeded",
  },{
    abbr: "MLE",
    full: "Memory Limit Exceeded",
  },{
    abbr: "OLE",
    full: "Output Limit Exceeded",
  },{
    abbr: "PE",
    full: "Presentation Error",
  },{
    abbr: "WA",
    full: "Wrong Answer",
  },{
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