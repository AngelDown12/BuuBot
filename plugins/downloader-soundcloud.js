import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text, command }) => {
  if (!text) return;

  await m.react("🎬");

  try {
    const vid = (await yts(text)).videos[0];
    if (!vid) throw "no_video";

    const url = `https://mode-api-sigma.vercel.app/api/mp4?url=${encodeURIComponent(vid.url)}`;
    const res = await fetch(url);
    if (!res.ok) throw "fetch_failed";

    const json = await res.json();
    const downloadUrl = json.url;

    if (!downloadUrl) throw "no_url";

    await conn.sendMessage(m.chat, {
      video: { url: downloadUrl },
      fileName: `${vid.title}.mp4`,
      mimetype: "video/mp4",
      caption: `🎬 Aquí tienes tu video: ${vid.title}`,
    }, { quoted: m });

  } catch (e) {
    const errorMessage = {
      no_video: "❌ No encontré ningún video con ese nombre.",
      fetch_failed: "⚠️ Hubo un problema al obtener el enlace de descarga.",
      no_url: "⚠️ La API no devolvió un enlace de descarga válido.",
      default: "❌ Ocurrió un error inesperado.",
    };

    m.reply(errorMessage[e] || errorMessage.default);
  }
};

handler.command = ["play"];
handler.tags = ["downloader"];
handler.help = ["play <nombre o enlace>"];

export default handler;