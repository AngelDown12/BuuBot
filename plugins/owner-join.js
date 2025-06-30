let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  const [_, code] = text.match(linkRegex) || []
  const owbot = global.owner[1]

  if (!args[0]) return replyWithIcon(m, conn, `✳️ Envíe el link del grupo.\n\n📌 Ejemplo:\n*${usedPrefix + command}* <linkwa>`)
  if (!code) return replyWithIcon(m, conn, `✳️ Link inválido`)

  try {
    const groupId = await conn.groupAcceptInvite(code)
    const metadata = await conn.groupMetadata(groupId)
    const groupName = metadata.subject

    // 🛡️ Sin límite de tiempo
    global.db.data.chats[groupId] ??= {}
    delete global.db.data.chats[groupId].expired

    await conn.sendMessage(m.chat, {
      text: `✅ Me uní correctamente al grupo *${groupName}*\n\n📌 El bot permanecerá en el grupo sin límite de tiempo.`,
      contextInfo: iconReply()
    }, { quoted: m })

    await conn.sendMessage(owbot + '@s.whatsapp.net', {
      text: `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado al bot al grupo:\n*${groupName}*\n\n🆔 ID: ${groupId}\n📌 Enlace: ${args[0]}\n🕒 Sin límite de tiempo.`,
      contextInfo: iconReply()
    }, { mentions: [m.sender] })

  } catch (e) {
    await conn.sendMessage(owbot + '@s.whatsapp.net', {
      text: String(e),
      contextInfo: iconReply()
    })

    return replyWithIcon(m, conn, `✳️ No se pudo unir al grupo. Asegúrese que el enlace sea válido o que el grupo no esté lleno.`)
  }
}

handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['owner']
handler.command = ['join']
handler.owner = true

export default handler

function replyWithIcon(m, conn, text) {
  return conn.sendMessage(m.chat, {
    text,
    contextInfo: iconReply()
  }, { quoted: m })
}

function iconReply() {
  return {
    externalAdReply: {
      title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
      body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
      thumbnailUrl: "https://files.catbox.moe/ntyp5r.jpg",
      renderLargerThumbnail: false,
      sourceUrl: ""
    }
  }
}