const Server = require("./server");

global.Server = new Server();

console.log(`Server Running At: http://localhost:3000`);