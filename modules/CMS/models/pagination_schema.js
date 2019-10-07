const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paginationSchema = new Schema({
    username:{
        type : String 
    },
    user_email:{
        type : String
    },
    user_verified:{
        type : String
    },
    created_on:{
        type : String
    },
    user_type : {
        type : String
    }
})

const pages = mongoose.model('pages', paginationSchema);

module.exports = pages;