// handle sharing recipes with other users


const shareService = require('../services/shareService');

async function shareRecipe(req, res, next) {
  try {
    const { id } = req.params; // recipeId
    const { sharedWithUserId, canEdit = false } = req.body;
    if (!sharedWithUserId) return res.status(400).json({ error: 'sharedWithUserId is required' });

    const share = await shareService.shareRecipeWithUser(req.user.id, id, sharedWithUserId, canEdit);
    res.status(201).json({ share });
  } catch (err) {
    next(err);
  }
}

async function updateShare(req, res, next) {
  try {
    const { shareId } = req.params;
    const { canEdit } = req.body;
    if (typeof canEdit !== 'boolean') {
      return res.status(400).json({ error: 'canEdit must be a boolean' });
    }

    const updated = await shareService.updateSharePermission(req.user.id, shareId, canEdit);
    res.json({ share: updated });
  } catch (err) {
    next(err);
  }
}

async function removeShare(req, res, next) {
  try {
    const { shareId } = req.params;
    await shareService.removeShare(req.user.id, shareId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  shareRecipe,
  updateShare,
  removeShare,
};

