const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({

    profile_id:{
        type: String
    },
    customer_id:{
        type: String
    },
    source:{
        type: Array
    }
})

const customers = mongoose.model('customers', customerSchema)

module.exports = customers;
