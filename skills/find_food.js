'use strict'

const DEBUG = true;
const Yelp = require('yelp-fusion');
const goorl = require('goorl');
const moduleConfig = require('../init_modules.js');

const internals = {
  searchCrit: {},
  resData: {},
  goorlOptions: {
    key: process.env.goorl_key,
    url: ''
  },
  client: ''
};

// var yelpSearch = new Yelp(internals.yelpConfig);

module.exports = (controller) => {
  controller.hears(['food me (.*) in (.*) (.*)'], 'direct_message, direct_mention', (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      // Store message data for searching for a place to eat
      internals.searchCrit.cusine = message.match[1];
      internals.searchCrit.place = message.match[2];
      internals.searchCrit.price = message.match[3].length;
      
      convo.say('Finding somewhere for you to eat in ' + internals.searchCrit.place + '!');
      
      Yelp.accessToken(process.env.yelp_client_id, process.env.yelp_client_secret)
        .then(resp => {
          if(DEBUG){
            console.log(resp.jsonBody.access_token);
          }
          
          internals.client = Yelp.client(resp.jsonBody.access_token);
        
          return internals.client.search({
            term: internals.searchCrit.cusine,
            location: internals.searchCrit.place,
            price: internals.searchCrit.price
          });
        })
        .then(resp => {
          // More to come here          
        
          console.log(resp.jsonBody);
          internals.goorlOptions.url = resp.jsonBody.businesses[0].url;
        
          return goorl(internals.goorlOptions);
        })
        .then(url => {
          console.log(url);
          convo.say('Here ya go! ' + url);
        })
        .catch(e => {
          var err = JSON.parse(e.response.body);
          
          if(DEBUG){
            console.log(err.error);
          }
          
          if (err.error.code == 'LOCATION_NOT_FOUND'){
            convo.say('Sorry! Could not find any locations for ' + internals.searchCrit.place + '.');
          }
        });
    });
  });
};

var createRandomZip = (local) => {
  var randomZip = local[Math.floor(Math.random() * local.length)];
  return randomZip.zip;
}
