const bookshelf = require("../bookshelf");

const Edits = bookshelf.model("Edits", {
  tableName: "edits",
});

module.exports = Edits;