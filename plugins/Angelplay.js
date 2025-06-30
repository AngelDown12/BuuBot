import { youtubedl, youtubedlv2 } from '@bochilteam/scraper-youtube';
let handler = async (m, { conn, text, args, command }) => {
  if (!text) throw '*🚫 Ingresa el nombre de una canción o artista.*';

  await m.react('🎵');

  let vid;
  try {
    vid = (await youtubedl(text)).video[0];
    if (!vid) vid = (await youtubedlv2(text)).video[0];
  } catch (e) {
    return m.reply('*❌ No se encontró el video. Intenta con otro nombre.*');
  }

  const { title, url, durationH, durationS } = vid;
  if (durationS > 3600) throw '*⏱️ El video es demasiado largo. Máximo 1 hora.*';

  await conn.sendMessage(m.chat, { text: url }, { quoted: m }); // 👈 Solo el link para vista previa

  await conn.sendMessage(m.chat, {
    audio: { url: vid.audio.url },
    mimetype: 'audio/mpeg',
    ptt: false,
    contextInfo: {
      externalAdReply: {
        title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
        sourceUrl: url,
        renderLargerThumbnail: false,
        mediaType: 2
      }
    }
  }, { quoted: m });

  await m.react('✅');
};

handler.command = /^play$/i;
export default handler;