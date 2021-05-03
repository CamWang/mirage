const exampleAddon = require("../build/Release/inferno");

function sleep(time) {
  console.log(exampleAddon.sleep(time));
}

exports.sleep = sleep;