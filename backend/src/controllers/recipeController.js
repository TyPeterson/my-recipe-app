// handle CRUD operations for recipes



const recipeService = require('../services/recipeService');

async function createRecipe(req, res, next) {
  try {
    const { title, instructions } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const recipe = await recipeService.createRecipe(req.user.id, title, instructions);
    res.status(201).json({ recipe });
  } catch (err) {
    next(err);
  }
}

async function getUserRecipes(req, res, next) {
  try {
    const recipes = await recipeService.getUserRecipes(req.user.id);
    res.json({ recipes });
  } catch (err) {
    next(err);
  }
}

async function getRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeIfUserCanAccess(req.user.id, id);
    res.json({ recipe });
  } catch (err) {
    next(err);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await recipeService.updateRecipe(req.user.id, id, data);
    res.json({ recipe: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    await recipeService.deleteRecipe(req.user.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRecipe,
  getUserRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
