/// <reference path="typings/node/node.d.ts"/>
var express         = require("express"),
    load            = require("express-load"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    session         = require("express-session"),
    methodOverride  = require("method-override"),
    error           = require("./middlewares/error"),
    app             = express();

//view engine    
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//configuração dos middlewares
app.use(cookieParser("ntalk")); //incluído primeiro para o session usar o mesmo SessionID que será mantido no cookie
app.use(session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //permite que uma mesma rota seja reaproveitada entre métodos distintos do HTTP

//arquivos estáticos
app.use("/static", express.static(__dirname + '/public'));

//carregando as dependencias do projeto
load("models")
    .then("controllers")
    .then("routes")
    .into(app);
    
//tratamento de erros
app.use(error.notFound);
app.use(error.serverError);

//servidor
app.listen(3000, function() {
    console.log("Ntalk no ar");
});