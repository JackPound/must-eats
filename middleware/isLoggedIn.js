module.exports = function(req, res, next){
	if(!req.user){
		req.flash('error', 'you are not authorized to view this page. please login');
		res.redirect('/account/login');
	}
	else {
		next();
	}
}
