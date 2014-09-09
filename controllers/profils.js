var fs = require('fs');
var model = require("../models/profil");
var texte_model = require("../models/texte");

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
};

function widget(request, response) {
	if(nullOrEmpty(request.params.code)) {
		send404();
		return;
	}

	model.exists(request.params.code, function(err, exists) {
		if (err) throw err;
		if(!exists) {
			send404(response, false);
		} else {
			model.fetchWidget(request.params.code, function(err, data) {
				if (err) throw err;
				response.render('profils_widget.ejs', {
					data: {code: data.code, nom: data.nom, titre: data.titre}
			    });
			});
		}
	});
};

function get(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if (err) throw err;
		if(!exists) {
			send404(response, true);
		} else {
			model.fetchOne(request.params.code, function(err, data) {
				if (err) throw err;

				response.render('profils.ejs', {
					pageSubtitle: data.nom,
    				customStylesheets: ["profils"],
					data: {
						code: data.code, 
						nom: data.nom, 
						titre: data.titre, 
						biographie: data.biographie,
						contactable: data.contactable
					}
			    });
			});
		}
	});
};

function roles(request, response) {
	response.writeHead('200', {'Content-Type': 'application/json'});
	response.end(JSON.stringify([]));
};

function textes(request, response) {
	model.exists(request.params.code, function(err, exists) {
		texte_model.fetchForProfil(request.params.code, function(err, data) {
			if(err) throw err;
			if(!exists) {
				send404(response, true);
			} else {
				response.writeHead('200', {'Content-Type': 'application/json'});
				response.end(JSON.stringify(data));
			}
		});
	});
};

exports.photo = photo;
exports.widget = widget;
exports.get = get;
exports.roles = roles;
exports.textes = textes;
