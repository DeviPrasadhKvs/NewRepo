const MerchantSchema = new Schema({
    merchant_id: {
        type: Int
    },
    merchant_email: {
        type: {
            type: String,
            unique: true
        },
    },
    merchant_created_on: {
        type: String,
    },
    merchant_password: {
        type: String
    },
    merchant_first_name: {
        type: String
    },
    merchant_last_name: {
        type: String
    },
    merchant_display_name: {
        type: String
    },
    merchant_parent_admin: {
        type: BIGINT
    },
    merchant_phone_no: {
        type: String
    },
    merchant_city: {
        type: String
    },
    merchant_state: {
        type: String
    },
    merchant_country: {
        type: String
    },
    merchant_address: {
        type: String
    },
    merchant_pincode: {
        type: String
    },
    merchant_profile_pic: {
        type: String
    },
    merchant_status: {
        type: INTEGER
    },
    merchant_verification_status: {
        type: ENUM('Verified', 'Not Verified')
    },
    merchant_description: {
        type: String
    },
    merchant_lat: {
        type: String
    },
    merchant_long: {
        type: String
    },
    merchant_device_type: {
        type: String
    },
    merchant_device_token: {
        type: String
    },
    merchant_available_days: {
        type: String
    }
});