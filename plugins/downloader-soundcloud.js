import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
  if (!text) return;

  // Evitar error por JID inválido
  const chatId = typeof m.chat === "string" ? m.chat : m.sender;
  if (!chatId.endsWith("@s.whatsapp.net") && !chatId.endsWith("@g.us")) {
    return m.reply("❌ No puedo enviar audios aquí.");
  }

  await m.react("🎧");

  try {
    const vid = (await yts(text)).videos[0];
    if (!vid) return m.reply("❌ No encontré resultados.");

    const videoId = vid.videoId;
    const isAudio = ["play", "yta", "ytmp3"].includes(command);
    const endpoint = isAudio ? "mp3" : "mergedstreams";
    const api = `https://api.download-lagu-mp3.com/@api/json/${endpoint}/${videoId}`;

    const res = await fetch(api);
    const json = await res.json();

    const url = json?.url || json?.audiostreams?.[0]?.url || json?.videos?.[0]?.url;
    if (!url) throw new Error("Enlace no disponible");

    await conn.sendMessage(chatId, {
      [isAudio ? "audio" : "video"]: { url },
      mimetype: isAudio ? "audio/mpeg" : "video/mp4",
      fileName: `${vid.title}.${isAudio ? "mp3" : "mp4"}`
    }, { quoted: m.key ? m : undefined });

  } catch (e) {
    console.error(e);
    return m.reply("❌ Error al procesar o enviar el archivo.");
  }
};

handler.command = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre o url>"];
export default handler;