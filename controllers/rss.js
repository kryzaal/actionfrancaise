function get(request, response) {
	response.render('rss.ejs');
}

function post(request, response) {
	response.render('rss.ejs');
}

exports.get = get;
exports.post = post;
