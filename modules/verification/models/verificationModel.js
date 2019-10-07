const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkDbModel = new Schema({

    profileId: {
        type: String
    },
    profileImage: {
        type: String
    },
    profileStatus: {
        type: Boolean
    }
});

module.exports = mongoose.model('checkDb', checkDbModel);