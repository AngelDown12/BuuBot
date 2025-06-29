const handler = async (m, { conn, args }) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`)

  await conn.sendMessage(m.chat, {
    text: '👑 ',
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

handler.help = ['groupdesc <text>']
handler.tags = ['grupo']
handler.command = ['gpdesc', 'groupdesc']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler