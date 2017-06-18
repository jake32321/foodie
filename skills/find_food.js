const Yelp = require('yelp-api-v3');

var internals = {
  yelpConfig: {
    app_id: process.env.yelp_id,
    app_secret: process.env.yelp_secret 
  },
  searchCrit: {},
  resData: {}
};

var yelpSearch = new Yelp(internals.yelpConfig);

module.exports = (controller) => {
  controller.hears(['food me (.*) in (.*)'], 'direct_message,direct_mention', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      // Store message data for searching for a place to eat
      internals.searchCrit.cusine = message.match[1];
      internals.searchCrit.place = message.match[2];
      
      convo.say('Finding somewhere for you to eat!');
    });
    
    yelpSearch.search({term: internals.searchCrit.cusine, location: '62901', limit: 1})
      .then((data) => {
        console.log(data);
      });
  });
};