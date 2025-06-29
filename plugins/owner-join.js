let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  const [_, code] = text.match(linkRegex) || []
  const days = parseInt(args[1])
  const owbot = global.owner[1]
  const now = Date.now()

  if (!args[0]) return errorMsg(m, conn, usedPrefix, command, '✳️ Envíe el link del grupo.\n\n📌 Ejemplo:\n*' + usedPrefix + command + '* <linkwa> <días>')
  if (!code) return errorMsg(m, conn, usedPrefix, command, '✳️ Link inválido')
  if (!args[1]) return errorMsg(m, conn, usedPrefix, command, '📌 Falta el número de días.\n\nEjemplo:\n*' + usedPrefix + command + '* <linkwa> 2')
  if (isNaN(days)) return errorMsg(m, conn, usedPrefix, command, '✳️ Solo números válidos para los días.')

  try {
    const groupId = await conn.groupAcceptInvite(code)
    const metadata = await conn.groupMetadata(groupId)
    const expireInMs = 86400000 * days

    global.db.data.chats[groupId] ??= {}
    global.db.data.chats[groupId].expired = Math.max(global.db.data.chats[groupId].expired || 0, now) + expireInMs

    const remaining = msToDate(global.db.data.chats[groupId].expired - now)
    const groupName = metadata.subject

    await conn.sendMessage(m.chat, {
      text: `✅ Me uní correctamente al grupo *${groupName}*\n\n📌 El bot saldrá automáticamente después de:\n${remaining}`,
      contextInfo: adReplyObj()
    }, { quoted: m })

    await conn.reply(owbot + '@s.whatsapp.net',
      `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado al bot al grupo:\n*${groupName}*\n\n🆔 ID: ${groupId}\n📌 Enlace: ${args[0]}\n⏰ Salida automática en: ${remaining}`,
      null,
      { mentions: [m.sender] })

  } catch (e) {
    await conn.reply(owbot + '@s.whatsapp.net', String(e))
    return errorMsg(m, conn, usedPrefix, command, '✳️ No se pudo unir al grupo. Asegúrese que el enlace es válido o que el grupo no esté lleno.')
  }
}

handler.help = ['join <chat.whatsapp.com> <días>']
handler.tags = ['owner']
handler.command = ['join', 'invite']
handler.owner = true

export default handler

function msToDate(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${d}d ${h}h ${m}m ${s}s`.replace(/\b(\d)\b/g, '0$1')
}

function errorMsg(m, conn, prefix, command, text) {
  return conn.sendMessage(m.chat, {
    text,
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
}

function adReplyObj() {
  return {
    externalAdReply: {
      title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
      body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
      thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
      renderLargerThumbnail: false,
      sourceUrl: ''
    }
  }
}