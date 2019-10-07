const Joi = require('@hapi/joi');
const {
    checkSchema,
    check
} = require('express-validator');




let porterValidations = {

    insertProduct: () => {
       return [
            check('product_name').exists().isAlpha(),
            check('product_description').optional().isAlphanumeric(),
        ]
    },

    updateProduct: () => {
        return [
            check('product_id').exists().isAlphanumeric(),
        ]
    },

    getProduct: () => {
        return [
            check('product_id').exists().isAlphanumeric(),
        ]
    },

    deleteProduct: () => {
        return [
            check('product_id').exists().isAlphanumeric(),
        ]
    }


}
module.exports = porterValidations;