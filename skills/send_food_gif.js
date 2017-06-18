const giphy = require('giphy-api')(process.env.giphy_token);


module.exports = (controller) => {
  controller.hears(['i\'m getting hungry'], 'direct_message, direct_mention', (bot, message) => {
    bot.createConversation(message, (err, convo) => {
      convo.say('I am too!');
    });
  });
}