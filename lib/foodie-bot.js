'use strict'
const bot = require('slackbots');
const util = require('util');

var FoodieBot = function Constructor(settings){
    this.settings = settings;
    this.settings.name = this.settings.name || 'foodie';

    // Might change
    this.user = null;
    this.db = null;
};

FoodieBot.prototype.run = function(){
    FoodieBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

FoodieBot.prototype._onStart = function(){
    this._loadBotUser();
};

FoodieBot.prototype._onMessage = function(){
    var self = this;
    this.user = this.user.filter((user) => {
        return user.name === self.name;
    })[0];
}

util.inherits(FoodieBot, Bot)

module.exports = FoodieBot;