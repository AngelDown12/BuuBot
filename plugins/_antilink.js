const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    if (!m.isGroup) return false

    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}

    const isGroupLink = linkRegex.exec(m.text)
    const isChannelLink = channelLinkRegex.exec(m.text)

    if (chat.antiLink && (isGroupLink || isChannelLink) && !isAdmin) {
        const mainMsg = `𝙀𝙣𝙡𝙖𝙘𝙚 𝙙𝙚𝙩𝙚𝙘𝙩𝙖𝙙𝙤 ⚠️\n\n𝘼𝙣𝙙𝙖 𝙖 𝙝𝙖𝙘𝙚𝙧 𝙩𝙪 𝙋𝙪𝙗𝙡𝙞𝙘𝙞𝙙𝙖𝙙 𝙖 𝙤𝙩𝙧𝙤 𝙡𝙖𝙙𝙤 *@${m.sender.split('@')[0]}*\n\n𝙀𝙡𝙞𝙢𝙞𝙣𝙤 𝙩𝙪 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙮 𝙖 𝙩𝙞 𝙥𝙤𝙧 𝙚𝙨𝙘𝙤𝙧𝙞𝙖`;

        const noAdminMsg = `⚠️ *No puedo eliminarlo porque no soy admin.*`;

        // Enviar el mensaje principal
        await conn.sendMessage(m.chat, {
            text: mainMsg,
            mentions: [m.sender],
            contextInfo: {
                externalAdReply: {
                    title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                    body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                    thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        })

        // Si no es admin, manda el mensaje de advertencia por separado
        if (!isBotAdmin) {
            await conn.sendMessage(m.chat, {
                text: noAdminMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                        body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
                        thumbnailUrl: "https://qu.ax/JRCMQ.jpg",
                        sourceUrl: '',
                        mediaType: 1,
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
            })
        }

        // Si es admin, elimina el mensaje y expulsa
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }

        return false
    }

    return true
}