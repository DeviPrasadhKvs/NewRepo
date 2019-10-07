const PricingSchema = new Schema({
    product_pricing_id: {
        type: String
    },
    product_pricing_created_on: {
        type: String
    },
    product_id: {
        type: String
    },
    merchant_id: {
        type: String
    },
    category_id: {
        type: String
    },
    product_pricing_price: {
        type: String
    },
    product_pricing_discount: {
        type: String
    },
    pricing_product_inventory: {
        type: String
    },
    pricing_product_stock: {
        type: String
    },
    product_pricing_price: {
        type: String
    },
    product_pricing_status: {
        type: String
    }
});