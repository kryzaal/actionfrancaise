function get(request, response) {
	response.render('militez_cmrds.ejs', {
    	pageSubtitle: "Camp Maxime Real del Sarte",
    	customStylesheets: ["militez_cmrds.css", "militez_tuiles.css"]
    });
}

exports.get = get;