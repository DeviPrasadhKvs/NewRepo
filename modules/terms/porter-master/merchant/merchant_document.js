const MerchantDocSchema = new Schema({
    merchant_docment_id: {
        type: BIGINT,
        primaryKey: true
    },
    merchant_document_created: {
        type: DATE(3),
    },
    merchant_id: {
        type: int
    },
    merchant_licence_id: {
        type: String
    },
    merchant_licence_image: {
        type: String
    },
    merchant_pan_id: {
        type: String
    },
    merchant_pan_image: {
        type: String
    },
    additional_image: {
        type: String
    },
    merchant_document_status: {
        type: int
    },


})