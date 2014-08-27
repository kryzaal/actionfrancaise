var fs = require('fs');
var article_model = require('../models/article');

function get(request, response) {
	article_model.fetchAll(function(error, data) {
		var articles = data;

		fs.readdir(document_root + "/static/slideshow", function(err, files) {
			response.render('index.ejs', {
		    	pageSubtitle: "Accueil",
		    	customStylesheets: ["index", "slideshow"],
		    	articles : articles,
		    	slides : files
		    });
	    });
	});
}

exports.get = get;