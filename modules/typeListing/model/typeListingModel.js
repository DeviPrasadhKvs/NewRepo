const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({

    typeID: {
        type: String
    },
    value: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    iconURL: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('typesList', typeSchema);