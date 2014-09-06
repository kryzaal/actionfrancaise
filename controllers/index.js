function get(request, response) {
	response.render('index.ejs', {
    	customStylesheets: ["index", "slideshow"]
    });
}

exports.get = get;