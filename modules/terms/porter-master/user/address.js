const addressSchema = new Schema({
    address_id: {
        type: String
    },

    address_created_at: {
        type: String
    },
    user_id: {
        type: String
    },
    address_pincode: {
        type: String
    },
    address_detail: {
        type: String
    },
    address_city: {
        type: String
    },
    address_state: {
        type: String
    },
    address_lat: {
        type: String
    },
    address_long: {
        type: String,
    },
    address_type: {
        type: String
    },
    make_default: {
        type: String
    },
    address_additional_detail: {
        type: String
    }
});