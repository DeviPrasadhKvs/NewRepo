const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    review_created_on: {
        type: String
    },
    reviewer_id: {
        type: String
    },
    review_star: {
        type: Number
    },
    review_comment: {
        type: String
    },
    review_status: {
        type: String  
    }
});


const ArtistReviewSchema = new Schema({
    profile_id: {
        type: String
    },
    average_rating: {
        type: Number
    },
    reviews: [ReviewSchema]
});

module.exports = mongoose.model('review', ArtistReviewSchema);