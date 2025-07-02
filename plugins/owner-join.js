<<<<<<< HEAD
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, {conn, text, isMods, isOwner, isPrems}) => {
 if (enviando) return;
     enviando = true 
  try {
    const link = text //(m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
    if (!link || !link.match(linkRegex)) throw '*[❗] Link erroneo o faltante, ingrese el enlace de un grupo de WhatsApp.*\n\n*—◉ Ejemplo:*\n*◉ #join https://chat.whatsapp.com/FwEUGxkvZD85fIIp0gKyFC*';
    const [_, code] = link.match(linkRegex) || [];
    if ( isPrems || isMods || isOwner || m.fromMe) {
      const res = await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, {text: '*[ ✔️ ] El Bot ha ingresado con éxito al grupo.*'}, {quoted: m})
      enviando = false 
    } else {
      conn.sendMessage(m.chat, {text: '*[❗] El link de su grupo fue enviado a mi propietario/a.*\n\n*—◉ Su grupo estará en evaluación y el propietario/a del Bot decidirá si agrega o no al Bot.*\n\n*—◉ Algunas de las razones por la cual su solicitud puede ser rechazada son:*\n*1.- El Bot está saturado.*\n*2.- El Bot fue eliminado del grupo recientemente.*\n*3.- El link del grupo ha sido restablecido.*\n*4.-El Bot no se agrega a grupos por decisión del propietario/a.*\n\n*—◉ El proceso de evaluación puede tomar algo de tiempo, incluso dias, tenga paciencia.*'}, {quoted: m});
      const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      for (const entry of dataArray) await conn.sendMessage(entry + '@s.whatsapp.net', {text: '*[❗] NUEVA SOLICITUD DE UN BOT PARA UN GRUPO [❗]*\n\n*—◉ Solicitante:* ' + '@' + m.sender.split('@')[0] + '\n*—◉ Link del grupo:* ' + link, mentions: [m.sender], contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [m.sender], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen6, "mediaUrl": `${link}`, "sourceUrl": `${link}`}}}, {quoted: m});
      enviando = false 
    }
  } catch {
    enviando = false 
    throw '*[❗] Lo sentimos, algo salio mal por favor reportelo o vuelva a intentarlo.*';
  }
};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = /^join|nuevogrupo$/i;
handler.private = true;
export default handler;
=======

let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {

  let time = global.db.data.users[m.sender].lastjoin + 86400000
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  let delay = time => new Promise(res => setTimeout(res, time))

  let name = m.sender 
  let [_, code] = text.match(linkRegex) || []
  if (!args[0]) throw `✳️ Envie el link del Grupo\n\n 📌 Ejemplo:\n *${usedPrefix + command}* <linkwa> <dias>\n\n_el número son los días que el bot estará en el grupo_` 
  if (!code) throw `✳️ Link inválido`
  if (!args[1]) throw `📌 Falta el número de días\n\n Ejemplo:\n *${usedPrefix + command}* <linkwa> 2`
  if (isNaN(args[1])) throw `✳️ Solo número, que representa los días que el bot estará en el grupo!`
  let owbot = global.owner[1] 
  m.reply(`😎 Espere 3 segundos, me uniré al grupo`)
  await delay(3000)
  try {
  let res = await conn.groupAcceptInvite(code)
  let b = await conn.groupMetadata(res)
  let d = b.participants.map(v => v.id)
  let member = d.toString()
  let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
  let nDays = 86400000 * args[1]  
  let now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays
  else global.db.data.chats[res].expired = now + nDays
  if (e.length) await m.reply(`✅ Me uni correctamente al grupo \n\n≡ Info del grupo \n\n *Nombre :* ${await conn.getName(res)}\n\nEl bot saldrá automáticamente después de \n\n${msToDate(global.db.data.chats[res].expired - now)}`)

 if (e.length) await conn.reply(res, `🏮 Hola shavales

@${owbot} es mi creador  si tiene alguna duda
fui invitado por *${m.name}*`, m, {
    mentions: d
     }).then(async () => {
     await delay(7000)
     }).then( async () => {
     await conn.reply(res, `vale todos relajaos 🤭`, 0)
     await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado a *${conn.user.name}* al grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Enlace : ${args[0]}\n\nEl bot saldrá automáticamente después de \n\n${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado a *${conn.user.name}* al grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Enlace : ${args[0]}\n\nEl bot saldrá automáticamente después de\n\n ${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     if (!e.length) await m.reply(`✅ Se invito al bot al grupo\n\n${await conn.getName(res)}\n\nEl bot saldrá automáticamente después de \n${msToDate(global.db.data.chats[res].expired - now)}`).then(async () => {
     let mes = `Hola a todos 👋🏻
     
*${conn.user.name}* es uno de los bots multidispositivo de WhatsApp construido con Node.js, *${conn.user.name}* Recién invitado por *${m.name}*

para ver el Menu del bot escribe

*${usedPrefix}. menu*

@${conn.user.jid.split('@')[0]} saldrá automáticamente después de \n\n${msToDate(global.db.data.chats[res].expired - now)}`
  await conn.reply(res, mes, m, {
        mentions: d
         })
     })
    } catch (e) {
      conn.reply(global.owner[1]+'@s.whatsapp.net', e)
      throw `✳️ Lo siento, el bot no puede unirse a grupos`
      }
}
handler.help = ['join <chat.whatsapp.com> <dias>']
handler.tags = ['owner']
handler.command = ['join', 'invite'] 

handler.owner = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
>>>>>>> 0236ff33 (Limpieza plugins: solo owner, sub bot, autodetec y on/off)
