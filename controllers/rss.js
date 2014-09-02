var RSS = require('rss');
var article_model = require('../models/article.js');
var action_model = require('../models/action.js');

var http_base = "http://" + server + ':' + port;

var feed_builder = {
    title: 'Action Française',
    description: "Flux RSS du site de l'Action Française",
    feed_url: http_base + "/rss/xml",
    site_url: http_base,
    image_url: http_base + "/style/images/favicon.png",
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

function create_action_item(action) {
	return {
		title: action.titre(),
		description: action.description,
		guid: action.code,
		url: http_base + "/actions/" + action.code,
		categories: [action.type],
		date: action.creation,
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
	feed.title += ' - ';

	if(request.query.actions == 'on') {
		feed.title += 'Campagnes, Evenements, ';
		feed.feed_url += 'actions=on,';
		feed.item(create_action_item(action_model.fetchOneSync('jeanne_2013')));
	}

	if(request.query.articles == 'on') {
		feed.title += 'Articles, ';
		feed.feed_url += 'articles=on,';
	}

	if(request.query.visuels == 'on') {
		feed.title += 'Visuels, ';
		feed.feed_url += 'visuels=on,';
	}

	if(request.query.videos == 'on') {
		feed.title += 'Videos, ';
		feed.feed_url += 'videos=on,';
	}

	if(request.query.textes == 'on') {
		feed.title += 'Textes, ';
		feed.feed_url += 'textes=on,';
	}

	feed.feed_url = feed.feed_url.substr(0, feed.feed_url.length - 1);
	feed.title = feed.title.substr(0, feed.title.length - 2);

	response.writeHead('200', {'Content-Type': 'application/xml'});
    response.end(feed.xml());
}

exports.get = get;
exports.xml = xml;

