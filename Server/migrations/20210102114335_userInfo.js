
exports.up = function(knex) {
  return knex.schema.createTable("userInfo",table=>{
      table.string('username').primary().notNullable();
      table.string("name").notNullable();
      table.string('info');
      table.string("content");
      table.json("stories").notNullable();
      table.json("edits").notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("userInfo")
};
