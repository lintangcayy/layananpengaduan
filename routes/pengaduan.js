const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/authMiddleware');

// Mendapatkan semua pengaduan (memerlukan autentikasi)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM pengaduan', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Mendapatkan pengaduan berdasarkan ID (memerlukan autentikasi)
router.get('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM pengaduan WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results[0] });
  });
});

// Membuat pengaduan baru (memerlukan autentikasi)
router.post('/', authenticateToken, (req, res) => {
  const { nama, email, keluhan } = req.body;
  db.query('INSERT INTO pengaduan (nama, email, keluhan) VALUES (?, ?, ?)', [nama, email, keluhan], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Pengaduan berhasil dibuat',
      data: {
        id: this.insertId,
        nama,
        email,
        keluhan,
        status: 'Pending'
      }
    });
  });
});

// Mengupdate status pengaduan (memerlukan autentikasi)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query('UPDATE pengaduan SET status = ? WHERE id = ?', [status, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Status pengaduan berhasil diupdate',
      changes: results.affectedRows
    });
  });
});

// Menghapus pengaduan (memerlukan autentikasi)
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pengaduan WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Pengaduan berhasil dihapus',
      changes: results.affectedRows
    });
  });
});

module.exports = router;
