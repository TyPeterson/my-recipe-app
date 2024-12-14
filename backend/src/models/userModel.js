const db = require('../config/db');

function createUser(data) {
  return db('users').insert(data).returning('*');
}

function findUserByEmail(email) {
  return db('users').where({ email }).first();
}

module.exports = { createUser, findUserByEmail };
