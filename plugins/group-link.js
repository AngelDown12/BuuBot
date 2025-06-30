var handler = async (m, { conn }) => {
  if (!conn.groupInviteCode) {
    return conn.sendMessage(m.chat, {
      text: '⚠️ 𝐄𝐬𝐭𝐞 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐅𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.',
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
    let code = await conn.groupInviteCode(m.chat)
    let link = `https://chat.whatsapp.com/${code}`

    await conn.sendMessage(m.chat, {
      text: `🔗 Enlace del grupo:\n${link}`
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: '⚠️ 𝐀𝐬𝐞𝐠𝐮𝐫𝐚𝐭𝐞 𝐃𝐞 𝐪𝐮𝐞 𝐄𝐥 𝐁𝐨𝐭 𝐬𝐞𝐚 𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫.',
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: 'Verifica mis permisos en el grupo',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })
  }
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'linkgroup']
handler.group = true
handler.botAdmin = true

export default handler