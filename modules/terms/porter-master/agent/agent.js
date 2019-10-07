const AgentSchema = new Schema({
    agent_id: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    agent_email: {
        type: {
            type: String,
            unique: true,
        },
    },
    agent_created_on: {
        type: DATE(3),
    },
    agent_password: {
        type: String
    },
    agent_first_name: {
        type: String
    },
    agent_last_name: {
        type: String
    },
    agent_lat: {
        type: DOUBLE
    },
    agent_long: {
        type: DOUBLE
    },
    agent_device_type: {
        type: ENUM('iOS', 'android', 'web')
    },
    agent_device_token: {
        type: String
    },
    agent_imei: {
        type: String
    },
    agent_device_os: {
        type: String
    },
    agent_vehicle_type: {
        type: String
    },
    agent_vehicle_number: {
        type: String
    },
    agent_vehicle_desc: {
        type: String
    },
    agent_drivers_license_id: {
        type: String
    },
    agent_rc: {
        type: String
    },
    agent_insuarance: {
        type: String
    },
    agent_identity_proof: {
        type: String
    },
    agent_identity_proof_id: {
        type: String
    },
    agent_manager_parent: {
        type: Int
    },
    agent_admin_parent: {
        type: Int
    },
    agent_active: {
        type: Int
    },
    agent_on_task: {
        type: Int
    },
    agent_timezone: {
        type: String
    },
    agent_address: {
        type: String
    },
    agent_phone_no: {
        type: String
    },
    agent_profile_pic: {
        type: String
    },
    agent_verification_status: {
        type: ENUM('Verified', 'Not Verified')
    },
    agent_status: INTEGER,
});