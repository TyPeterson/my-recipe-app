const db = require('../config/db');

async function createUser({ email, password_hash }) {
  const [user] = await db('users')
    .insert({ email, password_hash })
    .returning('*');
  return user;
}

async function findUserByEmail(email) {
  return db('users').where({ email }).first();
}

async function findUserById(id) {
  return db('users').where({ id }).first();
}

module.exports = { createUser, findUserByEmail, findUserById };
