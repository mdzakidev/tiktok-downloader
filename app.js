const express = require('express');
const { tiktok } = require('./tiktok');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/tiktok', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: false, msg: 'URL is required' });
  }
  try {
    const result = await tiktok(url);
    if (result.status) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
