/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('is_admin').defaultTo(false);
    }).then(() => {
        return knex.schema.createTable('mosque_admins', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.integer('mosque_id').unsigned().references('id').inTable('mosques');
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('mosque_admins').then(() => {
        return knex.schema.dropTableIfExists('users');
    });
};
