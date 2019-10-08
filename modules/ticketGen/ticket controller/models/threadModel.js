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

const thread = mongoose.model('ticketThreads', threadSchema)

module.exports = thread