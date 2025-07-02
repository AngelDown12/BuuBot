let handler = async (m, { conn }) => {
  const text = `✨ *MENU PRINCIPAL* ✨

Hola 👋 ${m.pushName || 'usuario'}!

Elige una opción 👇`;

  const buttons = [
    { buttonId: '.infomenu', buttonText: { displayText: '📚 Info' }, type: 1 },
    { buttonId: '.descargasmenu', buttonText: { displayText: '📥 Descargas' }, type: 1 },
    { buttonId: '.logomenu', buttonText: { displayText: '🎨 Logos' }, type: 1 }
  ];

  const buttonMessage = {
    text: text,
    footer: 'AngelBot Delay ⚡',
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = /^menu$/i;

export default handler;