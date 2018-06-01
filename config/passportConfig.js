var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var User           = require('../models/user');

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id).then(function(user){
		//success
		callback(null, user);
	}).catch(function(err){
		//something went wrong
		callback(err, null);
	})
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
	//find the user // validate credentials // callback //
	User.findOne({email: email}, function(err, user){
		if(err || !user || !user.isAuthenticated(password)) {
			console.log('error', err);
			callback(err, null);
		}
		else {
			callback(null, user);
		}
	});
}));

module.exports = passport;