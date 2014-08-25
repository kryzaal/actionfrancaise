function get(request, response) {
	response.render('militez_camelots.ejs', {
    	pageSubtitle: "Les Camelots du Roi",
    	customStylesheets: ["militez_camelots", "militez_tuiles"]
    });
}

exports.get = get;