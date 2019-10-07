const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageValidatorSchema = new Schema({
    image_name: {
        type: String
    },
    image_hash: {
        type: String
    },
    image_status: {
        type: String
    }
});

module.exports = mongoose.model('image-validator', ImageValidatorSchema);