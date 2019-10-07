const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
    _id : String,
    refreshJWT : String,
    userJWT : String

})

refreshTokenSchema.methods.hashToken = (token)=>{
    return bcrypt.hashSync(token, bcrypt.genSaltSync(10))
}

refreshTokenSchema.methods.matchToken = (token, hash)=>{
    try {
        var tokenHash = bcrypt.hashSync(token, bcrypt.genSaltSync(10))
        
        
        return (tokenHash == hash)
    } catch (error) {
        console.log(error);
        
        return false;
    }
}

const refreshToken = mongoose.model('refreshToken', refreshTokenSchema)
module.exports = refreshToken