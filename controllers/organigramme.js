function get(request, response) {
	response.render('organigramme.ejs', {
    	pageSubtitle: "Organigramme",
    	customStylesheets: ["organigramme.css"]
    });
}

exports.get = get;