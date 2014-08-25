function post(request, response) {
	response.render('recherche.ejs', {
        pageSubtitle: "Recherche" + "",
        customStylesheets: ["recherche"]
    });
}

exports.post = post;