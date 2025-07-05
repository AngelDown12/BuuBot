const handler = async (m, { conn, text, participants, isAdmin, isOwner, isBotAdmin }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn);
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn);

  let users = [];
  if (m.mentionedJid.length) {
    users = m.mentionedJid;
  } else if (m.quoted) {
    users = [m.quoted.sender];
  } else if (text) {
    const user = participants.find(p => p.id.includes(text));
    if (user) users = [user.id];
  }

  users = users.filter(id =>
    id !== conn.user.jid &&
    id !== m.sender &&
    !global.owner?.some(([o]) => o === id) &&
    !participants.find(p => p.id === id && p.admin)
  );

  if (!users.length) return m.reply('⚠️ No se encontró a quién expulsar.');

  try {
    await conn.groupParticipantsUpdate(m.chat, users, 'remove');
    return m.reply(`✅ Usuario${users.length > 1 ? 's' : ''} expulsado${users.length > 1 ? 's' : ''} correctamente.`);
  } catch (e) {
    console.error('❌ Error al expulsar:', e);
    return m.reply('⚠️ Error al expulsar. Puede que WhatsApp haya bloqueado la acción.');
  }
};

handler.customPrefix = /^(\.?kick|expulsar)$/i;
handler.command = new RegExp(); // para que funcione solo con el customPrefix
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;