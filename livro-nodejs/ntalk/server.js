var forever	= require('forever-monitor'),
	Monitor	= forever.Monitor,
	child	= new Monitor('clusters.js', {
		max: 1,						//total de vezes que o servidor poderá ser reiniciado
		silent: true,					//oculta a exibição de logs no terminal
		killTree: true,					//todos os processos filhos da aplicação será finalizados a cada restart do servidor
		logFile: 'logs/forever.log', 	//logs do forever
		outFile: 'logs/app.log',		//logs da aplicação
		errFile: 'logs/error.log'		//logs de erros da aplicação
	});
	
child.on('exit', function(){
	console.log('O servidor foi finalizado.');
});

child.start();