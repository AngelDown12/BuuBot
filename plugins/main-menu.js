const handler = async (m, { conn }) => {
  const texto = `
•          𝐌𝐚𝐮/ 𝟑𝟑𝟑 / 

      𝐏𝐮𝐫𝐨 𝐏𝐢𝐧𝐜𝐡𝐞 𝟑𝟑𝟑 𝐀𝐥𝐯
                  𝐁𝐲 𝟑𝟑𝟑
       𝐘 𝐮𝐬𝐭𝐞𝐝𝐞𝐬 𝐪𝐮𝐞 𝐬𝐚𝐛𝐞𝐧 𝐡𝐚𝐜𝐞𝐫 𝐢𝐧𝐮𝐭𝐢𝐥𝐞𝐬?

┣━━━━━━━━━━━━━━┫
┃⋗ 🗣️ *𝐀𝐛𝐫𝐢𝐫*
┃⋗ 🗣️ *𝐂𝐞𝐫𝐫𝐚𝐫* 
┃⋗ 🗣️ *𝐓𝐨𝐝𝐨𝐬 / 𝐭𝐨𝐝𝐨𝐬*
┃⋗ 🗣️ *𝐋𝐢𝐧𝐤 / 𝐥𝐢𝐧𝐤* 
┃⋗ 🗣️ *𝐏𝐫𝐨𝐦𝐨𝐭𝐞* 
┃⋗ 🗣️ *𝐊𝐢𝐜𝐤 / 𝐤𝐢𝐜𝐤* 
┃⋗ 🗣️ *𝐍 / 𝐧*
┃⋗ 🗣️ *𝐃𝐞𝐥 / 𝐝𝐞𝐥*
┃⋗ 🗣️ *𝐃𝐞𝐦𝐨𝐭𝐞*
┃⋗ 🗣️ *𝐌𝐞𝐧𝐮 / 𝐦𝐞𝐧𝐮*  
┃⋗ 🗣️ 
┗━━━━━━━━━━━━━━┛`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: 'https://qu.ax/SeOXm.jpg' },
    caption: texto
  }, { quoted: m })
}

// Activador sin prefijo: solo escribes "menu"
handler.customPrefix = /^menu$/i
handler.command = new RegExp()
handler.register = false

export default handler