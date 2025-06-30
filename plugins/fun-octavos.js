
let handler = async (m, { conn }) => {
    const imageUrl = 'https://files.catbox.moe/ntyp5r.jpg'; // Reemplaza esto con la URL de tu imagen
    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
}

handler.help = ['cuartoschampions'];
handler.tags = ['info'];
handler.command = ['cuartoschampions'];

export default handler;
