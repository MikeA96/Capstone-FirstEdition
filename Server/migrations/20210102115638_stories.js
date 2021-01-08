
exports.up = function(knex) {
  return knex.schema.createTable("stories",table=>{
      table.string('id').primary().notNullable();
      table.string('username').notNullable();
      table.string("title").notNullable();
      table.longtext("text").notNullable();
      table.string("genre").notNullable();
      table.json("comments").defaultTo([]).notNullable();
      table.integer("likes").defaultTo(0).notNullable();
      table.timestamp("created").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("stories")
};
