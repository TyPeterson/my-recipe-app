const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ingredientController = require('../controllers/ingredientController');

router.use(authMiddleware);

router.post('/recipes/:recipeId/ingredients', ingredientController.addIngredient);
router.put('/ingredients/:ingredientId', ingredientController.updateIngredient);
router.delete('/ingredients/:ingredientId', ingredientController.deleteIngredient);

module.exports = router;
