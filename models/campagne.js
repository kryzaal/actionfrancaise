var data = {
	'jeanne_2014' : {
		code: 'jeanne_2014',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : "jeanne_2013",
			actuelle : "Edition 2014",
			suivante : "jeanne_2015"
		},
		type: 'évenement',
		description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
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