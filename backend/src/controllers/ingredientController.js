// handle actions related to ingredients


const ingredientService = require('../services/ingredientService');

async function addIngredient(req, res, next) {
  try {
    const { recipeId } = req.params;
    const { name, quantity, image_url } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const ingredient = await ingredientService.addIngredientToRecipe(req.user.id, recipeId, name, quantity, image_url);
    res.status(201).json({ ingredient });
  } catch (err) {
    next(err);
  }
}

async function updateIngredient(req, res, next) {
  try {
    const { ingredientId } = req.params;
    const data = req.body;
    const updated = await ingredientService.updateIngredientInRecipe(req.user.id, ingredientId, data);
    res.json({ ingredient: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteIngredient(req, res, next) {
  try {
    const { ingredientId } = req.params;
    await ingredientService.deleteIngredientFromRecipe(req.user.id, ingredientId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
