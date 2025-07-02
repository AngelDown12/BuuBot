import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2
  let _return
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix.trim()

  // ⚠️ Ignorar si no parece código válido
  if (!_text || _text.length < 3 || !/[=+\-*/{}()$]|(let|await|return|console|function)/.test(_text)) return

  // ⚠️ Verificar si tiene errores de sintaxis
  let err = syntaxerror(_text, 'Evaluación del dueño', {
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    sourceType: 'module'
  })

  if (err) return // No respondemos si hay error de sintaxis

  try {
    let f = { exports: {} }
    let exec = new (async () => {}).constructor(
      'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'groupMetadata', 'module', 'exports', 'argument',
      _text
    )

    await exec.call(conn, (...args) => {
      return conn.reply(m.chat, format(...args), m)
    }, m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2])

  } catch (e) {
    // ⚠️ No respondemos errores tampoco
    return
  }
}

handler.help = ['>', '=>']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i
handler.owner = true

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] === 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}