/// <reference path="typings/node/node.d.ts"/>       
var express         = require("express"),
    cfg             = require("./config.json"),
    load            = require("express-load"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    session         = require("express-session"),
    methodOverride  = require("method-override"),
    compression     = require("compression"),
    csurf           = require("csurf"),
    error           = require("./middlewares/error"),
    redisAdapter    = require("socket.io-redis"),
    RedisStore      = require("connect-redis")(session),
    app             = express(),
    server          = require("http").Server(app),
    io              = require("socket.io")(server),
    cookie          = cookieParser(cfg.SECRET),
    store           = new session.MemoryStore();
    
//view engine    
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//configuração dos middlewares
app.disable('x-powered-by'); //desabilita o cabeçalho para não informar o nome do servidor que a aplicação está hospedata
app.use(compression());
app.use(cookie); //incluído primeiro para o session usar o mesmo SessionID que será mantido no cookie
app.use(session({
    secret: cfg.SECRET,
    name: cfg.KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //permite que uma mesma rota seja reaproveitada entre métodos distintos do HTTP
app.use(csurf());
app.use(function(req, res, next){
    //cada requisição realizada por qualquer rota (exceto arquivos estáticos) será gerada uma variável local para as views,
    //isto acontece através do código abaixo
    res.locals._csrf = req.csrfToken();
    next();
});

io.adapter(redisAdapter(cfg.REDIS));
io.use(function(socket, next){
   var data = socket.request; //recupera as informações da requisição (headers, cookies, etc)

   cookie(data, {}, function(err){
       var sessionID = data.signedCookies[cfg.KEY]; //busca o sessionID

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
app.use("/static", express.static(__dirname + '/public', {
    maxAge: cfg.CACHE //milissegundos
}));

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

module.exports = app;