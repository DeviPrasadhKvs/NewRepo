const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchemaModel = new Schema({
    sessionId: {
        type: Number
    },
    chatData: {
        messageCode: {
            type: String,
        },
        message: {
            type: String
        },
        timestamp: {
            type: String
        }
    }
})

module.exports = mongoose.model('chatS', chatSchemaModel);