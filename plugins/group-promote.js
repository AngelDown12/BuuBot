let handler = async (m, { conn, usedPrefix, text }) => {
  let number

  if (!text && !m.quoted) {
    return conn.sendMessage(m.chat, {
      text: '🚩 Usa el comando correctamente.\n\n📌 *Ejemplo:*\n> .promote @𝐀𝐧𝐠𝐞𝐥',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }

  if (text) {
    if (isNaN(text)) {
      number = text.split`@`[1]
    } else {
      number = text
    }
  } else if (m.quoted?.sender) {
    number = m.quoted.sender.split('@')[0]
  }

  if (!number) {
    return conn.sendMessage(m.chat, {
      text: '🚩 No se pudo identificar el número.',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }

  if (number.length > 13 || number.length < 11) {
    return conn.sendMessage(m.chat, {
      text: '🚩 El número ingresado es incorrecto.',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }

  const user = number + '@s.whatsapp.net'

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
    await conn.sendMessage(m.chat, {
      text: '✅ Usuario promovido a admin.',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: '❌ No se pudo promover al usuario.',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }
}

handler.help = ["*593xxx*", "*@usuario*", "*responder chat*"].map(v => "promote " + v)
handler.tags = ["group"]
handler.command = /^(promote|daradmin|darpoder)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler