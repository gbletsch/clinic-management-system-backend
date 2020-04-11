
exports.up = function(knex) {
  return   knex.schema.createTable('users', table => {
    table.string('email').primary()
    table.string('password').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};