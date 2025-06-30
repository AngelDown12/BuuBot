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
    await m.react('📀');

    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`;
    const res = await fetch(searchApi);
    const json = await res.json();

    if (!json?.data || !json.data.length) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ⚠️ *Sin Resultados*
│  ➤ No se encontraron resultados para:
│  ➤ *"${text}"*
╰`);
    }

    const vid = json.data[0];

    // Enviar link con vista previa
    await conn.sendMessage(m.chat, {
      text: vid.url,
      contextInfo: {
        externalAdReply: {
          title: vid.title,
          body: "YouTube",
          mediaType: 1,
          thumbnailUrl: vid.thumbnail,
          renderLargerThumbnail: true,
          mediaUrl: vid.url,
          sourceUrl: vid.url,
          showAdAttribution: true
        }
      }
    }, { quoted: m });

    // Mensaje de “enviando audio”
    await conn.sendMessage(m.chat, {
      text: `*POLVORA BOT Music* - youtube ❤️\n\n${vid.duration} ━━━━⬤─────── ${vid.duration}\n\n${vid.title}\n\n» 𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝘼𝙐𝘿𝙄𝙊 🎧\n» 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊 . . .\n\n*⇆‌ ㅤ ㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤ ㅤㅤ↻*`,
    }, { quoted: m });

    // Descargar el audio
    const downloadApi = `https://api.vreden.my.id/api/ytmp3?url=${vid.url}`;
    const dl = await fetch(downloadApi).then(v => v.json());

    if (!dl?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error al descargar*
│  ➤ No se pudo obtener el audio del video.
╰`);
    }

    // Enviar audio con ícono
    await conn.sendMessage(m.chat, {
      audio: { url: dl.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${vid.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: 'Angel Bot Delay',
          body: 'Angel Bot Delay',
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          sourceUrl: '',
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

    await m.react('🟢');
  } catch (e) {
    console.error(e);
    await m.react('🔴');
    return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error Interno*
│  ➤ ${e.message}
╰`);
  }
};

handler.command = ['play', 'playaudio'];
handler.help = ['play <texto>', 'playaudio <texto>'];
handler.tags = ['media'];

export default handler;