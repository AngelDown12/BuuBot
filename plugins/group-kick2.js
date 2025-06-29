const handler = (m, { conn }) => {
  const body = (m.text || '').trim().toLowerCase()
  if (!m.isGroup || body !== 'kick') return

  conn.groupMetadata(m.chat).then(group => {
    const admins = group.participants.filter(p => p.admin).map(p => p.id)
    const isAdmin = admins.includes(m.sender)
    const isBotAdmin = admins.includes(conn.user.jid)

    if (!isAdmin || !isBotAdmin) {
      return conn.sendMessage(m.chat, {
        text: '❌ No tengo permisos o tú no eres admin.',
        contextInfo: {
          externalAdReply: {
            title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
            body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
            thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
            renderLargerThumbnail: false,
            sourceUrl: ''
          }
        }
      }, { quoted: m })
    }

    const target = m.quoted?.sender || m.mentionedJid?.[0]
    if (!target) return conn.reply(m.chat, '⚠️ Menciona o responde a alguien.', m)

    conn.groupParticipantsUpdate(m.chat, [target], 'remove')
      .then(() => {
        conn.sendMessage(m.chat, {
          text: `👢 @${target.split('@')[0]} fue eliminado del grupo.`,
          mentions: [target],
          contextInfo: {
            externalAdReply: {
              title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
              renderLargerThumbnail: false,
              sourceUrl: ''
            }
          }
        }, { quoted: m })
      })
      .catch(() => {
        conn.sendMessage(m.chat, {
          text: '❌ No pude expulsar al usuario.',
          contextInfo: {
            externalAdReply: {
              title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
              renderLargerThumbnail: false,
              sourceUrl: ''
            }
          }
        }, { quoted: m })
      })
  })
}

handler.customPrefix = /^kick$/i
handler.command = new RegExp
export default handler