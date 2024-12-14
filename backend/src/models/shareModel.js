const db = require('../config/db');

async function shareRecipe(recipe_id, shared_with_user_id, can_edit = false) {
  const [share] = await db('recipe_shares')
    .insert({ recipe_id, shared_with_user_id, can_edit })
    .returning('*');
  return share;
}

async function getSharedUsersForRecipe(recipe_id) {
  return db('recipe_shares').where({ recipe_id });
}

async function updateShare(id, can_edit) {
  const [updated] = await db('recipe_shares').where({ id }).update({ can_edit, updated_at: db.fn.now() }).returning('*');
  return updated;
}

async function removeShare(id) {
  return db('recipe_shares').where({ id }).del();
}

async function canUserAccessRecipe(user_id, recipe_id) {
  const recipeOwner = await db('recipes').where({ id: recipe_id, owner_user_id: user_id }).first();
  if (recipeOwner) return true;

  const share = await db('recipe_shares').where({ recipe_id, shared_with_user_id: user_id }).first();
  return !!share;
}

async function getRecipesSharedWithUser(user_id) {
  const shares = await db('recipe_shares').where({ shared_with_user_id: user_id });
  const recipeIds = shares.map(s => s.recipe_id);
  if (recipeIds.length === 0) return [];
  return db('recipes').whereIn('id', recipeIds);
}

async function getShareById(id) {
  return db('recipe_shares').where({ id }).first();
}

module.exports = {
  shareRecipe,
  getSharedUsersForRecipe,
  updateShare,
  removeShare,
  canUserAccessRecipe,
  getRecipesSharedWithUser,
  getShareById,
};
