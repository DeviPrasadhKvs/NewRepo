const {
    check
} = require('express-validator');


let bookmarkValidations = {

    insertBookmark: () => {
       return [
            check('profile_id').exists().isAlphanumeric(),
            check('bookmark_type_id').exists().isAlphanumeric(),
            check('bookmark_type').exists().isAlphanumeric(),
        ]
    },

    getBookmark: () => {
        return [
            check('id').exists().isString()
        ]
    },

    getMultiBookmark: () => {
        return [
            check('bookmark_type_id').exists(),
            check('bookmark_type').exists().isString(),

        ]
    },

    getUserBookmark: () => {
        return [
            check('profile_id').exists(),
        ]
    },

    deleteBookmark: () => {
        return [
            check('id').exists().isAlphanumeric(),
        ]
    }
}

module.exports = bookmarkValidations;