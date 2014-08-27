function get(request, response) {
	response.render('organigramme_craf.ejs', {
    	pageSubtitle: "Organigramme du CRAF",
    	customStylesheets: ["organigramme"]
    });
}

exports.get = get;