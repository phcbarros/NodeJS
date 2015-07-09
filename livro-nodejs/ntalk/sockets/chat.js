module.exports = function(io){
	
	var crypto 	= require('crypto'),
		sockets = io.sockets,
		onlines	= {};
		
	sockets.on('connection', function(client){
		var session = client.handshake.session, //recupera a sessão
			usuario = session.usuario;			//recupera o usuário da sessão
		
		onlines[usuario.email] = usuario.email; //adiciona o email do usuário nos usuarios online
				
		for(var email in onlines){
			client.emit('notify-onlines', email);			//notifica o usuario
			client.broadcast.emit('notify-onlines', email); //notifica todos que o usuário está online
		}
		
		//fica ouvindo se o cliente enviou alguma mensagem para o servidor
		client.on('send-server', function(msg){
			var sala 	= session.sala,
				data	= {usuario: usuario, sala: sala};
				
			msg = "<b>" + usuario.nome + ":</b> " + msg + "<br/>";
         	
			client.broadcast.emit("new-message", data);//usado para atualizar a url do botão conversar do contato que receber uma mensagem  
			sockets.in(sala).emit('send-client', msg); //envia a mensagem para todos os usuários que estão na sala
			
			
			//client.emit("send-client", msg);           //envia mensagens para o cliente ou o servidor
         	//client.broadcast.emit("send-client", msg)  //envia mensagens para todos os clientes, exceto o próprio emissor
		});
		
		//fica ouvindo se o cliente entrou na tela do chat
		client.on("join", function(sala){
			
			if(!sala){
				var timestamp 	= new Date().toString(),
					md5			= crypto.createHash('md5');
					
				sala = md5.update(timestamp).digest('hex');
			}
			
			session.sala = sala;
			client.join(sala);
		});
		
		//fica ouvindo se o client saiu da tela do chat
		client.on('disconect', function(){
			var sala 	= session.sala,
				msg		= "<b>" + usuario.nome + "</b> saiu.<br/>";
				
			client.broadcast.emit('notify-offlines', usuario.email);
			client.in(sala).emit('send-client', msg);
			delete onlines[usuario.email];
			client.leave(sala);
		});
	});
}