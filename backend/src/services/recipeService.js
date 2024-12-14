// logic to use the Recipe model to interact with the database
const recipeModel = require('../models/recipeModel');
const shareModel = require('../models/shareModel');

async function createAndShareRecipe(ownerId, recipeData, shareWithUserId) {
  const recipe = await recipeModel.createRecipe({ owner_user_id: ownerId, ...recipeData });
  if (shareWithUserId) {
    await shareModel.shareRecipe(recipe.id, shareWithUserId, false);
  }
  return recipe;
}

module.exports = { createAndShareRecipe };
