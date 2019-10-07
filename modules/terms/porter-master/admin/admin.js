const AdminSchema = new Schema({
    admin_id: {
        type: BIGINT,
        primaryKey: true
    },
    admin_email: {
            type: String,
            unique: true
    },
    admin_password: {
        type: String,
    },
    admin_first_name: String,
    admin_last_name: {
        type: String
    },
    admin_product_type: {
        type: ENUM('Pickup Only', 'Delivery Only', 'Pickup and Delivery', 'Appointment')
    },
    admin_phone_no: {
        type: String
    },
    admin_address: {
        type: String
    },
    admin_lat: {
        type: String
    },
    admin_long: {
        type: String
    },
    admin_profile_pic: {
        type: String
    },
    admin_verification_status: {
        type: ENUM('Verified', 'Not Verified')
    },
    admin_status: {
        type: Int
    },

});