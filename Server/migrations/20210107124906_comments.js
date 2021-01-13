
exports.up = function(knex) {
    return knex.schema.createTable('comments',table=>{
        table.string("storyID").notNullable();
        table.string("username").notNullable();
        table.integer("likes").notNullable().defaultTo(0);
        table.string("text").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.json("liked");
    })
 
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
