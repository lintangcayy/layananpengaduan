const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../auth');

// Registrasi pengguna
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login pengguna
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token } = await loginUser(username, password);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
