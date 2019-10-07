const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistDbModel = new Schema({
    
    updatedOn: {

        day: {
            type: String
        },
        week: {
            type: String
        },
        month: {
            type: String
        },
        year: {
            type: Number
        },
    
    },
    iam: {
        type: String
    },
    profileType: {
        type: String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    displayName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    geolocation: {
        type: String
    },
    address: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    estimatedTime: {
        type: String
    },
    pricePerHour: {
        type: String
    },
    tags: {
        type: String
    },
    timezone: {
        type: String
    },
    title: {
        type: String
    },
    views: {
        type: Number
    }
});

module.exports = mongoose.model('artistDb', artistDbModel);