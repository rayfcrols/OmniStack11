exports.up = function (knex) {
  return knex.schema.table('incidents', function (table) {
    table.boolean('finished').notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('incidents', function (table) {
    table.dropColumn('finished');
  });
};
