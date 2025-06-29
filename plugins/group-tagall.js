const wm = '';

// Mapa de indicativos a banderas
const paises = {
  '1': '🇺🇸', // EE.UU. y Canadá
  '52': '🇲🇽',
  '54': '🇦🇷',
  '55': '🇧🇷',
  '57': '🇨🇴',
  '58': '🇻🇪',
  '51': '🇵🇪',
  '56': '🇨🇱',
  '591': '🇧🇴',
  '593': '🇪🇨',
  '502': '🇬🇹',
  '503': '🇸🇻',
  '504': '🇭🇳',
  '505': '🇳🇮',
  '506': '🇨🇷',
  '507': '🇵🇦',
  '53': '🇨🇺',
  '34': '🇪🇸',
  '91': '🇮🇳',
  '62': '🇮🇩',
  '92': '🇵🇰'
};

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
    const id = user.id.split('@')[0];
    const indicativo = Object.keys(paises).find(code => id.startsWith(code)) || '';
    const bandera = paises[indicativo] || '🌍'; // 🌍 para países no mapeados
    textoFinal += `${bandera} @${id}\n`;
  }

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;

export default handler;