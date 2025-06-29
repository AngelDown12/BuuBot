let handler = async (m, { conn }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

    // Verifica si el usuario está en la base de datos
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, '🚩 El usuario no se encuentra en mi base de datos.', m);
    }

    let user = global.db.data.users[who];

    // Respuesta mostrando el XP
    await m.reply(`${who == m.sender ? `Tienes *${user.exp}* 🆙 XP.` : `El usuario @${who.split('@')[0]} tiene *${user.exp}* 🆙 XP.`}`, null, { mentions: [who] });
}

handler.help = ['verxp'];
handler.tags = ['rpg'];
handler.command = ['verxp', 'xp', 'nivel'];

module.exports = handler;;