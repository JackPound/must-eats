const mongoose         = require('mongoose');
const bcrypt           = require('bcrypt');

// favorite schema to embed in user schema
var favoriteSchema = new mongoose.Schema({
	cover: {
		url: String,
		cloudinary_id: String,
		width: Number,
		height: Number
	},
	genres: [Number],
	id: Number,
	name: String,
	platforms: [Number],
	summary: String
});
// user schema
var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	favorites: [favoriteSchema]
});
// checks whether the password is correct
userSchema.methods.isAuthenticated = function(password){

// compareSync(typed in password, password in database)
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}
// hash the password before saving a user to the db
userSchema.pre('save', function(next){
	if(!this.isModified('password')) {
		next(); 
	}
	else {
		this.password = bcrypt.hashSync(this.password, 10)
		next();
	}
});
// export model to use elsewhere
module.exports = mongoose.model('User', userSchema);
