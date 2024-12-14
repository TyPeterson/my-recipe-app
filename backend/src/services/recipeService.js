// logic to use the Recipe model to interact with the database


const recipeModel = require('../models/recipeModel');
const shareModel = require('../models/shareModel');

async function createRecipe(owner_user_id, title, instructions) {
  return recipeModel.createRecipe({ owner_user_id, title, instructions });
}

async function getUserRecipes(user_id) {
  const owned = await recipeModel.getUserRecipes(user_id);
  const shared = await shareModel.getRecipesSharedWithUser(user_id);
  return [...owned, ...shared];
}

async function getRecipeIfUserCanAccess(user_id, recipe_id) {
  const canAccess = await shareModel.canUserAccessRecipe(user_id, recipe_id);
  if (!canAccess) throw new Error('Access denied');
  return recipeModel.getRecipeById(recipe_id);
}

async function updateRecipe(user_id, recipe_id, data) {
  const canAccess = await shareModel.canUserAccessRecipe(user_id, recipe_id);
  if (!canAccess) throw new Error('Access denied');
  return recipeModel.updateRecipe(recipe_id, data);
}

async function deleteRecipe(user_id, recipe_id) {
  const recipe = await recipeModel.getRecipeById(recipe_id);
  if (!recipe || recipe.owner_user_id !== user_id) throw new Error('Access denied');
  return recipeModel.deleteRecipe(recipe_id);
}

module.exports = {
  createRecipe,
  getUserRecipes,
  getRecipeIfUserCanAccess,
  updateRecipe,
  deleteRecipe,
};
