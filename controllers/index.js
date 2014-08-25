var fs = require('fs');

function get(request, response) {
	fs.readdir(document_root + "/static/slideshow", function(err, files) {
		response.render('index.ejs', {
	    	pageSubtitle: "Accueil",
	    	customStylesheets: ["index"],
	    	articles : articles_demo,
	    	slides : files
	    });
    });
	
}

exports.get = get;