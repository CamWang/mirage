const Server = require("./server");

/**
 * global.Server.db - mongoose instance
 * global.Server.http - node.js http
 * global.Server.koa - Koa 2 instance
 * global.Server.io - Socket.io instance
 * global.log - winston logger
 */
global.Server = new Server();
