const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileImageSchema = new Schema({
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

module.exports = mongoose.model('profile-image-controller', ProfileImageSchema);