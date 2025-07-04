const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('📌 Ingresa el texto para generar el sticker.\n\nEj: .brat hola bola');

  const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(args.join(' '))}`;

  return conn.sendMessage(m.chat, {
    sticker: { url },
    packname: 'Barboza',
    author: await conn.getName(m.sender)
  }, { quoted: m });
};

handler.command = /^brat$/i;
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;