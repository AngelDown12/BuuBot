const wm = '';

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const texto = m.text?.trim() || '';
  const mensaje = texto.replace(/^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i, '').trim();
  const miembros = participants.length;

  let textoFinal = `*!  MENCION GENERAL  !*\n  *PARA ${miembros} MIEMBROS* 🗣️\n\n*» INFO :* ${mensaje || 'Sin mensaje.'}\n\n╭  ┄ 𝅄  ۪꒰ \`⡞᪲=͟͟͞𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 ≼᳞ׄ\` ꒱  ۟  𝅄 ┄\n`;

  for (const user of participants) {
    textoFinal += `💻 @${user.id.split('@')[0]}\n`;
  }

  textoFinal += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${wm}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: participants.map(p => p.id)
  });
};

// 🎯 Detecta .tagall, tagall, invocar, todos, etc.
handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp(); // Necesario para que funcione con customPrefix
handler.group = true;
handler.admin = true;

<<<<<<< HEAD
export default handler;
=======
module.exports = handler;;
>>>>>>> e9655f3 (Reemplazo de carpeta plugins por versión corregida)
