let handler = async (m, { conn }) => {
  console.log('[MENU TEST] Handler activado ✅');

  const texto = `✨ *MENÚ PRINCIPAL* ✨\n\nHola 👋 ${m.sender}\n\nElige una opción 👇`;

  const buttons = [
    { buttonId: '.info', buttonText: { displayText: 'ℹ️ Info' }, type: 1 },
    { buttonId: '.donar', buttonText: { displayText: '💸 Donar' }, type: 1 },
    { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
  ];

  const buttonMessage = {
    text: texto,
    footer: 'AngelBot 👑',
    buttons: buttons,
    headerType: 1
  };

  console.log('[MENU TEST] Enviando mensaje...');

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  console.log('[MENU TEST] Mensaje enviado ✅');
};

handler.command = /^menu$/i;

export default handler;