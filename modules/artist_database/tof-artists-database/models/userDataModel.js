const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const userDataSchema = new Schema ({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    displayName : String,
    gender : String,
    location : String,
    role : String,
    active : {
        type : String,
        default : true
    },

})

userDataSchema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userDataSchema.methods.matchPassword = (password, hash)=>{
    try {
        return bcrypt.compareSync(password, hash)
    } catch (error) {
        return false;
    }
    
}

const User = mongoose.model('User', userDataSchema)

module.exports = User