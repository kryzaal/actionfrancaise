function post(request, response) {
	response.render('recherche.ejs', {
        pageSubtitle: "Recherche" + "",
        customStylesheets: ["recherche.css"]
    });
}

exports.post = post;