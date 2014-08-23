function get(request, response) {
	response.render('organigramme_craf.ejs', {
    	pageSubtitle: "Organigramme du CRAF",
    	customStylesheets: ["organigramme.css"]
    });
}

exports.get = get;