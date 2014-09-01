var fs = require('fs');
var model = require("../models/profil");

function photo(request, response) {
    fs.readFile(document_root + '/data/profiles/' + request.params.code + '.jpg', function (err, data) {
        if (err) 
        	fs.readFile(document_root + '/data/profiles/fallback.png', function (err, data) {
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

function get(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if (err) throw err;
		if(!exists) {
			response.writeHead('404');
	        response.end();
		} else {
			model.fetchOne(request.params.code, function(err, data) {
				if (err) throw err;
				response.render('profil.ejs', {
					data: data
			    });
			});
		}
	});
}

exports.photo = photo;
exports.get = get;
