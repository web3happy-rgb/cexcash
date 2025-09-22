const bcrypt = require('bcryptjs');
const db = require('../db');
const { createToken } = require('../utils/tokens');

const userByEmailStmt = db.prepare('SELECT * FROM users WHERE email = ?');
const insertUserStmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = userByEmailStmt.get(email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'An account with that email already exists.' });
  }

  const hash = await bcrypt.hash(password, 12);
  const info = insertUserStmt.run(name, email.toLowerCase(), hash);
  const token = createToken({ id: info.lastInsertRowid, email: email.toLowerCase(), name });

  res.status(201).json({
    token,
    user: {
      id: info.lastInsertRowid,
      name,
      email: email.toLowerCase()
    }
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = userByEmailStmt.get(email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = createToken({ id: user.id, email: user.email, name: user.name });
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}

function me(req, res) {
  res.json({ user: req.user });
}

module.exports = {
  register,
  login,
  me
};
