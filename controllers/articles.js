var model = require("../models/article");

function get(request, response) {
	model.exists(request.params.id, function(err, exists) {
		if(err) throw err;

		if(exists) model.fetchOne(request.params.id, function(err, data) {
			response.render('article.ejs', {
		        pageSubtitle: data.titre,
		        customStylesheets: ["article"],
		        article: data,
		        uri: '/article/' + data.id
		    })
		});
	});
};

exports.get = get;