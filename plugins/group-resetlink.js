let handler = async (m, { conn }) => {
  try {
    const revoke = await conn.groupRevokeInvite(m.chat)
    const nuevoLink = 'https://chat.whatsapp.com/' + revoke

    await conn.sendMessage(m.chat, {
      text: `🚩 Se restableció con éxito el link del grupo.\n\n🔗 *Nuevo Link:* ${nuevoLink}`,
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
          renderLargerThumbnail: false,
          sourceUrl: nuevoLink
        }
      }
    }, { quoted: m })
    
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: '❌ Error al restablecer el enlace. Asegúrate de que soy admin del grupo.',
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

handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'anularlink']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler