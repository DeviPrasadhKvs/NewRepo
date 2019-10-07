var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
    
    _id : String,
    price : Number,
    size : Number,
    bookingFor : Number,
    bookingPeriod : String,
    rushRequests : Boolean,
    creativeFreedom : Number ,
    requestType : Boolean,
    coverupRequests: Boolean,
    placementPhotos : Number,
    visualReferences : Number,
    referenceOtherArt : Boolean,
    draftReviews : Boolean,
    customDesign : Boolean,
    venueDetails : Boolean,

    // other/s
    finalInvoiceVariation : Number,
    revisionsOfWork : Number,
    chargesForEdit : Number,
    cancellationCharges72hr : Number,
    billing : Number,
    cancellationCharges : Number,
    freeText : String
});

module.exports = mongoose.model('artist',artistSchema);