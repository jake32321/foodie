const giphy = require('giphy-api')(process.env.giphy_token);

var internals = {}

module.exports = (controller) => {
    // Handle requests for gifs.
    controller.hears(['gif me (.*)'], 'direct_message,direct_mention', (bot, message) => {
      var topic = message.match[1];
        bot.startConversation(message, function(err, convo){
            convo.say('Here you go!');
            giphy.random(topic, (err, res) => {
              internals = res
              convo.say(internals.data.image_url);
            });
        });
    }); 
};