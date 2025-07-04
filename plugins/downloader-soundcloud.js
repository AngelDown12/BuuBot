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
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  try {
    const isAudio = ["play", "yta", "ytmp3"].includes(command);

    const apiUrl = isAudio
      ? `https://api.vevioz.com/api/button/mp3/${encodeURIComponent(url)}`
      : `https://api.vevioz.com/api/button/mp4/${encodeURIComponent(url)}`;

    // VeVioz no da JSON, así que parseamos HTML para obtener url directo
    const res = await fetch(apiUrl);
    const html = await res.text();

    // Extraemos la primera URL de descarga que termine en mp3 o mp4
    const regex = isAudio
      ? /href="([^"]+\.mp3)"/i
      : /href="([^"]+\.mp4)"/i;
    const match = html.match(regex);

    if (!match) throw new Error("No se encontró enlace de descarga");

    const downloadUrl = match[1];

    await conn.sendMessage(m.chat, {
      [isAudio ? "audio" : "video"]: { url: downloadUrl },
      fileName: `${title}.${isAudio ? "mp3" : "mp4"}`,
      mimetype: isAudio ? "audio/mpeg" : "video/mp4"
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Error al descargar el archivo. Intenta más tarde.", m);
  }
};

handler.command = ["play", "play2", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre/url>"];

export default handler;