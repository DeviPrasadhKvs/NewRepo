const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fetchModel = new Schema({

    id: {
        type: String
    },
    name: {
        type: String
    },
    position: {
        type: String
    },
    url: {
        type: String
    },
    text: {
        type: String
    },
    styles: {
        type: String
    }
});

module.exports = mongoose.model('fetches', fetchModel);