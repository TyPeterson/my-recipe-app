// generate and verify jwt token

require('dotenv').config();


const jwt = require('jsonwebtoken');

function createToken(payload) {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
}

module.exports = { createToken, verifyToken };
