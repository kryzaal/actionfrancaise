function get(request, response) {
	response.render('militez.ejs', {
    	pageSubtitle: "Militez !",
    	customStylesheets: ["militez.css"]
    });
}

exports.get = get;