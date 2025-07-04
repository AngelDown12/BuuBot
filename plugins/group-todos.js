const wm = 'Mau 𝟑𝟑𝟑'

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup) {
    global.dfail('group', m, conn)
    throw false
  }

  if (!isAdmin && !isOwner) {
    global.dfail('admin', m, conn)
    throw false
  }

  const emojis = ['🤴🏽', '👸🏼']
  const lista = participants.map((u, i) => `${emojis[i % emojis.length]} @${u.id.split('@')[0]}`).join('\n')

  const textoFinal = [
    '𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐏𝐄𝐑𝐑𝐈𝐓𝐀𝐒 🕷️',
    '',
    lista,
    '',
    wm
  ].join('\n')

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: participants.map(u => u.id)
  })
}

handler.customPrefix = /^(\.|)?(tagall|invocar|invocacion|invocación|todos|talibanes)/i
handler.command = new RegExp()
handler.group = true
handler.admin = true

export default handler