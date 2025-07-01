let handler = async (m, { conn }) => {
  try {
    const revoke = await conn.groupRevokeInvite(m.chat)
    const nuevoLink = 'https://chat.whatsapp.com/' + revoke

    await conn.sendMessage(m.chat, {
      text: `🚩 𝐒𝐞 𝐫𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢𝐨 𝐂𝐨𝐧 𝐞𝐱𝐢𝐭𝐨 𝐞𝐥 𝐋𝐢𝐧𝐤 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.\n\n🔗 *Nuevo Link:* ${nuevoLink}`,
      contextInfo: {
        externalAdReply: {
          title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
          renderLargerThumbnail: false,
          sourceUrl: nuevoLink
        }
      }
    }, { quoted: m })
    
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: '❌ 𝐀𝐬𝐞𝐠𝐮𝐫𝐚𝐭𝐞 𝐝𝐞 𝐪𝐮𝐞 𝐞𝐥 𝐁𝐨𝐭 𝐒𝐞𝐚 𝐀𝐝𝐦𝐢𝐧.',
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
}

handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'anularlink']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler