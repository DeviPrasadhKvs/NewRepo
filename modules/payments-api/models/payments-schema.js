const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
   profileId:{
       type: Number
   },
   transcationId:{
       type: String
   },
   amount:{
        type: Number
   },
   status:{
       type: String
   },
   payeeId:{
       type: String
   },
   payee_profileId:{
       type: String
   },
   payerId:{
       type: String
   },
   mode:{
    // [CARD||AUTO||WALLET]
       type: String
   },
   type:{
    // [VISA||MATER||MASTERO||AMERICAN||FOREX]
       type: String
   },
   currency:{
       type: String
   },
   customerID:{
       type: Number
   },
   paymentTranscationId:{
       type: String
   },
   description: {
       type : String
   },
   time: {
       type: Number
   },
   payment_receipt_url:{
       type: String
   },
   country:{
       type: String
   },
   sourceId:{
   },
   lastFour:{
       type: Number
   }
})

const payments = mongoose.model('payments', paymentSchema)

module.exports = payments;