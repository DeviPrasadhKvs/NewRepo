const orderSchema = new Schema({
    order_id: {
        type: BIGINT,
    },
    order_created_on: {
        type: String
    },
    order_type: {
        type: String
    },
    user_id: {
        type: String
    },
    order_description: {
        type: String
    },
    merchant_id: {
        type: String
    },
    product_pricing_id: {
        type: String
    },
    product_inventory_id: {
        type: String
    },
    order_recurring: {
        type: String
    },
    order_recurring_time: {
        type: String
    },
    order_completed_by: {
        type: String
    },
    auto_assignment_type: {
        type: String
    },
    order_address: {
        type: String
    },
    order_created_by: {
        type: String
    },
    order_status: {
        type: String
    }
});