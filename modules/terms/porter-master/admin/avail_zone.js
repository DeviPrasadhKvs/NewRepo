const AvailZoneSchema = new Schema({
    avail_zone_id: {
        type: BIGINT,
    },
    avail_zone_pincode: {
        type :String
    },
    avail_zone_city: {
        type :String
    },
    avail_zone_state: {
        type :String
    },
    zone_type_id: {
        type :Integer
    },
    avail_zone_status: {
        type :String
    },
});




