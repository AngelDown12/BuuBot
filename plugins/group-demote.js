let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    var number = text.split`@`[1]
  } else if (!isNaN(text)) {
    var number = text
  }

  if (!text && !m.quoted) {
    return conn.sendMessage(m.chat, {
      text: `🚩 𝐌𝐞𝐧𝐜𝐢𝐨𝐧𝐚 𝐚 𝐮𝐧𝐚 𝐏𝐞𝐫𝐬𝐨𝐧𝐚
𝐎 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐬𝐮 𝐦𝐞𝐧𝐬𝐚𝐣𝐞.`,
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

  if (number.length > 13 || (number.length < 11 && number.length > 0)) {
    return conn.sendMessage(m.chat, {
      text: `🚩 𝐌𝐞𝐧𝐜𝐢𝐨𝐧𝐚 𝐚 𝐮𝐧𝐚 𝐏𝐞𝐫𝐬𝐨𝐧𝐚
𝐎 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐬𝐮 𝐦𝐞𝐧𝐬𝐚𝐣𝐞.`,`,
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

  try {
    let user
    if (text) {
      user = number + '@s.whatsapp.net'
    } else if (m.quoted.sender) {
      user = m.quoted.sender
    } else if (m.mentionedJid) {
      user = number + '@s.whatsapp.net'
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'demote')

    await conn.sendMessage(m.chat, {
      text: `🚩 𝐔𝐬𝐮𝐚𝐫𝐢𝐨 𝐃𝐞𝐠𝐫.`,
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

    await m.react('✅')

  } catch (e) {
    console.error(e)
  }
}

handler.help = ['demote *@tag*']
handler.tags = ['group']
handler.command = ['demote', 'degradar']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler