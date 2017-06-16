'uses strict'
const Joi = require('Joi');
const pg = require('pg');

const internals = {};

internals.isMessage = (event) => {
    Boolean(event.type === 'message' && event.text);
};

internals.isMessageToChannel = (message) => {
    typeof message.channel === 'string' && message.channel[0] === 'C';
};

internals.isFromUser = (event, userId) => {
    event.user === userId;
};

// Export all of the modules 
module.exports.isMessage = internals.isMessage;
module.exports.isMessageToChannel = internals.isMessageToChannel;
module.exports.isFromUser = internals.isFromUser;

