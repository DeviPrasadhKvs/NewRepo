const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    bookmark_type_id: {
        type: String
    },
    bookmark_type: {
        type: String
    },
    profile_id: {
        type: String
    }
});

module.exports = mongoose.model('bookmark', BookmarkSchema);