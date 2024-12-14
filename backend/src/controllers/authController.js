// handle user login, signup, and logout


const authService = require('../services/authService');

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const { user, token } = await authService.signUp(email, password);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { signUp, login };

