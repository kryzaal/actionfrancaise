var model = require(document_root + '/models/grand_texte');

function get(request, response) {
	response.render('militez_textes.ejs', {
    	pageSubtitle: "Grands Textes",
    	customStylesheets: ["militez_textes", "militez_tuiles"]
    });
}

function filter(request, response) {
	model.listKeywords(function(err, data) {
		if(err) throw err;
		var codes = [];

		data.forEach(function(data) {
			if(data.keywords.indexOf(request.params.query) > -1) 
				codes.push(data.code); 
		});

		response.writeHead('200', {'Content-Type': 'application/json'});
        response.end(JSON.stringify(codes));
	});
}

function list(request, response) {
	model.list_codes(function(err, codes) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
        response.end(JSON.stringify(codes));
	});
}

exports.get = get;
exports.list = list;
exports.filter = filter;