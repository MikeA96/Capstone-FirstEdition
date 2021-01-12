const bookshelf = require("../bookshelf");

const UserInfo = bookshelf.model("UserInfo", {
  tableName: "userInfo",
  idAttribute:'username'
});

module.exports = UserInfo;