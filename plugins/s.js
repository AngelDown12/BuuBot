
let handler = async (m) => {
    const memes = [
        'https://files.catbox.moe/ntyp5r.jpg', // Reemplaza con enlaces a tus memes
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',        
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg', 
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
        'https://files.catbox.moe/ntyp5r.jpg',
      

    ];

    // Elegir un meme aleatorio
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    // Enviar el meme al chat
    await conn.sendMessage(m.chat, { image: { url: randomMeme }, caption: "¡Aquí tienes un meme para alegrar tu día!" }, { quoted: m });
}

handler.help = ['meme'];
handler.tags = ['diversión'];
handler.command = ['meme'];

export default handler;
