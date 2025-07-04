/* Pack By WillZek 
- Free Codes Titan
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
- https://github.com/WillZek 
*/

import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    await m.react('🕑');

    const txt = 'Pack🔥🔥🔥\n> Pon De Nuevo .pack para mirar el siguiente ✨';
    const img = 'https://delirius-apiofc.vercel.app/nsfw/girls';

    // Envía la imagen con caption y cita el mensaje original
    await conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
  }
};

handler.command = ['pack'];

export default handler;