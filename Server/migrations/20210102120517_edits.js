
exports.up = function(knex) {
  return knex.schema.createTable('edits',table=>{
      table.string("id").primary().notNullable();
      table.string("username").notNullable();
      table.string("title").notNullable();
      table.longtext("text").notNullable();
      table.string("editor").notNullable();
      table.json("likes");
      table.integer(editorLikes).defaultTo(0);
      table.timestamp("created").defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("edits")
};
