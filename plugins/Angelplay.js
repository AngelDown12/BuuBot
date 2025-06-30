import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    await m.react('📀');
    return m.reply(`╭─⬣「 𝐀𝐧𝐠𝐞𝐥 」⬣
│  ❗ *Uso Incorrecto*
│  ➤ Ingresa un texto para buscar en YouTube.
│  ➤ *Ejemplo:* ${usedPrefix + command} Shakira
╰`);
  }

  try {
    await m.react('📀'); // buscando...

    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ⚠️ *Sin Resultados*
│  ➤ No se encontraron resultados para:
│  ➤ *"${text}"*
╰`);
    }

    const video = searchData.data[0];

    const playerMsg = `*POLVORA BOT Music* - youtube ❤️

${video.duration} ━━━━⬤─────── 04:05

*${video.title}*
🔗 ${video.url}

» 𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝘼𝙐𝘿𝙄𝙊 🎧
» 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊 . . .

*⇆‌ ㅤ ㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤ ㅤㅤ↻*`;

    await conn.sendMessage(m.chat, {
      text: playerMsg
    }, { quoted: m });

    const downloadApi = `https://api.vreden.my.id/api/ytmp3?url=${video.url}`;
    const downloadResponse = await fetch(downloadApi);
    const downloadData = await downloadResponse.json();

    if (!downloadData?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error al descargar*
│  ➤ No se pudo obtener el audio del video.
╰`);
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadData.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`,
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
  } catch (error) {
    console.error(error);
    await m.react('🔴');
    m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error Interno*
│  ➤ ${error.message}
╰`);
  }
};

handler.command = ['play', 'playaudio'];
handler.help = ['play <texto>', 'playaudio <texto>'];
handler.tags = ['media'];

export default handler;