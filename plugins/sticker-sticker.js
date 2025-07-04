import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

const handler = async (m, { conn, args }) => {
  let stiker = false
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || q.mediaType || ''

  try {
    if (/webp|image|video/g.test(mime)) {
      if (/video/.test(mime) && (q.msg || q).seconds > 15) {
        return m.reply('📽️ *Demasiado largo...*\nTu video excede los 15 segundos. Usa uno más corto.')
      }

      const img = await q.download?.()
      if (!img) {
        return conn.reply(m.chat, helpText(), m)
      }

      const { text1, text2 } = global.db.data.users[m.sender] || {}
      const pack1 = text1 || global.packsticker
      const pack2 = text2 || global.packsticker2

      try {
        stiker = await sticker(img, false, pack1, pack2)
      } catch {
        let out
        if (/webp/.test(mime)) out = await webp2png(img)
        else if (/image/.test(mime)) out = await uploadImage(img)
        else if (/video/.test(mime)) out = await uploadFile(img)
        else out = await uploadImage(img)

        stiker = await sticker(false, out, pack1, pack2)
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.packsticker2)
      } else {
        return m.reply('⚠️ *URL no válida.* Verifica el enlace.')
      }
    } else {
      return conn.reply(m.chat, helpText(), m)
    }

    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      return conn.reply(m.chat, errorText(), m)
    }
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚠️ Error inesperado al generar el sticker.', m)
  }
}

handler.customPrefix = /^(s|sticker|stiker)$/i
handler.command = new RegExp()
handler.register = false

export default handler

// Función para mensaje de ayuda
function helpText() {
  return ` 🖼️ *Envía una imagen o video corto*
     *para generar tu sticker personalizado*.

               `No seas pendejo amigo``
}

// Función para mensaje de error
function errorText() {
  return `╭─〔 🤖 *STICKER BOT* 🤖 〕─╮
│
│ ❌ No se pudo crear el sticker.
│
│ 📥 Asegúrate de enviar una imagen o video
│     válido, o prueba con un enlace directo.
│
│ 📌 Si necesitas ayuda, escribe: menu
╰────────────────────────────╯`
}

const isUrl = (text) => {
  return /^https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif)$/i.test(text)
}