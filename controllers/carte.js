function get(request, response) {
	response.render('carte.ejs', {
    	pageSubtitle: "L'AF près de chez moi",
    	customStylesheets: ["carte.css"]
    });
}

exports.get = get;