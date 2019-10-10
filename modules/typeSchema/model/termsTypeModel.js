const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const termsSchema = mongoose.Schema({
    termsType: {
        type: String
    },
    questions: [{
        fieldID: {
            type: String,
            required: true
        },
        displayName: {
            type: String
        },
        inputType: {
            type: String
        },
        options: {
            type: String
        }
    }],
    termsText: {
        type: String
    }
});

module.exports = mongoose.model('collaborationTerms', termsSchema)