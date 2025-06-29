const handler = async (m, { conn }) => {
  if (!m.isGroup || !m.quoted) return

  try {
    const group = await conn.groupMetadata(m.chat)
    const admins = group.participants.filter(p => p.admin).map(p => p.id)
    const isAdmin = admins.includes(m.sender)
    const isBotAdmin = admins.includes(conn.user.jid)

    if (!isAdmin) return
    if (!isBotAdmin) {
      return conn.sendMessage(m.chat, {
        text: '❌ No soy admin, no puedo expulsar.',
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

    const target = m.quoted.sender
    if (admins.includes(target)) return // No patear admins

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    await conn.sendMessage(m.chat, {
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

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: '❌ No se pudo expulsar al usuario.',
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
    console.error('Error al expulsar:', e)
  }
}

handler.customPrefix = /^kick$/i
handler.command = new RegExp
export default handler