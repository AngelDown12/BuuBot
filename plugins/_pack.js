let handler = async (m, { conn }) => {
  if (!m.text?.toLowerCase().includes('pack')) return;

  conn.sendMessage(m.chat, {
    image: { url: 'https://delirius-apiofc.vercel.app/nsfw/girls' },
    caption: '> Pon De Nuevo *pack* para mirar el siguiente ✨'
  }, { quoted: m });
};

handler.customPrefix = /pack/i;
handler.command = new RegExp;

export default handler;