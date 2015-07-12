//trata o erro de não encontrar a página solicitada
exports.notFound = function(req, res, next){
	res.status(404).render("not-found");
};

//trata erros internos da aplicação
exports.serverError = function(error, req, res, next){
	res.status(500).render("server-error", {error: error});
};
