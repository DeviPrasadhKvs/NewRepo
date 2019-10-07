const OrderJobSchema = new Schema({
    job_id: {
        type: BIGINT,
    },
    job_created_on: {
        type: DATE(3),
    },
    order_id: {
        type: String
    },
    job_type: {
        type: String
    },
    job_agent: {
        type: String
    },
    job_address: {
        type: String
    },
    job_latitude: {
        type: String
    },
    job_longitude: {
        type: String
    },
    job_user_contact_name: {
        type: String
    },
    job_user_contact_no: {
        type: String
    },
    job_user_contact_email: {
        type: String
    },
    job_started_at: {
        type: String
    },
    job_arrived_at: {
        type: String
    },
    job_completed_at: {
        type: String
    },
    job_distance_travelled: {
        type: String
    },
    job_completed_by: {
        type: String
    },
    job_status: {
        type: String
    },
});
