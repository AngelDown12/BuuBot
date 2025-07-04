import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply(`✏️ Escribe el texto para generar el sticker.\n\nEjemplo:\nbrat hola mundo`);
  }

  try {
    const text = encodeURIComponent(args.join(' '));
    const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${text}`;
    
    await m.react?.('⏳');

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('❌ No se pudo obtener imagen.');
    
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      sticker: buffer,
    }, { quoted: m });

    await m.react?.('✅');

  } catch (err) {
    console.error('[ERROR BRAT]', err);
    await m.react?.('❌');
    m.reply('❌ Ocurrió un error al generar el sticker. Intenta más tarde.');
  }
};

handler.customPrefix = /^brat$/i;
handler.command = new RegExp(); // para que funcione sin prefijo
handler.help = ['brat <texto>'];
handler.tags = ['sticker'];

export default handler;