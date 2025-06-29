
import fetch from 'node-fetch';

const handler = async (m, { conn, participants, args }) => {
  const mensaje = args.join(' ') || 'Sin mensaje.';
  const textoPrincipal = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* 🗣️\n\n*» INFO :* ${mensaje}\n\n╭  ┄ 𝅄  ۪꒰ \`⡞᪲=͟͟͞🄲ꭈׁׅo͓̽ᨰׁׅʙo͓̽tׁׅ ≼᳞ׄ\` ꒱  ۟  𝅄 ┄\n`;

  const menciones = await Promise.all(participants.map(async user => {
    const numero = user.id.split('@')[0];
    let emoji = '🍫';

    try {
      const res = await fetch(`https://delirius-apiofc.vercel.app/tools/country?text=%2B${numero}`);
      const data = await res.json();
      if (data?.result?.emoji) emoji = data.result.emoji;
    } catch (e) {
      // Error silencioso, mantiene el emoji por defecto
    }

    return `${emoji} @${numero}`;
  }));

  const footer = `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *𝐁𝐨𝐭 𝐀𝐧𝐠𝐞𝐥* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  conn.sendMessage(m.chat, {
    text: textoPrincipal + menciones.join('\n') + `\n\n${footer}`,
    mentions: participants.map(p => p.id)
  });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;