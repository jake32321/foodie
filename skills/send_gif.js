const giphy = require('giphy-api')(process.env.giphy_token);

var internals = {}

module.exports = (controller) => {
    controller.hears(['I\'m hungry'], 'direct_message,direct_mention', (bot, message) => {
        bot.startConversation(message, function(err, convo){
            convo.say('So am I!!!');
            giphy.random('food', (err, res) => {
              internals = res
              convo.say(internals.data.image_url);
            });
        });
    }); 
  
    // Handle requests for gifs.
    controller.hears(['gif me (.*)'], 'direct_message,direct_mention', (bot, message) => {
      var topic = message.match[1];
        bot.startConversation(message, function(err, convo){
            convo.say('Here ya go!');
            giphy.random(topic, (err, res) => {
              internals = res
              convo.say(internals.data.image_url);
            });
        });
    }); 
};