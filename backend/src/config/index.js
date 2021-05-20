module.exports = {
  server: {
    port: 3000,
  },
  db: {
    username: "",
    password: "",
    hostname: "localhost",
    port: 27017,
    protocol: "mongodb+srv",
    options: [
      "poolSize=20",
      "writeConcern=majority"
    ]
  }
}