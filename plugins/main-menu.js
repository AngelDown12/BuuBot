let handler = async (m, { conn }) => {
  const menu = {
    text: `✨ 𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ✨\n\nHola 👋 ${m.sender.split('@')[0]}\n\nElige una opción 👇`,
    footer: 'By Angel Bot ✨',
    buttons: [
      { buttonId: '.info', buttonText: { displayText: '📚 Info' }, type: 1 },
      { buttonId: '.descargas', buttonText: { displayText: '📥 Descargas' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 },
    ],
    headerType: 1
  };

  await conn.sendMessage(m.chat, menu, { quoted: m });
};

handler.command = /^menu$/i;

export default handler;