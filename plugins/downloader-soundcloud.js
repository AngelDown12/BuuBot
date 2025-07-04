import yts from "yt-search";
import fetch from "node-fetch";

const API_ROOT = "https://youtube-download-api.matheusishiyama.repl.co";

const handler = async (m, { conn, text, command }) => {
  if (!text) return;
  await m.react("🎧");

  try {
    const vid = (await yts(text)).videos[0];
    if (!vid) throw "no_video";

    const url = `${API_ROOT}/${["mp3","mp4"].includes(command)?command:"mp3"}/?url=${encodeURIComponent(vid.url)}`;
    const res = await fetch(url);
    if (!res.ok) throw "fetch_failed";

    const buf = await res.buffer();

    const isAudio = command.startsWith("mp3") || command === "play" || command === "yta";
    await conn.sendMessage(m.chat, {
      [isAudio ? "audio" : "video"]: { buffer: buf },
      mimetype: isAudio ? "audio/mpeg" : "video/mp4",
      fileName: `${vid.title}.${isAudio ? "mp3" : "mp4"}`,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    const msg = e === "no_video" ? "❌ Video no encontrado."
              : e === "fetch_failed" ? "⚠️ Error en la API de descarga."
              : "❌ Error inesperado.";
    m.reply(msg);
  }
};

handler.command = ["play","mp3","mp4","yta","ytv"];
handler.tags = ["downloader"];
handler.help = ["play <texto o url>"];

export default handler;