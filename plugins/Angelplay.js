import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  // Evitar errores por tipo
  if (typeof text !== 'string') text = '';

  if (!text) {
    await m.react('📀');
    return m.reply(`╭─⬣「 𝐀𝐧𝐠𝐞𝐥 」⬣
│  ❗ *Uso Incorrecto*
│  ➤ Ingresa un texto para buscar en YouTube.
│  ➤ *Ejemplo:* ${usedPrefix + command} Shakira
╰`);
  }

  try {
    await m.react('📀');

    // Buscar en YouTube
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`);
    const json = await res.json();

    if (!json?.data?.length) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ⚠️ *Sin Resultados*
│  ➤ No se encontraron resultados para:
│  ➤ *"${text}"*
╰`);
    }

    const vid = json.data[0];

    // 1. Enviar link del video
    await conn.sendMessage(m.chat, { text: vid.url }, { quoted: m });

    // 2. Reproductor de texto
    const msg = `*POLVORA BOT Music* - youtube ❤️

${vid.duration} ━━━━⬤─────── 04:05

*${vid.title}*

» 𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝘼𝙐𝘿𝙄𝙊 🎧
» 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊 . . .

*⇆‌ ㅤ ㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤ ㅤㅤ↻*`;

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

    // 3. Descargar audio
    const down = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${vid.url}`);
    const downData = await down.json();

    if (!downData?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error al descargar*
│  ➤ No se pudo obtener el audio del video.
╰`);
    }

    // 4. Enviar audio con icono personalizado
    await conn.sendMessage(m.chat, {
      audio: { url: downData.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${vid.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
          body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
          thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m });

    await m.react('🟢');
  } catch (e) {
    console.error(e);
    await m.react('🔴');
    m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error Interno*
│  ➤ ${e.message}
╰`);
  }
};

handler.command = ['play', 'playaudio'];
handler.help = ['play <texto>'];
handler.tags = ['media'];

export default handler;