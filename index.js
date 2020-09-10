var TelegramBot = require('node-telegram-bot-api'),
  // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
  bot = new TelegramBot("1329861955:AAEjRTrm2N9fW8ya-PzDUV0R_TabMUoQx30", {
    polling: true
  });


function respondToMessage(msg) {

  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      force_reply: true
    })
  }
  bot.sendMessage(msg.chat.id, 'When is your birthday? (YYYY-MM-DD)', opts)
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {

          var date = new Date();
          var date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          var birthday = new Date(reply.text);
          var date2 = new Date(date1.getFullYear(), birthday.getMonth(), birthday.getDate() + 1)

          // To calculate the time difference of two dates 
          var Difference_In_Time = date2.getTime() - date1.getTime();
          var days = Difference_In_Time / (1000 * 3600 * 24);

          if (days < 0) {
            var date2 = new Date(date1.getFullYear() + 1, birthday.getMonth(), birthday.getDate() + 1)

            var Difference_In_Time = date2.getTime() - date1.getTime();
            var days = Difference_In_Time / (1000 * 3600 * 24);
          }
          bot.sendMessage(msg.chat.id, 'There are ' + days + 'days left until your birthday')

        }
      )
    })
}


function respond(msg) {

  const hand = "\u{1F44B}";
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      force_reply: true
    })
  }
  bot.sendMessage(msg.chat.id, 'you want to know many days till your next birthday?', opts)
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {

          if (reply.text == "yes" || reply.text == "yeah" || reply.text == "yup") {
            respondToMessage(msg);
          } else if (reply.text == "no" || reply.text == "nah") {
            bot.sendMessage(msg.chat.id, 'Goodbye' + hand)
          }
        }
      )
    })
}


// Chat
bot.onText(/\hi/, function chatMessage(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      force_reply: true
    })
  }

  bot.sendMessage(msg.chat.id, "Hello, my name is mariabot");
  bot.sendMessage(msg.chat.id, 'what is your name?', opts).
  then(sentMessage => {
    bot.onReplyToMessage(
      sentMessage.chat.id,
      sentMessage.message_id,
      reply => {
        bot.sendMessage(msg.chat.id, 'Hi ' + reply.text)

        respond(msg);
      }
    )
  })


});


bot.on("polling_error", (err) => console.log(err));









// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Edit Text',
          // we shall check for this value when we listen
          // for "callback_query"
          callback_data: 'edit'
        }]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});