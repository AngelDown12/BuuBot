import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  if (!chatUpdate) return
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) return

  // ✅ FIX PARA BOTONES
  if (m.message?.buttonsResponseMessage) {
    m.text = m.message.buttonsResponseMessage.selectedButtonId || ''
  }
  if (m.message?.templateButtonReplyMessage) {
    m.text = m.message.templateButtonReplyMessage.selectedId || ''
  }

  if (global.db.data == null) await global.loadDatabase()

  try {
    m = smsg(this, m) || m
    if (!m) return
    m.exp = 0
    m.limit = false

    // --------------------
    // Tu resto del handler
    // --------------------

    // Aquí va TODO el resto tal cual lo tienes: 
    // lo de usuarios, chats, settings, plugins, permisos, etc.
    // Solo mantén este bloque de FIX arriba.
    // --------------------

  } catch (e) {
    console.error(e)
  } finally {
    if (opts['queque'] && m.text) {
      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
      if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
    }
    try {
      if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
    const settingsREAD = global.db.data.settings[this.user.jid] || {}
    if (opts['autoread']) await this.readMessages([m.key])
    if (settingsREAD.autoread) await this.readMessages([m.key])
  }
}

global.dfail = (type, m, conn, usedPrefix) => {
  let msg = {
    rowner: "🚫 Este comando es solo para el Creador.",
    owner: "🚫 Este comando es solo para el Creador.",
    mods: "🚫 Este comando es solo para Mods.",
    premium: "🔑 Necesitas ser usuario Premium.",
    group: "👥 Solo se puede usar en grupos.",
    private: "📬 Solo se puede usar en privado.",
    admin: "👮 Necesitas ser admin.",
    botAdmin: "🤖 Necesito ser admin para eso.",
    unreg: "📝 No estás registrado.\nRegístrate usando: *.reg nombre.edad*",
    restrict: "🚫 Comando restringido."
  }[type]

  if (msg) return conn.sendMessage(m.chat, {
    text: msg,
    contextInfo: {
      externalAdReply: {
        title: 'Bot',
        body: 'Bot',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
        renderLargerThumbnail: false,
        sourceUrl: ''
      }
    }
  }, { quoted: m }).then(_ => m.react('✖️'))
}