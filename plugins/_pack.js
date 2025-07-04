let handler = async (m, { conn }) => {
  if (m.text?.toLowerCase().trim() !== 'pack') return;

  conn.sendMessage(m.chat, {
    image: { url: 'https://delirius-apiofc.vercel.app/nsfw/girls' }
  }, { quoted: m });
};

handler.customPrefix = /^pack$/i;
handler.command = new RegExp;

export default handler;