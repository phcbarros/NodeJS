/// <reference path="typings/node/node.d.ts"/>
var KEY             = "ntalk.sid",
    SECRET          = "ntalk";
        
var express         = require("express"),
    load            = require("express-load"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    session         = require("express-session"),
    methodOverride  = require("method-override"),
    error           = require("./middlewares/error"),
    app             = express(),
    server          = require("http").Server(app),
    io              = require("socket.io")(server),
    cookie          = cookieParser(SECRET),
    store           = new session.MemoryStore();
    
//view engine    
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//configuração dos middlewares
app.use(cookie); //incluído primeiro para o session usar o mesmo SessionID que será mantido no cookie
app.use(session({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //permite que uma mesma rota seja reaproveitada entre métodos distintos do HTTP

io.use(function(socket, next){
   var data = socket.request; //recupera as informações da requisição (headers, cookies, etc)

   cookie(data, {}, function(err){
       var sessionID = data.signedCookies[KEY]; //busca o sessionID

       //busca os dados da sessão que estão na memória
       store.get(sessionID, function(err, session){
            if(err || !session)
                return next(new Error('Acesso negado'));
            else{
                socket.handshake.session = session; //seta a sessão
                return next();
            }
       });
   }); 
});

//arquivos estáticos
app.use("/static", express.static(__dirname + '/public'));

//carregando as dependencias do projeto
load("models")
    .then("controllers")
    .then("routes")
    .into(app);
    
//carrega as dependencias do io
load('sockets')
    .into(io);

//tratamento de erros
app.use(error.notFound);
app.use(error.serverError);

//servidor
server.listen(3000, function() {
    console.log("Ntalk no ar");
});