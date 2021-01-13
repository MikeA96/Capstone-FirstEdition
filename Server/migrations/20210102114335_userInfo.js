
exports.up = function(knex) {
  return knex.schema.createTable("userInfo",table=>{
      table.string('username').primary().notNullable();
      table.string("name").notNullable();
      table.string('info');
      table.string("content");
      table.integer("editLikes").defaultTo(0);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("userInfo")
};
