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
    // this.on('message', this._onMessage);
};

FoodieBot.prototype._loadBotUser = function(){
    var self = this;
    this.user = this.users.filter((user) => {
        return user.name === self.name;
    });
}

FoodieBot.prototype._onStart = function(){
    this._loadBotUser();
    this._welcomeMessage();
};

FoodieBot.prototype._onMessage = function(){
    var self = this;
    this.user = this.user.filter((user) => {
        return user.name === self.name;
    })[0];
};

FoodieBot.prototype._welcomeMessage = function(){
    this.postMessageToChannel(this.channels[0].name, 'Hello folks! I\'m alive!', { as_user: true });
};

FoodieBot.prototype._getChannelById = function(channelId){
    return this.channels.filter((item) => {
        return item.id = channelId;
    })[0];
};

util.inherits(FoodieBot, bot);

module.exports = FoodieBot;