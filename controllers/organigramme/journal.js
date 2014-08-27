function get(request, response) {
	response.render('organigramme_journal.ejs', {
    	pageSubtitle: "Organigramme du journal",
    	customStylesheets: ["organigramme"]
    });
}

exports.get = get;