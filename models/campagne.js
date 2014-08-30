var loremipsum = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

var data = {
	'jeanne_2013' : {
		code: 'jeanne_2013',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : null,
			actuelle : "Edition 2013",
			suivante : {code: 'jeanne_2014', libelle: 'Edition 2014'},
		},
		type: 'évenement',
		description: loremipsum,
		previous: null,
		next: {code: 'colloque_la_releve', nom: 'Colloque "La Relève"'}
	},
	'colloque_la_releve' : {
		code: 'colloque_la_releve',
		nom: 'Colloque "La Relève"',
		editions: null,
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'jeanne_2013', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2013"},
		next: {code: 'droles_de_candidats', nom: "De drôles de candidats ..."}
	},
	'droles_de_candidats' : {
		code: 'droles_de_candidats',
		nom: "De drôles de candidats ...",
		editions: null,
		type: 'campagne',
		description: loremipsum,
		previous: {code: 'colloque_la_releve', nom: 'Colloque "La Relève"'},
		next: {code: 'jeanne_2014', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2014"}
	},
	'jeanne_2014' : {
		code: 'jeanne_2014',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : {code: 'jeanne_2013', libelle: 'Edition 2013'},
			actuelle : "Edition 2014",
			suivante : {code: 'jeanne_2015', libelle: 'Edition 2015'},
		},
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'droles_de_candidats', nom: "De drôles de candidats ..."},
		next: {code: 'cmrds_2014', nom: "Camp Maxime Réal del Sarte - Edition 2014"}
	},
	'cmrds_2014' : {
		code: 'cmrds_2014',
		nom: "Camp Maxime Réal del Sarte",
		editions: null,
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'jeanne_2014', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2014"},
		next: {code: 'jeanne_2015', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2015"}
	},
	'jeanne_2015' : {
		code: 'jeanne_2015',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		editions: {
			precedente : {code: 'jeanne_2014', libelle: 'Edition 2014'},
			actuelle : "Edition 2015",
			suivante : null,
		},
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'cmrds_2014', nom: "Camp Maxime Réal del Sarte - Edition 2014"},
		next: null
	}
};

exports.exists = function(code, callback) {
	callback(false, typeof data[code] !== 'undefined');
}

function fetchOne(code, callback) {
	if(typeof data[code] === 'undefined') callback("Code " + code + " introuvable dans les campagnes", undefined);
	else {
		callback(false, data[code]);
	}
}

exports.fetchLatest = function(callback) {
	fetchOne('jeanne_2015', callback);
}

exports.fetchOne = fetchOne;