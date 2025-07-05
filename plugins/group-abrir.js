const handler = async (m, { conn, isAdmin, isBotAdmin, isOwner }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn);
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn);

  await conn.groupSettingUpdate(m.chat, 'not_announcement');
  return conn.reply(m.chat, '*🔓 Grupo abierto. Todos los miembros pueden escribir.*', m);
};

handler.customPrefix = /^(\.?abrir)$/i; // Solo activa si escribes "abrir" o ".abrir"
handler.command = new RegExp(); // sin comando definido (usa solo el customPrefix)
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;