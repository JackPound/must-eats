require('dotenv').config();
const bodyParser       = require('body-parser');
const express          = require('express');
const expressLayouts   = require('express-ejs-layouts');
const flash            = require('connect-flash')
const mongoose         = require('mongoose');
const passport		   = require('./config/passportConfig');
const session 	       = require('express-session');
const isLoggedIn       = require('./middleware/isLoggedIn');
const User             = require('./models/user');
const Restaurant       = require('./models/restaurant');

var app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hackathon');

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(express.static('public'));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitated: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});


// ROUTES && CONTROLLERS HER
// home page, type in city name ect
// when they click submit send them to /city/:id/category
app.get('/', function(req,res){
	res.render('home')
})

// for getting individual city, we won't use this
app.get('/city/:id', function(req,res){
})

// choose a category page, from given city, will only default to seattle to start
app.get('/city/:id/category', function(req, res){
	res.render('what')
})

// shows al restaurants in a category for given city
app.get('/city/:id/category/:cat_id', function(req, res){
	Restaurant.find({city: 'Seattle', category: req.params.cat_id}, function(err, restaurants){
		res.render('results', {restaurants: restaurants})
	})
})

// show single restaurant 
app.get('restaurant/:id', function(req, res){
	Restaurant.find({_id: req.params.id}, function(req, res){
		res.render('restaurantInfo', {restaurant: restaurant})
	})
})

// like a restaurant 
app.post('restaurant/:id', function(req, res){
	// increase like count of an individual restaurant
	// put liked restaurant into user favorites so we can take away like button
})

app.listen(process.env.PORT || 3000, () => {
	console.log('|===========listening port 3000===========|')
})