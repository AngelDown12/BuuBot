const handler = (m, { conn }) => {
  if (!m.isGroup) return
  conn.groupMetadata(m.chat).then(meta => {
    const admins = meta.participants.filter(p => p.admin).map(p => p.id)
    const isAdmin = admins.includes(m.sender)
    const isBotAdmin = meta.participants.find(p => p.id === conn.user.jid)?.admin

    if (!isAdmin || !isBotAdmin || !m.quoted) return

    const target = m.quoted.sender
    if (admins.includes(target)) return // No expulsar admins

    conn.groupParticipantsUpdate(m.chat, [target], 'remove')
      .then(() => {
        conn.sendMessage(m.chat, {
          text: `👢 @${target.split('@')[0]} fue expulsado.`,
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