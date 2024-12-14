const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const shareController = require('../controllers/shareController');

router.use(authMiddleware);

router.post('/recipes/:id/share', shareController.shareRecipe);
router.put('/shares/:shareId', shareController.updateShare);
router.delete('/shares/:shareId', shareController.removeShare);

module.exports = router;
