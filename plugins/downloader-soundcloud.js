import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, "🎧 Ingresa nombre o enlace.", m);

  const vid = (await yts(text)).all[0];
  if (!vid) return conn.reply(m.chat, "❌ No encontré el video.", m);

  const { title, url, thumbnail } = vid;
  const thumb = (await conn.getFile(thumbnail)).data;

  // Envía info + miniatura
  conn.sendMessage(m.chat, {
    image: thumb,
    caption: `🎧 ${title}`,
    contextInfo: {
      externalAdReply: {
        title: "Sasuke Bot MD",
        body: title,
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  try {
    const isAudio = ["play","yta","ytmp3"].includes(command);
    const api = isAudio
      ? `https://api.siputzx.my.id/api/d/ytmp3?url=${url}`
      : `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`;
    const res = await fetch(api);
    const j = await res.json();
    const dl = j.result?.url || j.data?.download;
    if (!dl) throw 1;

    await conn.sendMessage(m.chat, {
      [isAudio ? "audio" : "video"]: { url: dl },
      fileName: `${title}.${isAudio?"mp3":"mp4"}`,
      mimetype: isAudio?"audio/mpeg":"video/mp4"
    }, { quoted: m });

  } catch {
    conn.reply(m.chat, "❌ Error al descargar.", m);
  }
};

handler.command = ["play","play2","yta","ytmp3","ytv","ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre/url>"];

export default handler;