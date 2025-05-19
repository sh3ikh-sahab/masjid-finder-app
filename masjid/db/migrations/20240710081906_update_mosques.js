/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('mosques', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('latitude', 9, 6).notNullable();
        table.decimal('longitude', 9, 6).notNullable();
        table.string('address').notNullable();
    }).then(() => {
        return knex.schema.createTable('timings', (table) => {
            table.increments('id').primary();
            table.integer('mosque_id').unsigned().references('id').inTable('mosques').onDelete('CASCADE');
            table.string('fajr').notNullable();
            table.string('dhuhr').notNullable();
            table.string('asr').notNullable();
            table.string('maghrib').notNullable();
            table.string('isha').notNullable();
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('timings').then(() => {
        return knex.schema.dropTableIfExists('mosques');
    });
};
