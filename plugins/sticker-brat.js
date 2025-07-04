const handler = async (m, { conn, args }) =>
  args[0]
    ? conn.sendMessage(m.chat, {
        sticker: { url: `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(args.join(' '))}` },
        packname: 'Barboza',
        author: await conn.getName(m.sender)
      }, { quoted: m })
    : m.reply('📌 Ingresa el texto para generar el sticker.\n\nEj: .brat hola bola');

handler.command = /^brat$/i;
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;