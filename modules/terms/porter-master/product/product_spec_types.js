

const ProductSpecSchema = new Schema({
    product_spec_id: {
        type: String
    },
    product_spec_created_on: {
        type: String
    },
    product_spec_type_values: {
        type: String
    },
    product_spec_name: {
        type: String
    },
    category_id: {
        type: String
    },
    product_spec_authorized: {
        type: String
    },
    product_spec_status: {
        type: String
    }
});