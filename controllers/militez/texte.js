var model = require(document_root + '/models/grand_texte');

function get(request, response) {
	model.fetchOne(request.params.code, function(err, data) {
		if(err) throw err;

		if(request.accepts("html")) {
			response.render('militez_texte.ejs', {
		    	pageSubtitle: data.titre,
		    	customStylesheets: ["militez_texte", "militez_tuiles"],
		    	data: data
		    });
    	} else { 
    		response.writeHead('200', {'Content-Type': 'application/json'});
			response.end(JSON.stringify(data));
		}
	});
}

exports.get = get;