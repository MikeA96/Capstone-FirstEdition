const bookshelf = require("../bookshelf");

const Comments = bookshelf.model("Comments", {
  tableName: "comments"
});

module.exports = Comments;