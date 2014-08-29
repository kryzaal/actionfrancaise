var parent = require('./militez/campagnes');
var model = require('../models/campagne');

function get(request, response) {
    parent.tuiles = false;
	parent.get(request, response);
}

exports.get = get;
exports.photo = parent.photo;