const Socket = require("socket.io").Server;

class SocketServer {

  constructor(http, setting) {
    if (setting) {
      this.io = new Socket(http, setting);
    } else {
      this.io = new Socket(http);
    }
    this.init();
  }

  init() {
    
  }
}

module.exports = SocketServer;