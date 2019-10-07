const ProductValueSchema = new Schema({
    product_spec_value_id: {
            type: String
    },
    product_spec_value_created_on: {
            type: String
    },
    product_pricing_id: {
        type: String
    },
    product_spec_id: {
        type: String
    },
    merchant_id: {
        type: String
    },
    product_value_inventory: {
        type: String
    },
    product_spec_inventory_status: {
        type: String
    },
    product_spec_value: {
        type: String
    },
    product_spec_value_status: {
        type: String
    }
});
