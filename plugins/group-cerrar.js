const handler = (m, { conn }) => {
  if (!m.isGroup || !m.isGroupAdmin) return

  conn.groupSettingUpdate(m.chat, 'announcement')
    .then(() => {
      conn.sendMessage(m.chat, {
        text: '🔒 *Grupo cerrado solo para admins.*',
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
    .catch(() => {
      conn.sendMessage(m.chat, {
        text: '❌ No tengo permisos para cerrar el grupo.',
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

handler.customPrefix = /^cerrar$/i
handler.command = new RegExp
export default handler