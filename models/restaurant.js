const mongoose       = require('mongoose')

var restaurantSchema = new mongoose.Schema({
	name: String,
	address: String,
	pricePoint: Number,
	reservation: Boolean,
	smallThumb: String,
	backgrounds: [String],
	website: String,
	category: Number,
	likes: Number,
	hours: [String],
	phoneNumber: String,
	attire: String,
	parking: String,
	acceptCreditCard: Boolean,
	city: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);