function get(request, response) {
	response.render('manifeste.ejs', {
    	pageSubtitle: "Manifeste",
    	customStylesheets: ["manifeste.css"]
    });
}

exports.get = get;