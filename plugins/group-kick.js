const handler = async (m, { conn, args, isAdmin, isOwner, isBotAdmin }) => {
  if (!m.isGroup) return global.dfail('group', m, conn)
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn)
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn)

  const botJid = conn.user.jid
  const targetJid =
    m.mentionedJid?.[0] ||
    (m.quoted?.sender) ||
    (args[0]?.includes('@') ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)

  if (!targetJid) return conn.reply(m.chat, '👤 Menciona o responde a alguien, o escribe su número.', m)

  if (targetJid === botJid) return conn.reply(m.chat, '❌ No puedo eliminarme a mí mismo.', m)
  if (global.owner?.some(([id]) => targetJid.includes(id))) return conn.reply(m.chat, '🚫 No puedes eliminar a un owner.', m)

  try {
    await conn.groupParticipantsUpdate(m.chat, [targetJid], 'remove')
    await m.react('✅')
  } catch (err) {
    console.error(err)
    conn.reply(m.chat, '❌ No se pudo expulsar al usuario. Verifica si tengo permisos.', m)
  }
}

handler.help = ['kick @usuario']
handler.tags = ['group']
handler.command = /^kick$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler