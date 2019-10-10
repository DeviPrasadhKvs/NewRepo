const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerQuerySchema = new Schema({

    profileID: {
        type: String,
        required: true
    },
    issueID: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    status: {
        type: String,
    }
})

var customerQueryModel = mongoose.model('customerQueries', customerQuerySchema)

module.exports = customerQueryModel;