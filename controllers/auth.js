const express        = require('express');
const passport       = require('../config/passportConfig');
const User           = require('../models/user');
const isLoggedIn       = require('../middleware/isLoggedIn');
const router = express.Router();
const mongoose       = require('mongoose');
// mongoose.connect('mongodb://localhost/project2');
//show login page
router.get('/login', function(req, res){
	res.render('account/login');
})
//handle login request
router.post('/login', passport.authenticate('local', {
	successRedirect: '/account/',
	successFlash: 'You are now logged in',
	failureRedirect: '/account/login',
	failureFlash: 'Invalid Credentials'
}));
//show signup page
router.get('/signup', function(req, res){
	res.render('account/signup');
})
//handle signup request
router.post('/signup', function(req, res, next){
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			console.log('signup error', err);
			req.flash('error', 'something went wrong, check logs')
			res.redirect('/account/signup');
		}
		else if(user){
			req.flash('error', 'An account is already registered with this email');
			res.redirect('/account/signup');
		}
		else {
			User.create(req.body, function(err, createdUser){
				if(err){
					req.flash('error', 'trouble creating user');
					return console.log('err', err)
				}
				passport.authenticate('local', {
					successRedirect: '/account/',
					successFlash: 'Successful account creation'
				})(req, res, next);
			})
		}
	})
})
//handle signout request
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/')
})

// account route accessable if logged in
router.get('/', isLoggedIn, function(req, res){
	res.render('account')
})
// show single game from favorites
router.get('/:id', function(req, res){
	User.findOne({id: req.user._id}, function(err, user){
		if(err){
			console.log('error retrieving fav game', err);
		}
		else {
			req.user.favorites.id(req.params.id).remove();
			req.user.save(function (err) {
				
			})
		};
	})
	res.redirect('/account')
})
module.exports = router;
