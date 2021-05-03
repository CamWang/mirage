const sleepModule = require("./sleep");
// console.log(exampleAddon.increment()); // prints 43
// console.log(exampleAddon.increment()); // prints 44
// console.log(exampleAddon.subObject.decrement()); // prints 43

sleepModule.sleep(5);
console.log("time1");
sleepModule.sleep(5);
console.log("time2");
