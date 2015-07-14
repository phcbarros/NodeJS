var app 	= require('../../app'),
	should	= require('should'),
	request	= require('supertest')(app);

describe('No controller Home', function(){
	
	it('deve retornar status 200 ao fazer GET / ', function(done){
		request.get('/').end(function(err, res){
			res.status.should.eql(200);
			done();			
		});
	});
	
	it('deve ir para a rota / ao fazer GET /sair', function(done){
		request.get('/sair').end(function(err, res){
			res.headers.location.should.eql('/');
			done();
		});
	});
	
	it('deve ir para rota /contatos ao fazer POST /entrar', function(done){
		var login = {
			usuario: {
				nome: 'Teste', 
				email: 'teste@contato.com'
			}
		};
		
		request.post('/entrar')
			.send(login)
			.end(function(err, res){
				res.headers.location.should.eql('/contatos');
				done();
			});
		
	});
	
	it('deve ir para rota / ao fazer POST /entrar', function(done){
		var login = {
			usuario : {
				nome: '',
				email: ''
			}
		};
		
		request.post('/entrar')
			.send(login)
			.end(function(err, res){
				res.headers.location.should.eql('/');
				done();
			});
		
	});
	
});