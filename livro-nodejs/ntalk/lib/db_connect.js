module.exports = function(){
	var mongoose 	= require('mongoose'),
		config		= require('../config'),
		env			= process.env.NODE_ENV || 'development',
		url 		= config.MONGODB[env];
	
	return mongoose.connect(url);
};