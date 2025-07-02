let handler = async (m, { conn }) => {
  const texto = `✨ *MENÚ PRINCIPAL* ✨

Hola 👋 ${m.sender.split('@')[0]}

Elige una opción 👇`;

  const templateButtons = [
    { index: 1, quickReplyButton: { displayText: '📚 Info', id: '.info' } },
    { index: 2, quickReplyButton: { displayText: '💸 Donar', id: '.donar' } },
    { index: 3, quickReplyButton: { displayText: '👑 Owner', id: '.owner' } }
  ];

  await conn.sendMessage(m.chat, {
    text: texto,
    footer: 'Bot Angel 👑',
    templateButtons: templateButtons
  }, { quoted: m });
};

handler.command = /^menu$/i;

export default handler;