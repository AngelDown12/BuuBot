let handler = async (m, { conn }) => {
  const img = 'https://delirius-apiofc.vercel.app/nsfw/girls';
  const txt = 'Pack🔥🔥🔥\n> Pon De Nuevo .pack para mirar el siguiente ✨';

  return conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: m });
};

handler.command = /^pack$/i;

export default handler;