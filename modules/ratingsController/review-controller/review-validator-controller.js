const {
    check
} = require('express-validator');


let reviewValidations = {

    insertReview: () => {
       return [
            check('reviewer_id').exists().isAlphanumeric(),
            check('profile_id').exists().isAlphanumeric(),
            check('review_star').exists().isInt(),
        ]
    },

    getReview: () => {
        return [
            check('profile_id').exists().isString(),
        ]
    },

    getMultiReview: () => {
        return [
            check('profile_id').exists(),
        ]
    },

    deleteReview: () => {
        return [
            check('id').exists().isAlphanumeric(),
        ]
    }
}

module.exports = reviewValidations;