const handler = async (m, { conn, args }) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`)

  await conn.sendMessage(m.chat, {
    text: '👑 𝐋𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧 𝐀𝐡 𝐬𝐢𝐝𝐨 𝐌𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐝𝐚 𝐂𝐨𝐧 𝐞𝐱𝐢𝐭𝐨.',
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

module.exports = handler;