const addon = require("../build/Release/napi");

console.log("addon", addon);
console.log("hello", addon.hello());