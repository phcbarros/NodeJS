/// <reference path="typings/jquery/jquery.d.ts" />
var express = require('express'),
	fs 		= require('fs'),
	request = require('request'),
	cheerio	= require('cheerio'),
	app		= express();	
	
//Passo 1
app.get('/raspagem', function(req, res){
	//passo 2
	var url = 'http://www.portaldatransparencia.gov.br/PortalComprasDiretasOEOrgaoSuperior.asp?Ano=2015&Valor=86726995548647&Pagina=1';
	
	request(url, function(error, response, html){
		
		if(error) throw error;
		
		var $ = cheerio.load(html);
		
		//objeto que irá armazenar a tabela
		var resultado = [];
		
		//Passo 3
		//Manipulando o selector específico para montar nossa estrutura
		// Escolhi não selecionar a primeira linha porque faz parte do header da tabela
		$("#listagem tr:not(:first-child)").each(function(i){
			//obtendo as propriedades da tabela
			// O método .trim() garante que irá remover espaço em branco
			var codigo 		= $(this).find('td').eq(0).text().trim(),
				orgao		= $(this).find('td').eq(1).text().trim(),
				valorTotal 	= $(this).find('td').eq(2).text().trim();
				
			//inserindo os dados obtidos no nosso objeto
			resultado.push({
				codigo: codigo,
				orgao: orgao,
				total: valorTotal
			});
		});
		
		fs.writeFile('resulta.json', JSON.stringify(resultado, null, 4), function(err){
			console.log('JSON escrito com sucesso! O Arquivo está na raiz do projeto.');
		});
		
		res.send('Dados raspados com sucesso! Verifique seu node console.')
		
	});
});

app.listen('3000', function(){
	console.log('Executando raspagem de dados na porta 3000...');	
});

exports = module.exports = app;