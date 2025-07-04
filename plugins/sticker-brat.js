import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('📌 Ingresa el texto para generar el sticker.\n\nEj: brat hola bola');

  const text = encodeURIComponent(args.join(' '));
  const url = `https://api.siputzx.my.id/api/m/brat?text=${text}`;

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    const res = await fetch(url);
    if (!res.ok) throw '❌ No se pudo generar el sticker.';

    await conn.sendMessage(m.chat, {
      sticker: { url },
      packname: 'Barboza',
      author: await conn.getName(m.sender)
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply('🚫 Error al generar el sticker. Intenta de nuevo.');
  }
};

handler.customPrefix = /^brat$/i;
handler.command = new RegExp(); // para usar sin prefijo
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;