const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_created_on: {
        type: String
    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    product_description: {
        type: String
    },
    product_created_by: {
        type: String
    },
    product_authorized: {
        type: String
    },
    product_status: {
        type: String   // completed , upcoming, for sale, unconfirmed
    }
});

module.exports = mongoose.model('product', productSchema);