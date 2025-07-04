import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
  if (!text) return;

  const chatId = typeof m.chat === "string" ? m.chat : m.sender;
  if (!chatId.endsWith("@s.whatsapp.net") && !chatId.endsWith("@g.us")) return;

  await m.react("🎧");

  try {
    const vid = (await yts(text)).videos[0];
    if (!vid) throw new Error("video_not_found");

    const isAudio = ["play", "yta", "ytmp3"].includes(command);
    const endpoint = isAudio ? "mp3" : "mergedstreams";
    const api = `https://api.download-lagu-mp3.com/@api/json/${endpoint}/${vid.videoId}`;

    const res = await fetch(api);
    if (!res.ok) throw new Error("api_fetch_failed");

    const json = await res.json();
    const url = json.url || json.audiostreams?.[0]?.url || json.videos?.[0]?.url;
    if (!url) throw new Error("no_download_url");

    console.log("✅ Downloading URL:", url);

    await conn.sendMessage(chatId, {
      [isAudio ? "audio" : "video"]: { url },
      mimetype: isAudio ? "audio/mpeg" : "video/mp4",
      fileName: `${vid.title}.${isAudio ? "mp3" : "mp4"}`
    }, { quoted: m });

    console.log("✅ Sent successfully");

  } catch (e) {
    console.error("❌ Handler error:", e);
    let msg = "❌ Error en el comando.";
    if (e.message === "video_not_found") msg = "❌ No encontré ningún video.";
    if (e.message === "api_fetch_failed") msg = "❌ No se pudo llamar la API.";
    if (e.message === "no_download_url") msg = "❌ La API no devolvió enlace.";
    conn.reply(chatId, msg, m);
  }
};

handler.command = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre o url>"];
export default handler;