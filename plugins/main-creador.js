// Código creado por Deylin
// https://github.com/Deylin-eliac 
// código creado para https://github.com/Deylin-eliac/Pikachu-bot 
// No quites créditos

import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  m.react('🎭')

  const imageUrl = 'https://qu.ax/GbxoW.jpg'
  const numCreador = '5217774385829'
  const ownerJid = numCreador + '@s.whatsapp.net'
  const name = await conn.getName(ownerJid) || 'Alee'
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `𝐒𝐨𝐲 𝐌𝐚𝐮, 𝐃𝐮𝐞𝐧̃𝐨 𝐝𝐞𝐥 𝐁𝐨𝐭 𝐌𝐚𝐮 🎭.`
  const empresa = '𝐌𝐚𝐮 - 𝐒𝐞𝐫𝐯𝐢𝐜𝐢𝐨𝐬 𝐭𝐞𝐜𝐧𝐨𝐥𝐨𝐠𝐢𝐜𝐨𝐬'

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim()

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      },
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐌𝐚𝐮 𝐁𝐨𝐭 𝐎𝐟𝐢𝐜𝐢𝐚𝐥',
          body: '𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐚𝐝𝐨 𝐩𝐨𝐫 𝐌𝐚𝐮 🎭',
          thumbnailUrl: imageUrl,
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        }
      }
    },
    { quoted: m }
  )
}

// 💬 ACTIVACIÓN SIN PREFIJO
handler.customPrefix = /^(owner|creator|creador|dueño)$/i
handler.command = new RegExp()
handler.tags = ['main']
handler.help = ['owner']
handler.register = false

export default handler