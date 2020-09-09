var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("1329861955:AAEjRTrm2N9fW8ya-PzDUV0R_TabMUoQx30", { polling: true });

telegram.on("text", (message) => {
    if(message.text == 'hi'){
        telegram.sendMessage(message.chat.id, "Whats your first name?");
    }
});

