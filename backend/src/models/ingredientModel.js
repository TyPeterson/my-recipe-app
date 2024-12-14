const db = require('../config/db');

async function addIngredient({ recipe_id, name, quantity, image_url }) {
  const [ingredient] = await db('ingredients').insert({ recipe_id, name, quantity, image_url }).returning('*');
  return ingredient;
}

async function getIngredientsByRecipeId(recipe_id) {
  return db('ingredients').where({ recipe_id }).orderBy('created_at', 'asc');
}

async function getIngredientById(id) {
  return db('ingredients').where({ id }).first();
}

async function updateIngredient(id, data) {
  const [updated] = await db('ingredients').where({ id }).update({ ...data, updated_at: db.fn.now() }).returning('*');
  return updated;
}

async function deleteIngredient(id) {
  return db('ingredients').where({ id }).del();
}

module.exports = {
  addIngredient,
  getIngredientsByRecipeId,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
