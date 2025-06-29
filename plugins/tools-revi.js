
const handler = async (m, { conn}) => {
    let comandos = [
        { nombre: ".noticias", activo: true},
        { nombre: ".trivia", activo: true},
        { nombre: ".ruleta", activo: false, motivo: "🔴 *Error en la API*"},
        { nombre: ".alienigena", activo: false, motivo: "❌ *Respuesta vacía*"},
        { nombre: ".pelear", activo: true},
        { nombre: ".postres", activo: false, motivo: "⚠️ *Fallo al cargar ingredientes*"},
        { nombre: ".escape", activo: false, motivo: "🔄 *Problema con conexión a base de datos*"},
        { nombre: ".gladiador", activo: false, motivo: "⛔ *Fallo en parámetros de ejecución*"},
        { nombre: ".multiverso", activo: false, motivo: "🛑 *Tiempo de espera agotado*"},
        { nombre: ".chefextremo", activo: false, motivo: "🛠️ *Error de configuración en script*"},
        { nombre: ".topgamer", activo: false, motivo: "💀 *Ranking no disponible*"}
    ];

    let mensaje = "*🔍 Revisión de Comandos!* ⚙️🚀\n\n";
    comandos.forEach(cmd => {
        mensaje += cmd.activo
? `✅ *${cmd.nombre}* - Funciona correctamente.\n`
: `❌ *${cmd.nombre}* - Fallo detectado. *Motivo:* ${cmd.motivo}\n`;
});

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.command = ["revision"];
module.exports = handler;;