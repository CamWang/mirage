const Socket = require("socket.io").Server;
const { ioSid } = require("../util/tool");
const { User } = require("../model/user");

class InMemorySessionStore {
  constructor() {
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(id);
  }

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

class SocketServer {

  constructor(http, setting) {
    this.sessionStore = new InMemorySessionStore();
    if (setting) {
      this.io = new Socket(http, setting);
    } else {
      this.io = new Socket(http);
    }
    this.init();
  }

  init() {
    this.io.use(this.mwSession);
    this.io.on("connection", this.onConnection);
  }

  onConnection(socket) {
    io.on("connection", (socket) => {
      socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
      });
    });
  }

  async mwSession(socket, next) {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // find existing session
      const session = this.sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }

    let data = await User.findOne({ username: ctx.request.body.username }).select('+_id').exec();
    if (!data) {
      throw new GoneError("no entity matched");
    }

    socket.sessionID = ioSid();
    socket.userID = data._id;
    socket.username = username;
    next();
  }
}

module.exports = SocketServer;