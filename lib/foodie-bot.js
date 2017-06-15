'use strict'
const bot = require('slackbots');
const util = require('util');

var FoodieBot = function Constructor(settings){
    this.settings = settings;
    this.settings.name = this.settings.name || 'foodie';

    // Might change
    this.user = null;
    this.db = null;
}

util.inherits(FoodieBot, Bot)

module.exports = FoodieBot;