/*
NOTE : mau sc gratis lagi?, silahkan join ke channel WhatsApp saya

 Credits By KiiCode Projects 
 Telegram : @kiicode
 Channel WhatsApp : https://whatsapp.com/channel/0029VaZSdai5Ui2TMoNsYo0J
 KiiCode Api : api.kiicodeit.me
 Elxyz Api : api.elxyz.me

 Tolong cr jangan di hapus, hargai saya sebagai yang buat 🙏
*/

const express = require('express');
const { tiktok } = require('./tiktok');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
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
