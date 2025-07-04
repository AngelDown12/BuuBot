import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
  if (!text) return;

  await m.react("🎧");

  const vid = (await yts(text)).videos[0];
  if (!vid) return m.reply("❌ No encontré resultados.", m);

  const id = vid.videoId;
  const format = ["play", "yta", "ytmp3"].includes(command) ? "mp3" : "mergedstreams";
  const api = `https://api.download-lagu-mp3.com/@api/json/${format}/${id}`;

  try {
    const res = await fetch(api);
    const json = await res.json();
    const url = json?.url || json?.audiostreams?.[0]?.url || json?.videos?.[0]?.url;
    if (!url) throw new Error("Sin enlace");

    await conn.sendMessage(m.chat, {
      [format === "mp3" ? "audio" : "video"]: { url },
      mimetype: format === "mp3" ? "audio/mpeg" : "video/mp4",
      fileName: `${vid.title}.${format === "mp3" ? "mp3" : "mp4"}`
    }, { quoted: m });

  } catch {
    return m.reply("❌ Error al descargar.", m);
  }
};

handler.command = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre o url>"];

export default handler;