require('dotenv').config();
const bodyParser       = require('body-parser');
const express          = require('express');
const expressLayouts   = require('express-ejs-layouts');
const flash            = require('connect-flash')
const mongoose         = require('mongoose');
const passport		   = require('./config/passportConfig');
const session 	       = require('express-session');
const isLoggedIn       = require('./middleware/isLoggedIn');
const User             = require('./models/user')

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
app.get('/', function(req,res){
	res.render('what')
})

app.listen(process.env.PORT || 3000, () => {
	console.log('|===========listening port 3000===========|')
})