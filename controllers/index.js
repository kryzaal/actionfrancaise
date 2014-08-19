function get(request, response) {
	response.render('index.ejs', {
    	pageSubtitle: "Accueil",
    	customStylesheets: ["index.css"],
    	articles : articles_demo
    });
}

exports.get = get;