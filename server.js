const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/kirim-pesan', async (req, res) => {
  const { nama, email, pesan } = req.body;

  // 100% DATA ASLI DARI SCREENSHOT TELEGRAM LU:
  const TOKEN_BOT = "8987910564:AAH_H7GscDfmr2N6IsZX8wGRJxWI9Qr5DWY";
  const CHAT_ID = "7553474117";

  const urlTelegram = `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage`;
  const formatPesan = `📩 [ PESAN DARI WEB PORTOFOLIO ]\n\n👤 Nama: ${nama}\n📧 Email: ${email}\n💬 Pesan:\n"${pesan}"`;

  try {
    const respon = await fetch(urlTelegram, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: formatPesan })
    });

    if (respon.ok) {
      res.json({ sukses: true });
    } else {
      res.status(500).json({ sukses: false });
    }
  } catch (error) {
    res.status(500).json({ sukses: false });
  }
});

const server = app.listen(port, () => {
  console.log(`\n[ power on ] Server web running`);
});

setInterval(() => {
  console.log(`[ ping ] server running...`);
}, 5000);