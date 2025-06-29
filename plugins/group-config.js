var handler = async (m, { conn, args, usedPrefix, command }) => {
  const isClose = {
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
    'desbloquear': 'unlocked',
    'bloquear': 'locked'
  }[args[0] || ''];

  if (!isClose) {
    return conn.sendMessage(m.chat, {
      text: `*Elija una opción para configurar el grupo*\n\nEjemplo:\n*○ !${command} abrir*\n*○ !${command} cerrar*\n*○ !${command} bloquear*\n*○ !${command} desbloquear*`,
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
    await conn.groupSettingUpdate(m.chat, isClose)
    await conn.sendMessage(m.chat, {
      text: '✅ 𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐝𝐨 𝐂𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞.',
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
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await conn.sendMessage(m.chat, {
      text: '⚠️ 𝐄𝐥 𝐁𝐨𝐭 𝐧𝐨 𝐞𝐬 𝐀𝐝𝐦𝐢𝐧 𝐨 𝐎𝐜𝐮𝐫𝐫𝐢𝐨 𝐮𝐧 𝐄𝐫𝐫𝐨𝐫.',
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

handler.help = ['group abrir / cerrar']
handler.tags = ['grupo']
handler.command = /^(group|grupo)$/i
handler.admin = true
handler.botAdmin = true

export default handler