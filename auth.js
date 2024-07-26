const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database');

// Secret key untuk JWT
const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan key yang aman

// Registrasi pengguna
async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, username });
      }
    );
  });
}

// Login pengguna
async function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject('User not found');
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return reject('Invalid password');

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        resolve({ token });
      }
    );
  });
}

module.exports = { registerUser, loginUser };
