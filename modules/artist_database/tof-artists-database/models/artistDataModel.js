const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistDataSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    iam: {
        type: String,
        required: true
    },
    profileType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
    },
    title: {
        type: String,

    },
    description: {
        type: String,
    },
    views: {
        type: String,
    },
    pricePerHour: {
        type: Number,
    },
    estimatedTime: {
        type: String,
    },
    time: {
        from: String,
        to: String,
    },
    contactNumber: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    geoLocation: {
        type: String
    },
    address: {
        type: String,
    },
    website: {
        type: String,
    },
    events: [{
        name: String,
        location: String,
        from: String,
        to: String,
        startTime: String,
        endTime: String,
        startTimeMS: String,
        endTimeMS: String
    }],

    tags: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    updatedOn: {
        day: String,
        week: String,
        month: String,
        year: String
    },
    isJuryMember: {
        type: Boolean
    }
})

const artistData = mongoose.model('artistData', artistDataSchema)

module.exports = artistData