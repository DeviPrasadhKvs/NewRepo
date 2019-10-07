
const ProductInventorySchema = new Schema({
    product_inventory_id: {
        type: String
    },
    product_inventory_created_on: {

        type: String
    },
    product_pricing_id: {
        type: String
    },
    merchant_id: {
        type: String
    },
    product_spec_values: {
        type: String
    },
    product_inventory: {
        type: String
    },
    product_status: {
        type: String
    }
});
