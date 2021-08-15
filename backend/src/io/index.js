const Socket = require("socket.io").Server;

class SocketServer {

  constructor(http) {
    this.io = new Socket(http);
    this.init();
  }

  init() {
    
  }
}

module.exports = SocketServer;