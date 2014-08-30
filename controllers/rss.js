var RSS = require('rss');
var article_model = require('../models/article.js');
var campagne_model = require('../models/campagne.js');

var http_base = "http://" + server + ':' + port;

var feed_builder = {
    title: 'Action Française',
    description: "Flux RSS du site de l'Action Française",
    feed_url: http_base + "/rss/xml",
    site_url: http_base,
    image_url: http_base + "/css/images/favicon.png",
    language: 'fr'
};

function create_item() {
	return {
		title: title,
		description: description,
		url: url,
		guid: guid,
		categories: '',
		author: '',
		date: date,
	}
}

function create_campagne_item(campagne) {
	return {
		title: campagne.titre(),
		description: campagne.description,
		guid: campagne.code,
		url: http_base + "/campagnes/" + campagne.code,
		categories: [campagne.type],
		date: campagne.creation,
	}
}

function create_article_item(article) {
	return {
		title: title,
		description: description,
		url: url,
		guid: guid,
		categories: '',
		author: '',
		date: date,
	}
}

function get(request, response) {
	response.render('rss.ejs');
}

function xml(request, response) {
	var feed = new RSS(feed_builder);
	feed.feed_url += '?';

	if(request.query.campagnes == true) {
		feed.feed_url += 'campagnes,';
		feed.item(create_campagne_item(campagne_model.fetchOneSync('jeanne_2013')));
	}

	if(request.query.articles == true) {
		feed.feed_url += 'articles,';
	}

	if(request.query.visuels == true) {
		feed.feed_url += 'visuels,';
	}

	if(request.query.videos == true) {
		feed.feed_url += 'videos,';
	}

	if(request.query.textes == true) {
		feed.feed_url += 'textes,';
	}

	feed.feed_url = feed.feed_url.substr(0, feed.feed_url.length - 1);

	response.writeHead('200', {'Content-Type': 'application/xml'});
    response.end(feed.xml());
}

exports.get = get;
exports.xml = xml;
