const bookshelf = require("../bookshelf");

const Stories = bookshelf.model("Stories", {
  tableName: "stories"
});

module.exports = Stories;