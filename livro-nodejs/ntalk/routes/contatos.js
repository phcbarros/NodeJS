module.exports = function(app) {
	var autenticar 	= require("./../middlewares/autenticator"),	//recupera o middleware de autentificação
		contatos 	= app.controllers.contatos; 					//recupera o controller contato
	
	app.get("/contatos", autenticar, contatos.index); 			//chama o filtro autenticar e depois a action index 
	app.get("/contato/:id", autenticar, contatos.show); 		//chama o filtro autenticar e depois a action show (consulta o contato)
	app.post("/contato", autenticar, contatos.create); 			//chama o filtro autenticar e depois a action create (cadastra o contato)
	app.get("/contato/:id/editar", autenticar, contatos.edit);	//chama o filtro autenticar e depois a action edit (recupera os dados do contato)
	app.put("/contato/:id", autenticar, contatos.update);		//chama o filtro autenticar e depois a action update (salva os dados editado)
	app.delete("/contato/:id", autenticar, contatos.destroy);	//chama o filtro autenticar e depois a action destoy (deleta o contato);
};