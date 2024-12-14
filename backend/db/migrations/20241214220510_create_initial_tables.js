/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
      .createTable('users', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('recipes', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('owner_user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('instructions');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('ingredients', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('recipe_id').notNullable().references('id').inTable('recipes').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('quantity').notNullable();
        table.string('image_url');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('recipe_shares', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('recipe_id').notNullable().references('id').inTable('recipes').onDelete('CASCADE');
        table.uuid('shared_with_user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.boolean('can_edit').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
  
        // Optionally ensure uniqueness (no duplicate shares to same user):
        table.unique(['recipe_id', 'shared_with_user_id']);
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('recipe_shares')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('recipes')
      .dropTableIfExists('users');
  };
