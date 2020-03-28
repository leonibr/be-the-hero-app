
exports.up = function(knex) {
    return knex.schema.table('ongs', (table) => {
      table.text('password_hash').notNullable().defaultTo('');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.dropColumn('password_hash');
    });
  };