import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return;

  const text = args.join(' ');
  const apiUrl = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(apiUrl);
    const buffer = await res.buffer();
    await conn.sendFile(m.chat, buffer, 'bratsticker.webp', '', m, { asSticker: true });
  } catch {}
};

handler.command = /^bratv$/i;

export default handler;