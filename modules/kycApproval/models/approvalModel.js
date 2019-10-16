const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const approvalModel = new Schema({

    memberID: {
        type: String,
        required: true
    },
    // profileImage: {
    //     type: String
    // },
    passport: {
        type: String,
    },
    driverLicense: {
        type: String,
    },
    idCard: {
        type: String,
    },
    residentPermitID: {
        type: String
    },
    memberStatus: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('approvalDB', approvalModel);