function get(request, response) {
	response.render('militez_texte.ejs', {
    	pageSubtitle: texte.titre,
    	customStylesheets: ["militez_texte.css"]
    });
}

exports.get = get;