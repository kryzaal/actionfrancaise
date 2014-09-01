var fs = require('fs');
var model = require("../models/article");

function get(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if(err) throw err;

		if(exists) model.fetchOne(request.params.code, function(err, data) {
			response.render('article.ejs', {
		        pageSubtitle: data.titre,
		        customStylesheets: ["article"],
		        article: data,
		        uri: server + ':' + port + '/article/' + data.id
		    })
		});
	});
};

function image(request, response) {
    fs.readFile(document_root + '/data/articles/' + request.params.code + '.jpg', function (err, data) {
        if (err) 
        	fs.readFile(document_root + '/data/articles/fallback.png', function (err, data) {
		        if (err) throw err;

		        response.writeHead('307', {'Content-Type': 'image/png'});
		        response.end(data, 'binary');
		    });
    	else {
    		response.writeHead('200', {'Content-Type': 'image/jpg'});
        	response.end(data,'binary');
    	}
    });
}

exports.get = get;
exports.image = image;