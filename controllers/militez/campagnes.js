function get(request, response) {
	response.render('militez_campagnes.ejs', {
    	pageSubtitle: "Campagnes en cours",
    	customStylesheets: ["militez_campagnes.css", "militez_tuiles.css"]
    });
}

exports.get = get;