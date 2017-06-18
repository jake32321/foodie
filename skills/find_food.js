const zomato = require('zomato');

var searchCrit = {};

module.exports = (controller) => {
  controller.hears(['food me (.*) in (.*)'], 'direct_message,direct_mention', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      // Store message data for searching for a place to eat
      searchCrit.cusine = message.match[1];
      searchCrit.place = message.match[2];
      
      convo.say('Finding somewhere for you to eat!');
    });
    
    zomato.getLocations({query: searchCrit.place}, (err, res) => {
      console.log(res);
    });
  });
};