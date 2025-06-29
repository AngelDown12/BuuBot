const handler = async (m, { conn, participants }) => {
  const body = (m.text || '').trim().toLowerCase()
  if (!m.isGroup || body !== 'kick') return

  const group = await conn.groupMetadata(m.chat)
  const admins = group.participants.filter(p => p.admin).map(p => p.id)
  const isAdmin = admins.includes(m.sender)
  const isBotAdmin = admins.includes(conn.user.jid)

  if (!isAdmin || !isBotAdmin) {
    return conn.sendMessage(m.chat, {
      text: '❌ No tengo permisos para expulsar o tú no eres admin.',
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

  let target
  if (m.quoted) {
    target = m.quoted.sender
  } else if (m.mentionedJid?.length) {
    target = m.mentionedJid[0]
  } else {
    return conn.reply(m.chat, '⚠️ Responde a un mensaje o menciona a alguien para expulsar.', m)
  }

  if (admins.includes(target)) return conn.reply(m.chat, '❌ No puedo expulsar a un admin.', m)

  try {
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
      text: '❌ Ocurrió un error al expulsar.',
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
    console.error('❌ Error al expulsar:', e)
  }
}

// activador sin prefijo
handler.customPrefix = /^kick$/i
handler.command = new RegExp
export default handler