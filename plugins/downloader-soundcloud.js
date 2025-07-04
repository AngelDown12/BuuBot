import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const ddownr = {
  download: async (url, format) => {
    const validFormats = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav", "360", "480", "720"];
    if (!validFormats.includes(format)) throw new Error("❌ Formato inválido.");

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" },
    };

    const response = await axios.request(config);
    if (!response.data?.success) throw new Error("❌ No se pudo obtener el enlace.");

    const downloadUrl = await ddownr.checkProgress(response.data.id);
    if (!downloadUrl) throw new Error("❌ Falló obtener el enlace final.");
    return downloadUrl;
  },

  checkProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: { "User-Agent": "Mozilla/5.0" },
    };

    for (let i = 0; i < 20; i++) {  // Limitar a máximo 20 intentos (~40 seg)
      const res = await axios.request(config);
      if (res.data?.success && res.data.progress === 1000) return res.data.download_url;
      await new Promise(r => setTimeout(r, 2000));
    }
    return null;
  },
};

const handler = async (m, { conn, text, command }) => {
  if (!text?.trim()) return;

  await m.react("🌀");

  try {
    const search = await yts(text);
    const video = search.all[0];
    const url = video?.url;
    if (!url) throw "❌ Video no encontrado.";

    if (["play", "yta", "ytmp3"].includes(command)) {
      const audioUrl = await ddownr.download(url, "mp3");
      await m.react("✅");
      await conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        fileName: `${video.title}.mp3`,
      }, { quoted: m });

    } else if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`,
      ];

      for (const src of sources) {
        try {
          const res = await fetch(src);
          if (!res.ok) continue;
          const json = await res.json();
          const dl = json?.data?.dl || json?.result?.download?.url || json?.downloads?.url;
          if (!dl) continue;

          await m.react("✅");
          await conn.sendMessage(m.chat, {
            video: { url: dl },
            mimetype: "video/mp4",
            fileName: `${video.title}.mp4`,
          }, { quoted: m });

          return;
        } catch {}
      }

      return m.reply("❌ No se pudo descargar el video.");
    }
  } catch (e) {
    console.error(e);
    return m.reply("❌ Error inesperado.");
  }
};

handler.command = ["play", "play2", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <texto o url>"];

export default handler;