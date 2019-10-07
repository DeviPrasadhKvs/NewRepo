const mongoose = require('mongoose')
const Schema = mongoose.Schema





const tattooDataSchema = new Schema ({
    name : {
        type : String,
    },
    location: String,
    website: String,
    email: String,
    facebook: String,
    instagram: String,
    twitter: String,
    phone: String

})




const tattooData = mongoose.model('tattooData', tattooDataSchema)

module.exports = tattooData