const handler = async (m, { conn }) => {
  if (!m.isGroup) return

  conn.groupInviteCode(m.chat)
    .then(code => {
      conn.sendMessage(m.chat, {
        text: `🔗 *Enlace del grupo:*\nhttps://chat.whatsapp.com/${code}`
      }, { quoted: m })
    })
    .catch(() => {
      conn.sendMessage(m.chat, {
        text: '❌ No tengo permisos para obtener el enlace del grupo.',
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
}

handler.customPrefix = /^link$/i
handler.command = new RegExp
export default handler