function get(request, response) {
	response.render('militez_textes.ejs', {
    	pageSubtitle: "Grands textes",
    	customStylesheets: ["militez_textes.css", "militez_tuiles.css"]
    });
}

exports.get = get;