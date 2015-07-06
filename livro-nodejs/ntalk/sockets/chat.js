module.exports = function(io){
	
	var sockets = io.sockets;
		
	sockets.on('connection', function(client){
		var session = client.handshake.session, //recupera a sessão
			usuario = session.usuario;			//recupera o usuário da sessão

		client.on('send-server', function(data){
			
			var msg = "<b>" + usuario.nome + ":</b> " + data.msg + "<br/>";
         	
			client.emit("send-client", msg);           //envia mensagens para o cliente ou o servidor
         	client.broadcast.emit("send-client", msg)  //envia mensagens para todos os clientes, exceto o próprio emissor
		});
	});
}