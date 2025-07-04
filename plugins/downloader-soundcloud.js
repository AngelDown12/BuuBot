import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, { conn, text, command }) => {
  if (!text) return;

  await m.react('🎧');

  try {
    const search = await yts(text);
    const video = search.videos[0];
    if (!video) return m.reply('❌ No encontré resultados.');

    const yturl = video.url;

    // Usamos una API de conversión directa sin pasos extra
    const api = `https://youtube-mp3.turkced.org/api/widgetv2?url=${encodeURIComponent(yturl)}`;
    const { data } = await axios.get(api);
    const audioUrl = data?.mp3Converter?.link;

    if (!audioUrl) return m.reply('❌ No se pudo generar el audio.');

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al procesar la canción.');
  }
};

handler.command = ["play"];
handler.help = ["play <nombre o link>"];
handler.tags = ["downloader"];

export default handler;