const {
    check
} = require('express-validator');


let imageValidations = {

    validateImage: () => {
       return [
            check('image_hash').exists(),
            check('image_name').exists()
        ]
    },

    getImageByStatus: () => {
        return [
            check('image_status').exists().isString(),
        ]
    },

    getImage: () => {
        return [
            check('image_id').exists().isString(),
        ]
    },

    updateImage: () => {
        return [
            check('image_id').exists(),
            check('image_status').exists()
        ]
    },

    deleteImage: () => {
        return [
            check('image_id').exists().isAlphanumeric(),
        ]
    }
}

module.exports = imageValidations;