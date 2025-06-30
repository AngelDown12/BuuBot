let handler = async (m, { conn, usedPrefix, text }) => {
  let number

  if (!text && !m.quoted) {
    return conn.sendMessage(m.chat, {
      text: '🚩 𝐔𝐬𝐞 𝐄𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐂𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞.',
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
      text: '🚩 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐢𝐝𝐞𝐧𝐭𝐢𝐟𝐢𝐜𝐚𝐫 𝐞𝐥 𝐍𝐮𝐦𝐞𝐫𝐨.',
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
      text: '🚩 𝐄𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐈𝐧𝐠𝐫𝐞𝐬𝐚𝐝𝐨 𝐞𝐬 𝐢𝐧𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨.',
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
      text: '✅ 𝐔𝐬𝐮𝐚𝐫𝐢𝐨 𝐏𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐚 𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫.',
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
      text: '❌ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫 𝐀𝐥 𝐔𝐬𝐮𝐚𝐫𝐢𝐨.',
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