// map the endpoints to the controller functions

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const recipeController = require('../controllers/recipeController');

// all recipe routes require authentication
router.use(authMiddleware);

router.post('/', recipeController.createRecipe);
router.get('/', recipeController.getUserRecipes);
router.get('/:id', recipeController.getRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;

