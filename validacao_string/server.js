/// <reference path="typings/node/node.d.ts"/>
var express 	= require("express"),
	validation 	= require("validator"),
	bodyParser	= require("body-parser"),
	app			= express();
	
app.use(bodyParser.urlencoded({extended: false}));

/* Rotas */
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/form.html");
});

app.post("/validateform", function(req, res) {
	if(!validation.isEmail(req.body.email))
		res.send("Email inválido");
	else if(!validation.isAlpha(req.body.user_name))
		res.send("Nome inválido");
	else
		res.send("Form enviado");
});
	
	
/* Servidor */
app.listen(3000,function(){
    console.log("Servidor rotando na porta 3000");
});