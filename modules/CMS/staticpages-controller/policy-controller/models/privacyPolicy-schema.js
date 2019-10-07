const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privacyPolicySchema = new Schema({
	_id    : String,
	data   : String
});

module.exports = mongoose.model('privacyPolicy', privacyPolicySchema);