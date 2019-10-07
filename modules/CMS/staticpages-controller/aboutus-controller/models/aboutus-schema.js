const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutusSchema = new Schema({
	_id    : String,
	data   : String
});

module.exports = mongoose.model('aboutus', aboutusSchema);