const cp, { exec as _exec } = require('child_process');
const { promisify } = require('util');
let exec = promisify(_exec).bind(cp)
let handler = async (m, { conn, isOwner, command, text }) => {
  if (conn.user.jid != conn.user.jid) return
  m.reply('✅ Ejecutando...')
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) m.reply(stdout)
    if (stderr.trim()) m.reply(stderr)
  }
}
handler.help = ['$']
handler.tags = ['advanced']
handler.customPrefix = /^[$] /
handler.command = new RegExp
handler.rowner = true

module.exports = handler;