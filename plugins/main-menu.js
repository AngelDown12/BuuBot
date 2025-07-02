await conn.sendMessage(
  m.chat,
  {
    text: `✨ *MENÚ PRINCIPAL* ✨

Hola 👋 ${m.sender.split('@')[0]}
Elige una opción 👇`,
    footer: 'Bot Angel 👑',
    templateButtons: [
      {
        index: 1,
        quickReplyButton: {
          displayText: '👑 Owner',
          id: '.owner'
        }
      }
    ]
  }
)