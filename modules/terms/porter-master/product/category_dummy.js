const CategoryNewSchema = new Schema({
    category_id: {
        type: String,
    },
    admin_id: {
        type: String
    },
    category_parent_id: {
        type: String
    },
    category_name: {
        type: String
    },
    category_image: {
        type: String
    },
    category_hasChild: {
        type: String
    },
    category_description: {
        type: String
    },
    category_authorized: {
        type: String
    },
    category_status: {
        type: String
    },
    category_description: {
        type: String
    },
    merchant_id: {
        type: String
    },
    category_created_on: {
        type: {
            type: String
        },
        defaultValue: {
            type: String
        },
    }
});


module.exports.CategoryNewSchema = CategoryNewSchema;