import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return;

  const text = encodeURIComponent(args.join(' '));
  const apiUrl = `https://api.nekorinn.my.id/maker/bratvid?text=${text}`;

  try {
    const res = await fetch(apiUrl);
    const buffer = await res.buffer();

    const stik = await sticker(buffer, false, 'Barboza', 'Angel Bot');
    if (stik) return conn.sendFile(m.chat, stik, 'bratv.webp', '', m);
    
  } catch {}
};

handler.command = /^bratv$/i;

export default handler;