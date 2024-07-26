const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Ganti dengan password MySQL Anda
  database: 'pengaduan_db' // Ganti dengan nama database Anda
});

// Menghubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL', err);
    return;
  }
  console.log('Connected to MySQL');

  // Membuat tabel pengaduan jika belum ada
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pengaduan (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255),
      email VARCHAR(255),
      keluhan TEXT,
      status ENUM('Pending', 'Selesai') DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table', err);
    }
  });
});

module.exports = connection;
