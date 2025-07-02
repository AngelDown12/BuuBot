let handler = async (m, { conn }) => {
  const video = 'https://files.catbox.moe/yrbsms.mp4'; // video del menú
  const text = `🪙 𝐌 𝐔 𝐋 𝐓 𝐈 - 𝐌 𝐄 𝐍 𝐔́ 

  (aquí iría tu texto del menú, lo omití por espacio pero tú lo dejas igual)
  `;

  await conn.sendMessage(m.chat, {
    video: { url: video },
    caption: text,
    gifPlayback: true, // para que se reproduzca automáticamente como animación
    contextInfo: {
      externalAdReply: {
        title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        thumbnailUrl: "https://files.catbox.moe/ntyp5r.jpg",
        sourceUrl: '',
        mediaType: 2,
        renderLargerThumbnail: false,
        showAdAttribution: false
      }
    }
  }, { quoted: m });
};

handler.customPrefix = /^(menu|menú|ayuda|help)$/i;
handler.command = new RegExp;
handler.register = true;

export default handler;