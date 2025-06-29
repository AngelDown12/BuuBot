const handler = async (m, { conn }) => {
  if (!m.isGroup) return

  try {
    const code = await conn.groupInviteCode(m.chat)
    const link = `https://chat.whatsapp.com/${code}`
    await conn.reply(m.chat, `🔗 *Enlace del grupo:*\n${link}`, m)
  } catch (e) {
    await conn.sendMessage(m.chat, {
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
    console.error('Error al obtener link del grupo:', e)
  }
}

handler.customPrefix = /^link$/i
handler.command = new RegExp
export default handler