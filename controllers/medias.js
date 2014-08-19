function get(request, response) {
	response.render('medias.ejs', {
    	pageSubtitle: "Médias",
    	customStylesheets: ["medias.css"]
    })
}

exports.get = get;