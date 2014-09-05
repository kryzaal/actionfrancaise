var fs = require('fs');
var article_model = require('../models/article');
var action_model = require('../models/action');

function get(request, response) {
	fs.readdir(document_root + "/data/slideshow", function(err, files) {
		response.render('index.ejs', {
	    	customStylesheets: ["index", "slideshow"],
	    	slides : files
	    });
    });
}

exports.get = get;