const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('📌 Ingresa el texto para generar el sticker.\n\nEj: .brat hola bola');

  const text = encodeURIComponent(args.join(' '));
  const url = `https://api.siputzx.my.id/api/m/brat?text=${text}`;

  try {
    // Reacción "⏳" justo cuando entra el comando
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // Enviar sticker directo, sin fetch ni validación extra
    await conn.sendMessage(m.chat, {
      sticker: { url },
      packname: 'Barboza',
      author: await conn.getName(m.sender)
    }, { quoted: m });

    // Reacción "✅" cuando ya envió el sticker
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch {
    // Reacción "❌" si falla
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply('🚫 Error al generar el sticker. Intenta de nuevo.');
  }
};

handler.command = /^brat$/i;
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;