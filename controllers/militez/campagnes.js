function get(request, response) {
	response.render('militez_campagnes.ejs', {
    	pageSubtitle: "Campagnes en cours",
    	customStylesheets: ["militez_campagnes", "militez_tuiles"]
    });
}

exports.get = get;