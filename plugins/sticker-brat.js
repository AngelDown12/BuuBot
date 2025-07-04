import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('📌 Ingresa el texto para generar el sticker.\n\nEj: .brat hola bola');

  const text = encodeURIComponent(args.join(' '));
  const url = `https://api.siputzx.my.id/api/m/brat?text=${text}`;

  try {
    // Enviar directo el sticker sin reaccionar
    await conn.sendMessage(m.chat, {
      sticker: { url },
      packname: 'Barboza',
      author: await conn.getName(m.sender)
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('🚫 Error al generar el sticker. Intenta de nuevo.');
  }
};

handler.command = /^brat$/i;
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;