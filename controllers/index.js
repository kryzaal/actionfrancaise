var fs = require('fs');
var article_model = require('../models/article');
var action_model = require('../models/action');

function get(request, response) {
	article_model.fetchAll(function(error, data) {
		var articles = data;

		fs.readdir(document_root + "/data/slideshow", function(err, files) {
			action_model.fetchLatest(function(err, action) {
				response.render('index.ejs', {
			    	customStylesheets: ["index", "slideshow"],
			    	articles : articles,
			    	slides : files,
			    	latestAction : {
			    		type: action.type,
			    		code: action.code
			    	}
			    });
		    });
	    });
	});
}

exports.get = get;