const bookshelf = require("../bookshelf");

const Users = bookshelf.model("Users", {
  tableName: "users",
  idAttribute:'username'
});

module.exports = Users;