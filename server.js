const express = require('express');
const bodyParser = require('body-parser');
const pengaduanRoutes = require('./routes/pengaduan');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/pengaduan', pengaduanRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Pengaduan Layanan Pelayanan');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
