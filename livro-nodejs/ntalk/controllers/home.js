module.exports =  function(app) {
	var HomeController = {
		index: function(req, res) {
			res.render('home/index');
		},
		login: function(req, res){
			var email = req.body.usuario.email,
				nome = req.body.usuario.nome,
				usuario = null;
			
			if(email && nome){
				usuario = req.body.usuario;
				usuario["contatos"] = [];
				req.session.usuario = usuario;//criou o objeto usuario na sessão
				res.redirect("/contatos");
			}
			else
				res.redirect("/");
		},
		logout: function(req, res) {
			req.session.destroy();
			res.redirect("/");
		}
	};
	return HomeController;
};