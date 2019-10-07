const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessagesDbModel = new Schema({

    contentCode:{
        type:String
    },
    input:{
        type:Boolean,
        default:false
    },
    message:{
        type:String
    },
    shortMessage:{
        type:String
    }
});

module.exports = mongoose.model('chatMessagesDb', chatMessagesDbModel);