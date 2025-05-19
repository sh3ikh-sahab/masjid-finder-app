/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable('mosques', (table) => {
        table.decimal('latitude', 9, 6).notNullable().alter();
        table.decimal('longitude', 9, 6).notNullable().alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.alterTable('mosques', (table) => {
        table.float('latitude').notNullable().alter();
        table.float('longitude').notNullable().alter();
    });
};
