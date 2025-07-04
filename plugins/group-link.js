let handler = async (m, { conn }) => {
  try {
    const code = await conn.groupInviteCode(m.chat)
    m.reply(`🔗 https://chat.whatsapp.com/${code}`)
  } catch {
    m.reply('❌ No tengo permisos para obtener el link.')
  }
}

handler.customPrefix = /^(link|\.link)$/i
handler.command = new RegExp()
handler.group = true
handler.botAdmin = true

export default handler