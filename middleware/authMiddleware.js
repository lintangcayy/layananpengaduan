const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan key yang aman

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token dari header Authorization

  if (token == null) return res.sendStatus(401); // Jika tidak ada token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Jika token tidak valid
    req.user = user; // Simpan user dari token di request
    next(); // Lanjutkan ke middleware berikutnya
  });
}

module.exports = authenticateToken;
