const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatFlowDbModel = new Schema({

    contentCode: {
        type : String
    },
    flow: [{
        type: String
    }]
});

module.exports = mongoose.model('chatFlowDb', chatFlowDbModel);