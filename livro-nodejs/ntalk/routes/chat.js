module.exports = function(app){
	var autenticar = require("./../middlewares/autenticator"), 
		chat = app.controllers.chat;
	
	app.get("/chat", autenticar, chat.index);
}