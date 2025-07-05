const handler = async (m, { conn, isAdmin, isBotAdmin, isOwner }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn);
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn);

  await conn.groupSettingUpdate(m.chat, 'announcement');
  return conn.reply(m.chat, '*🔒 Grupo cerrado. Solo los administradores pueden escribir.*', m);
};

handler.customPrefix = /^(\.?cerrar)$/i; // Solo acepta ".cerrar" o "cerrar" exacto
handler.command = new RegExp(); // sin prefijo real
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;