'use strict'

const DEBUG = true;
const Yelp = require('yelp-fusion');
const moduleConfig = require('../init_modules.js');

const internals = {
  searchCrit: {},
  resData: {},
  client: ''
};

// var yelpSearch = new Yelp(internals.yelpConfig);

module.exports = (controller) => {
  controller.hears(['food me (.*) in (.*)'], 'direct_message, direct_mention', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      // Store message data for searching for a place to eat
      internals.searchCrit.cusine = message.match[1];
      internals.searchCrit.place = message.match[2];
      
      convo.say('Finding somewhere for you to eat in ' + internals.searchCrit.place + '!');
      
      Yelp.accessToken(process.env.yelp_client_id, process.env.yelp_client_secret)
        .then(resp => {
          if(DEBUG){
            console.log(resp.jsonBody.access_token);
          }
          
          internals.client = Yelp.client(resp.jsonBody.access_token);
          return internals.client.search({
            term: internals.searchCrit.cusine,
            location: internals.searchCrit.place
          });
        })
        .then(resp => {
          console.log(resp.jsonBody);
        })
        .catch(e => {
          var err = JSON.parse(e.response.body);
          console.log(err.error);
          if (err.error.code == 'LOCATION_NOT_FOUND'){
            convo.say('Sorry! Could not find any locations for ' + internals.searchCrit.place + '.')
          }
        });
    });
  });
};

var createRandomZip = (local) => {
  var randomZip = local[Math.floor(Math.random() * local.length)];
  return randomZip.zip;
}
