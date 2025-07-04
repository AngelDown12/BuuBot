import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return;

  const text = encodeURIComponent(args.join(' '));
  const apiUrl = `https://api.nekorinn.my.id/maker/bratvid?text=${text}`;

  try {
    const res = await fetch(apiUrl);
    const buffer = await res.buffer();

    // Enviarlo como documento .webp (visible, descargable)
    await conn.sendMessage(m.chat, {
      document: buffer,
      fileName: 'bratsticker.webp',
      mimetype: 'image/webp'
    }, { quoted: m });

  } catch {}
};

handler.command = /^bratv$/i;

export default handler;