const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({

    profileId: {
        type: String,
        required: true
    },
    thread: [{
        issueId: String,
        status: String,
        timeStamp: { type: Date, default: Date.now }
    }],
})

var threadModel = mongoose.model('ticketThreads', threadSchema)

module.exports = threadModel;