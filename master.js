'use strict'
const bot = require('slackbots');
const config = require('./config.js');
const express = require('express');

const port = process.env.PORT || 8080;

const settings = {
    token: config.slackToken,
    name: 'foodie' 
}

bot.on('start', () => {
    bot.postMessageToChannel('general', 'Hello everyone!');
});