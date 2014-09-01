var fs = require('fs');
var article_model = require('../models/article');
var campagne_model = require('../models/campagne');

function get(request, response) {
	article_model.fetchAll(function(error, data) {
		var articles = data;

		fs.readdir(document_root + "/static/slideshow", function(err, files) {
			campagne_model.fetchLatest(function(err, campagne) {
				response.render('index.ejs', {
			    	customStylesheets: ["index", "slideshow"],
			    	articles : articles,
			    	slides : files,
			    	latestCampagne : {
			    		type: campagne.type,
			    		code: campagne.code
			    	}
			    });
		    });
	    });
	});
}

exports.get = get;