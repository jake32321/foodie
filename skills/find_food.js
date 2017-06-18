const zomato = require('zomato.js');
const zClient = new zomato(process.env.zomato_api_key);

var internals = {
  searchCrit: {},
  resData: {}
};


module.exports = (controller) => {
  controller.hears(['food me (.*) in (.*)'], 'direct_message,direct_mention', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      // Store message data for searching for a place to eat
      internals.searchCrit.cusine = message.match[1];
      internals.searchCrit.place = message.match[2];
      
      convo.say('Finding somewhere for you to eat!');
    });
    
    zClient.cities({q: internals.searchCrit.place})
      .then((cityRes) => {
        console.log(cityRes[0].id);
        return cityRes[0].id;
      })
      .then((cityId) => {
        
      });
  });
};