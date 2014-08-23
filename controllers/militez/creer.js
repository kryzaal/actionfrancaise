function get(request, response) {
	response.render('militez_creer.ejs', {
    	pageSubtitle: "Créer une section",
    	customStylesheets: ["militez_creer.css"]
    });
}

exports.get = get;