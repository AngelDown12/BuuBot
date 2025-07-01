let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.sendMessage(m.chat, {
      text: `🚩 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐀𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐃𝐞𝐬𝐞𝐚 𝐄𝐥𝐢𝐦𝐢𝐧𝐚𝐫.`,
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }

  try {
    let delet = m.message.extendedTextMessage.contextInfo.participant
    let bang = m.message.extendedTextMessage.contextInfo.stanzaId
    return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: bang,
        participant: delet
      }
    })
  } catch {
    return conn.sendMessage(m.chat, {
      delete: m.quoted.vM.key
    })
  }
}

handler.help = ['delete']
handler.tags = ['group']
handler.command = /^del(ete)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler