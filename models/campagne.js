var data = {
	'jeanne_2014' : {
		code: 'jeanne_2014',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : "jeanne_2013",
			actuelle : "Edition 2014",
			suivante : "jeanne_2015"
		}
	}
};

exports.exists = function(code, callback) {
	callback(false, typeof data[code] !== 'undefined');
}

exports.fetchOne = function(code, callback) {
	if(typeof data[code] === 'undefined') callback("Code " + code + " introuvable dans les campagnes", undefined);
	else callback(false, data[code]);
}