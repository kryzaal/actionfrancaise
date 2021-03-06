var fs = require('fs');
var model = require("../models/article");

function get(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if(err) send500(response, true, err);
		else if(exists) model.fetchOne(request.params.code, function(err, data) {
			if(err) send500(response, true, err);
			else response.render('article.ejs', {
		        pageSubtitle: data.titre,
		        customStylesheets: ["article"],
		        article: data
		    });
		});
		else send404(response, true);
	});
}
function image(request, response) {
    fs.readFile(document_root + '/data/articles/' + request.params.code + '.jpg', function (err, data) {
        if (err) 
        	fs.readFile(document_root + '/data/articles/fallback.png', function (err, data) {
		        if(err) send500(response, true, err);
		        else {
			        response.writeHead('307', {'Content-Type': 'image/png'});
			        response.end(data, 'binary');
			    }
		    });
    	else {
    		response.writeHead('200', {'Content-Type': 'image/jpg'});
        	response.end(data,'binary');
    	}
    });
}

function list(request, response) {
	model.listCodes(function(err, codes) {
		if(err) send500(response, true, err);
		else {
			response.writeHead('200', {'Content-Type': 'application/json'});
        	response.end(JSON.stringify(codes));
        }
	});
}

function search(request, response) {
	model.listKeywords(function(err, data) {
		if(err) send500(response, true, err);
		else {
			var codes = [];

			data.forEach(function(data) {
				if(data.keywords.indexOf(request.params.query) > -1) 
					codes.push(data.code); 
			});

			response.writeHead('200', {'Content-Type': 'application/json'});
	        response.end(JSON.stringify(codes));
		}
	});
}

function resume(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if(err) send500(response, true, err);
		else if(exists) model.fetchOne(request.params.code, function(err, data) {
			response.render('article_resume.ejs', data);
		});
		else send404(response, false);
	});
}

exports.get = get;
exports.image = image;
exports.list = list;
exports.search = search;
exports.resume = resume;