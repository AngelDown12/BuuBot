let handler = async (m) => {
    const memes = [
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg',
        'https://qu.ax/tNPfx.jpg'
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    await conn.sendMessage(m.chat, { image: { url: randomMeme }, caption: "¡Aquí tienes un meme para alegrar tu día!" }, { quoted: m });
}

handler.help = ['meme'];
handler.tags = ['diversión'];
handler.command = ['meme'];

export default handler;