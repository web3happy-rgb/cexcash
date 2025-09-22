const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cexcash-dev-secret';
const JWT_EXPIRES_IN = '7d';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken
};
