function get(request, response) {
	response.render('militez_militer.ejs', {
    	pageSubtitle: "Militer à l'AF",
    	customStylesheets: ["militez_militer.css", "militez_tuiles.css"]
    });
}

exports.get = get;