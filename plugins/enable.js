let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || '').toLowerCase();
  let isAll = false, isUser = false;

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.bienvenida = isEnable;
      break;

    case 'antiprivado2':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.antiPrivate2 = isEnable;
      break;

    case 'antilag':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.antiLag = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['autoread'] = isEnable;
      break;

    case 'antispam':
      isAll = true;
      if (!isOwner) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiSpam = isEnable;
      break;

    case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.audios = isEnable;
      break;

    case 'detect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;

    case 'jadibotmd':
    case 'serbot':
    case 'subbots':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.jadibotmd = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;

    case 'document':
    case 'documento':
      isUser = true;
      user.useDocument = isEnable;
      break;

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;

    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiBot2 = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
    case 'modeadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case 'antiprivado':
      bot.antiPrivate = isEnable;
      break;

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.nsfw = isEnable;
      break;

    case 'antiarabes':
    case 'antinegros':
    case 'antifakes':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.onlyLatinos = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) return m.reply(`
*🧑‍💻 INGRESE UNA OPCIÓN PARA ACTIVAR O DESACTIVAR*

*🔖 LISTA DE OPCIONES*
*Tipo :* welcome - Activa Bienvenida/Despedida
*Tipo :* nsfw - Comandos +18
*Tipo :* antilag - Anti Lags
*Tipo :* antiarabes - Anti Arabes
*Tipo :* antilink - Anti Enlaces
*Tipo :* autoread - Auto Leer
*Tipo :* restrict - Acciones Avanzadas
*Tipo :* document - Descarga en Documentos
*Tipo :* modoadmin - Solo Admins
*Tipo :* audios - Activar Audios
*Tipo :* subbots - Modo SubBots

*• Ejemplo:*
*- ${usedPrefix + command} welcome*
`.trim());
      throw false;
  }

  await conn.sendMessage(m.chat, {
    text: `*𝐀𝐧𝐠𝐞𝐥-𝐁𝐨𝐭 𝐀𝐯𝐢𝐬𝐨*\n\n*𝐂𝐨𝐦𝐚𝐧𝐝𝐨:* *_${type}_* \n\n*𝐀𝐜𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞:* *${isEnable ? '*𝐀𝐜𝐭𝐢𝐯𝐚𝐝𝐨 ✅*' : '*Desactivado ❌*'}*\n\n*𝐒𝐨𝐥𝐢𝐜𝐢𝐭𝐚𝐝𝐨:* ${isAll ? '*𝐄𝐧 𝐓𝐨𝐝𝐨 𝐞𝐥 𝐁𝐨𝐭* 🌐' : isUser ? '*𝐄𝐧 𝐄𝐬𝐭𝐞 𝐔𝐬𝐮𝐚𝐫𝐢𝐨* 👥' : '*𝐄𝐧 𝐄𝐬𝐭𝐞 𝐂𝐡𝐚𝐭*'}`,
    contextInfo: {
      externalAdReply: {
        title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
        thumbnailUrl: "https://files.catbox.moe/ntyp5r.jpg",
        mediaType: 1,
        renderLargerThumbnail: false,
        sourceUrl: ''
      }
    }
  });
};

handler.help = ['enable', 'disable', 'on', 'off']
handler.tags = ['nable']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler