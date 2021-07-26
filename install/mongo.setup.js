use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
use mirage
db.createUser(
  {
    user: "mirage",
    pwd:  "mirage",
    roles: [ { role: "readWrite", db: "mirage" }]
  }
)
db.adminCommand( { shutdown: 1 } )
