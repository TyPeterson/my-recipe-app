const db = require('../config/db');

async function createRecipe({ owner_user_id, title, instructions }) {
  const [recipe] = await db('recipes').insert({ owner_user_id, title, instructions }).returning('*');
  return recipe;
}

async function getRecipeById(id) {
  return db('recipes').where({ id }).first();
}

async function updateRecipe(id, data) {
  const [updated] = await db('recipes').where({ id }).update({ ...data, updated_at: db.fn.now() }).returning('*');
  return updated;
}

async function deleteRecipe(id) {
  return db('recipes').where({ id }).del();
}

async function getUserRecipes(owner_user_id) {
  return db('recipes').where({ owner_user_id }).orderBy('created_at', 'desc');
}

module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
};
