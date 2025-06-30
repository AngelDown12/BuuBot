const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    if (!m.isGroup) return false

    let chat = global.db.data.chats[m.chat]
    if (!chat.antiLink) return true

    const isGroupLink = linkRegex.exec(m.text)
    const isChannelLink = channelLinkRegex.exec(m.text)

    if ((isGroupLink || isChannelLink) && !isAdmin) {
        let user = m.sender
        let mentionUser = `@${user.split('@')[0]}`

        // Mensaje principal
        await conn.sendMessage(m.chat, {
            text: `🚫 *Enlace detectado* ⚠️\n\nAnda a hacer tu Publicidad a otro lado ${mentionUser}\n\n*Elimino tu mensaje y a ti por escoria*`,
            mentions: [user],
            contextInfo: {
                externalAdReply: {
                    title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                    body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                    thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    sourceUrl: ''
                }
            }
        })

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        } else {
            // Mensaje separado si no tiene permisos
            await conn.sendMessage(m.chat, {
                text: `⚠️ *No puedo eliminar ni expulsar a ${mentionUser} porque no soy admin.*`,
                mentions: [user],
                contextInfo: {
                    externalAdReply: {
                        title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                        body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                        thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
                        mediaType: 1,
                        renderLargerThumbnail: false,
                        sourceUrl: ''
                    }
                }
            })
        }

        return false
    }

    return true
}