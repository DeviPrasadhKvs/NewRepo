const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerQuerySchema = new Schema({

    profileID: {
        type: String,
    },
    issueID: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        // unique: true
    },
    query: {
        type: String,
        required: true
    },
    status: {
        type: String,
    }
})

module.exports = mongoose.model('customerQueries', customerQuerySchema)