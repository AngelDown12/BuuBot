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
        text: '❌ 𝐀𝐬𝐞𝐠𝐮𝐫𝐚𝐭𝐞 𝐃𝐞 𝐪𝐮𝐞 𝐞𝐥 𝐁𝐨𝐭 𝐬𝐞𝐚 𝐀𝐝𝐦𝐢𝐧.',
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
<<<<<<< HEAD
export default handler
=======
module.exports = handler;
>>>>>>> e9655f3 (Reemplazo de carpeta plugins por versión corregida)
