import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const ddownr = {
  download: async (url, format) => {
    const audioFormats = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
    const videoFormats = ["360", "480", "720", "1080", "1440", "4k"];

    if (!audioFormats.includes(format) && !videoFormats.includes(format))
      throw new Error("⚠️ Formato no soportado.");

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" },
    };

    const response = await axios.request(config);
    if (!response.data?.success) throw new Error("⛔ No se pudo obtener detalles.");

    const downloadUrl = await ddownr.checkProgress(response.data.id);
    return { title: response.data.title, downloadUrl };
  },

  checkProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: { "User-Agent": "Mozilla/5.0" },
    };

    while (true) {
      const response = await axios.request(config);
      if (response.data?.success && response.data.progress === 1000) return response.data.download_url;
      await new Promise((r) => setTimeout(r, 3000));
    }
  },
};

const handler = async (m, { conn, text, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, "⚡️ Ingresa el nombre o enlace de la canción/video.", m);

  try {
    const search = await yts(text);
    if (!search.all.length) return m.reply("❌ No encontré resultados.");

    const video = search.all[0];
    const { title, url } = video;

    if (["play", "yta", "ytmp3"].includes(command)) {
      // Descarga y envía audio sin miniatura ni texto extra
      const dl = await ddownr.download(url, "mp3");
      await conn.sendMessage(m.chat, {
        audio: { url: dl.downloadUrl },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`,
      }, { quoted: m });

    } else if (["play2", "ytv", "ytmp4"].includes(command)) {
      // Video con las fuentes principales sin mensajes extras
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`,
      ];

      let downloaded = false;
      for (const src of sources) {
        try {
          const res = await fetch(src);
          if (!res.ok) continue;
          const json = await res.json();
          const downloadUrl = json?.data?.dl || json?.result?.download?.url || json?.downloads?.url || json?.data?.download?.url;
          if (!downloadUrl) continue;

          await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
          }, { quoted: m });

          downloaded = true;
          break;
        } catch {
          // Siguiente fuente
        }
      }

      if (!downloaded) {
        return m.reply("❌ No se pudo descargar el video de ninguna fuente.");
      }
    } else {
      return m.reply("❌ Comando no reconocido.");
    }

  } catch (err) {
    console.error(err);
    return m.reply(`⚠️ Ocurrió un error: ${err.message || err}`, m);
  }
};

handler.command = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.help = ["play <nombre/url>"];

export default handler;