const ingredientModel = require('../models/ingredientModel');
const shareModel = require('../models/shareModel');
const imageService = require('./imageService'); 

async function addIngredientToRecipe(user_id, recipe_id, name, quantity, imageBuffer, filename) {
  const canAccess = await shareModel.canUserAccessRecipe(user_id, recipe_id);
  if (!canAccess) {
    throw new Error('Access denied');
  }

  let image_url;
  if (imageBuffer && filename) {
    image_url = await imageService.uploadIngredientImage(imageBuffer, filename);
  }

  return ingredientModel.addIngredient({ recipe_id, name, quantity, image_url });
}

async function updateIngredientInRecipe(user_id, ingredient_id, data, imageBuffer, filename) {
  const ingredient = await ingredientModel.getIngredientById(ingredient_id);
  if (!ingredient) {
    throw new Error('Ingredient not found');
  }

  const canAccess = await shareModel.canUserAccessRecipe(user_id, ingredient.recipe_id);
  if (!canAccess) {
    throw new Error('Access denied');
  }

  let updateData = { ...data };

  // handle image updates
  if (imageBuffer && filename) {
    // if the ingredient already has an image, remove it first
    if (ingredient.image_url) {
      await imageService.deleteIngredientImage(ingredient.image_url);
    }
    // upload the new image
    const newImageUrl = await imageService.uploadIngredientImage(imageBuffer, filename);
    updateData.image_url = newImageUrl;
  } else if ('image_url' in updateData && (!updateData.image_url || updateData.image_url === null)) {
    // this implies we want to remove the existing image
    if (ingredient.image_url) {
      await imageService.deleteIngredientImage(ingredient.image_url);
    }
    // set image_url to null in the database
    updateData.image_url = null;
  }

  return ingredientModel.updateIngredient(ingredient_id, updateData);
}

async function deleteIngredientFromRecipe(user_id, ingredient_id) {
  const ingredient = await ingredientModel.getIngredientById(ingredient_id);
  if (!ingredient) {
    throw new Error('Ingredient not found');
  }

  const canAccess = await shareModel.canUserAccessRecipe(user_id, ingredient.recipe_id);
  if (!canAccess) {
    throw new Error('Access denied');
  }

  // if the ingredient has an image, remove it from S3
  if (ingredient.image_url) {
    await imageService.deleteIngredientImage(ingredient.image_url);
  }

  return ingredientModel.deleteIngredient(ingredient_id);
}

module.exports = {
  addIngredientToRecipe,
  updateIngredientInRecipe,
  deleteIngredientFromRecipe,
};
