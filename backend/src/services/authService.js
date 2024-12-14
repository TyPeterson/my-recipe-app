// logic for hashing passwords, verifying user credentials, and creating JWTs


const { hashPassword, verifyPassword } = require('../utils/hash');
const { createToken } = require('../utils/jwt');
const userModel = require('../models/userModel');

async function signUp(email, plainPassword) {
  // check if user already exists
  const existing = await userModel.findUserByEmail(email);
  if (existing) {
    throw new Error('User already exists');
  }

  const password_hash = await hashPassword(plainPassword);
  const user = await userModel.createUser({ email, password_hash });

  // create JWT token
  const token = createToken({ userId: user.id });

  return { user, token };
}


async function login(email, plainPassword) {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(plainPassword, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = createToken({ userId: user.id });
  return { user, token };
}

module.exports = { signUp, login };
