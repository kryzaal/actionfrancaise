function get(request, response) {
	response.render('militez_camelots.ejs', {
    	pageSubtitle: "Les Camelots du Roi",
    	customStylesheets: ["militez_camelots.css", "militez_tuiles.css"]
    });
}

exports.get = get;