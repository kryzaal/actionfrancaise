function get(request, response) {
	response.render('militez_militer.ejs', {
    	pageSubtitle: "Militer à l'AF",
    	customStylesheets: ["militez_militer", "militez_tuiles"]
    });
}

exports.get = get;