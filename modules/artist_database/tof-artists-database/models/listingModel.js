var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
    title: String,
    description: String,
    photo: String,
    tags: String,
    price: String,
    date: String,
    time: String,
    location: String,
    city: String,
    country: String,
    address: String,
    others: String


});

module.exports = mongoose.model('listings', listingSchema);