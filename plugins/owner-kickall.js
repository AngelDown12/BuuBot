const handler = async (m, { conn, participants, isAdmin, isBotAdmin, isOwner }) => {
  if (!m.isGroup) {
    global.dfail('group', m, conn)
    throw false
  }

  // Lista de números autorizados (solo los que pueden usar este comando)
  const autorizados = [
    '51912345678@s.whatsapp.net',
    '5219876543210@s.whatsapp.net',
    '5213334445566@s.whatsapp.net'
    // Agrega más si quieres
  ];

  // Si no está autorizado, denegar
  if (!autorizados.includes(m.sender)) {
    return m.reply('❌ No tienes permiso para usar este comando.')
  }

  if (!isAdmin && !isOwner) {
    global.dfail('admin', m, conn)
    throw false
  }

  if (!isBotAdmin) {
    global.dfail('botAdmin', m, conn)
    throw false
  }

  // Evitar que sub-bots lo usen
  if (m.sender.endsWith('g.us') || m.sender.startsWith('status@')) {
    return m.reply('🤖 Los bots no pueden usar este comando.')
  }

  const botJid = conn.user.jid
  const owners = global.owner?.map(([id]) => id) || []

  const expulsar = participants
    .filter(p =>
      !p.admin &&
      p.id !== botJid &&
      p.id !== m.sender &&
      !owners.includes(p.id)
    )
    .map(p => p.id)

  if (!expulsar.length) {
    return m.reply('✅ No hay miembros que se puedan expulsar.')
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, expulsar, 'remove')
    await m.reply(`✅ Se expulsaron a *${expulsar.length}* miembros del grupo.`)
  } catch (e) {
    console.error('❌ Error al expulsar masivamente:', e)
    await m.reply('⚠️ WhatsApp bloqueó la acción masiva o ocurrió un error.')
  }
}

handler.customPrefix = /^(kickall|banall|kikoall)$/i
handler.command = new RegExp() // sin prefijo
handler.group = true
handler.botAdmin = true

export default handler