const OrderCartScema = new Schema({
    order_cart_id: {
        type: String
    },
    order_cart_created_on: {
        type: {
            type: String
        }
    },
    user_id: {
        type: String
    },
    product_pricing_id: {
        type: String
    },
    product_inventory_id: {
        type: String
    },
    order_cart_quantity: {
        type: String
    },
    order_cart_status: {
        type: String
    }
});