const botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(request => `Hello from TOF bot! Your request was: ${request.text}`);