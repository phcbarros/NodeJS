module.exports = function(app){
	
	var db		= require('../lib/db_connect')(),
		Schema 	= require('mongoose').Schema,
		contato	= Schema({
			nome: String,
			email: String
		}),
		usuario	= Schema({
			nome: { type: String, required: true},
			email: {type: String, required: true, index: {unique: true}},
			contatos: [contato]
		});

	return db.model('usuarios', usuario);	
};