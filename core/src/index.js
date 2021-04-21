const exampleAddon = require("../build/Release/inferno");

console.log(exampleAddon.increment()); // prints 43
console.log(exampleAddon.increment()); // prints 44
console.log(exampleAddon.subObject.decrement()); // prints 43