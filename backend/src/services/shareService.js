const shareModel = require('../models/shareModel');
const recipeModel = require('../models/recipeModel');

async function shareRecipeWithUser(ownerUserId, recipeId, sharedWithUserId, canEdit) {
  const recipe = await recipeModel.getRecipeById(recipeId);
  if (!recipe || recipe.owner_user_id !== ownerUserId) {
    throw new Error('Only the owner can share the recipe');
  }
  return shareModel.shareRecipe(recipeId, sharedWithUserId, canEdit);
}

async function updateSharePermission(ownerUserId, shareId, canEdit) {
  const share = await shareModel.getShareById(shareId);
  if (!share) throw new Error('Share not found');

  const recipe = await recipeModel.getRecipeById(share.recipe_id);
  if (!recipe || recipe.owner_user_id !== ownerUserId) throw new Error('Access denied');

  return shareModel.updateShare(shareId, canEdit);
}

async function removeShare(ownerUserId, shareId) {
  const share = await shareModel.getShareById(shareId);
  if (!share) throw new Error('Share not found');

  const recipe = await recipeModel.getRecipeById(share.recipe_id);
  if (!recipe || recipe.owner_user_id !== ownerUserId) throw new Error('Access denied');

  return shareModel.removeShare(shareId);
}

module.exports = {
  shareRecipeWithUser,
  updateSharePermission,
  removeShare,
};
