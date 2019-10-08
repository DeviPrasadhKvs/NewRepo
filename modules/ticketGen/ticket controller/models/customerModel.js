const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerQuerySchema = new Schema({
    profileId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    issueId: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
})

const customerQueries = mongoose.model('customerQueries', customerQuerySchema)

module.exports = customerQueries