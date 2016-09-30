module.exports = function(app, passport, async) {
	
	//DEFAULT
	app.get('/mentions-legales', function(req, res) { require('./controller/page-mentionslegales.js').execute(req, res); });
	app.get('/addtowishlist', function(req, res) { require('./controller/page-addtowishlist.js').execute(req, res); });
	app.get('/:firstname', function(req, res) { require('./controller/page-firstname.js').execute(req, res); });
	
	app.get('/', function(req, res) { require('./controller/page-home.js').execute(req, res); });
	app.post('/', function(req, res) { require('./controller/page-home.js').search(req, res); });
	
	app.use(function(req, res, next){
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Page introuvable !');
	});
};