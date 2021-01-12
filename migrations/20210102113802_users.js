
exports.up = function(knex) {
  return knex.schema.createTable("users",table=>{
      table.string("username").primary().notNullable();
      table.string("name").notNullable();
      table.string("password").notNullable() 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
