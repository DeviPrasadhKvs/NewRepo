const ProductSchema = new Schema({
    product_id: {
        type: String
    },
    product_created_on: {
        type: String

    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    product_inventory: {
        type: String
    },
    product_description: {
        type: String
    },
    product_created_by: {
        type: String
    },
    category_id: {
        type: String
    },
    product_sku: {
        type: String
    },
    product_type: {
        type: String
    },
    product_commision: {
        type: String
    },
    product_keywords: {
        type: String
    },
    product_tax: {
        type: String
    },
    product_authorized: {
        type: String
    },
    product_status: {
        type: String
    }
});


module.exports.constants = constants;
module.exports.ProductSchema = ProductSchema;