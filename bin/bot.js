'uses strict'
const FoodieBot = require('../lib/foodie-bot.js');
const botSettings = require('../config.js');

const slackToken = botSettings.slackToken;
const name = botSettings.name;

var foodie = new FoodieBot({
    slackToken: slackToken,
    name: name
});

foodie.run();