var fs = require('fs');
var model = require("../models/profil");
var texte_model = require("../models/texte");

function photo(request, response) {
    fs.readFile(document_root + '/data/profiles/' + request.params.code + '.jpg', function (err, data) {
        if (err) 
        	fs.readFile(document_root + '/data/profiles/fallback.png', function (err, data) {
		        if (err) send500(response, false, err);
		        else {
		        	response.writeHead('307', {'Content-Type': 'image/png'});
		        	response.end(data, 'binary');
		        }
		    });
    	else {
    		response.writeHead('200', {'Content-Type': 'image/jpg'});
        	response.end(data, 'binary');
    	}
    });
}
function widget(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if (err) send500(response, false, err);
		else if(!exists) send404(response, false);
		else model.fetchWidget(request.params.code, function(err, data) {
			if (err) send500(response, false, err);
			else response.render('profils_widget.ejs', { data: data });
		});
	});
}
function get(request, response) {
	var acceptsHtml = request.accepts("html");
	model.exists(request.params.code, function(err, exists) {
		if (err) send500(response, acceptsHtml, err);
		else if(!exists) send404(response, acceptsHtml);
		else model.fetchOne(request.params.code, function(err, data) {
			if (err) send500(response, acceptsHtml, err);
		    else if(acceptsHtml) {
				response.render('profils.ejs', {
					pageSubtitle: data.nom,
    				customStylesheets: ["profils"],
					data: data
			    });
	    	} else { 
	    		response.writeHead('200', {'Content-Type': 'application/json'});
				response.end(JSON.stringify(data));
			}
		});
	});
}
function roles(request, response) {
	response.writeHead('200', {'Content-Type': 'application/json'});
	response.end(JSON.stringify([]));
}
function textes(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if(err) send500(response, false, err);
		if(!exists) send404(response, false);
		else texte_model.fetchForProfil(request.params.code, function(err, data) {
			if(err) send500(response, false, err);
			else {
				response.writeHead('200', {'Content-Type': 'application/json'});
				response.end(JSON.stringify(data));
			}
		});
	});
}
exports.photo = photo;
exports.widget = widget;
exports.get = get;
exports.roles = roles;
exports.textes = textes;
