var cluster	= require('cluster'),
	cpus	= require('os').cpus();
	
if(cluster.isMaster){
	
	cpus.forEach(function(cpu){
		cluster.fork(); //instancia um processo filho - cluster slave
	});
	
	//executa quando um cluster está escutando uma porta do servidor
	cluster.on('listening', function(worker){
		console.log('Cluster %d conectado.', worker.process.pid);
	});
	
	//executa quando um cluster se desconecta
	cluster.on('disconnect', function(worker){
		console.log('Cluster %d está desconectado.', worker.process.pid);
	});
	
	//executa quando um cluster é fechado no sistema iperacional
	cluster.on('exit', function(worker){
		console.log('Cluster %d caiu fora.', worker.process.pid);
	});
}
else{
	require('./app');
}