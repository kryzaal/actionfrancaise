var data = {
	'jeanne_2014' : {
		code: 'jeanne_2014',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : "jeanne_2013",
			actuelle : "Edition 2014",
			suivante : "jeanne_2015"
		},
		type: 'Evenement'
	}
};

function object_to_array(object) {
	array = [];
	for( var i in object ) {
	    array.push(object[i]);
	}
	return array;
}

exports.exists = function(code, callback) {
	callback(false, typeof data[code] !== 'undefined');
}

exports.fetchOne = function(code, callback) {
	if(typeof data[code] === 'undefined') callback("Code " + code + " introuvable dans les campagnes", undefined);
	else callback(false, data[code]);
}

exports.fetchLatest = function(callback) {
	var array = object_to_array(data);
	callback(array[array.length - 1]);
}