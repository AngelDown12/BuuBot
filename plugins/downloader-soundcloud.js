import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("🎧 Ingresa el nombre o enlace del video.");

  const search = await yts(text);
  const vid = search.all[0];
  if (!vid) return m.reply("❌ No se encontró el video.");

  const { title, url, thumbnail, timestamp, views, ago, author } = vid;

  const info = `
🎧 *Título:* ${title}
⏱ *Duración:* ${timestamp}
📊 *Vistas:* ${views.toLocaleString()}
📆 *Publicado:* ${ago}
👤 *Canal:* ${author.name}
🔗 *URL:* ${url}`;

  const thumb = (await conn.getFile(thumbnail)).data;

  await conn.sendMessage(m.chat, {
    image: thumb,
    caption: info,
    contextInfo: {
      externalAdReply: {
        title: "🌀 𝐒𝐚𝐬𝐮𝐤𝐞 𝐁𝐨𝐭 𝐌𝐃",
        body: "El ninja más rápido de la hoja",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  if (["play", "yta", "ytmp3"].includes(command)) {
    const dl = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`);
    const json = await dl.json();
    const audio = json?.result?.url || json?.data?.download;

    if (!audio) return m.reply("❌ No se pudo descargar el audio.");

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } else if (["play2", "ytv", "ytmp4"].includes(command)) {
    const dl = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    const json = await dl.json();
    const video = json?.result?.url || json?.data?.download;

    if (!video) return m.reply("❌ No se pudo descargar el video.");

    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: `🎥 ${title}`,
      mimetype: 'video/mp4'
    }, { quoted: m });
  }
};

handler.command = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.help = ["play <nombre o url>", "play2 <nombre o url>"];

export default handler;