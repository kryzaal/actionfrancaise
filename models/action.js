var loremipsum = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

var data = {
	'jeanne_2013' : {
		code: 'jeanne_2013',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		titre: function() { return this.nom + (this.editions ? ' - ' + this.editions.actuelle : '')},
		editions: {
			precedente : null,
			actuelle : "Edition 2013",
			suivante : {code: 'jeanne_2014', libelle: 'Edition 2014'},
		},
		type: 'évenement',
		description: loremipsum,
		previous: null,
		next: {code: 'colloque_la_releve', nom: 'Colloque "La Relève"'},
		creation: new Date('31', '08', '2014', '22', '30', '00')
	},
	'colloque_la_releve' : {
		code: 'colloque_la_releve',
		nom: 'Colloque "La Relève"',
		titre: function() { return nom + (editions ? ' - ' + editions.actelle : '')},
		editions: null,
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'jeanne_2013', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2013"},
		next: {code: 'droles_de_candidats', nom: "De drôles de candidats ..."},
		creation: new Date('31', '08', '2014', '22', '31', '00')
	},
	'droles_de_candidats' : {
		code: 'droles_de_candidats',
		nom: "De drôles de candidats ...",
		titre: function() { return nom + (editions ? ' - ' + editions.actelle : '')},
		editions: null,
		type: 'campagne',
		description: loremipsum,
		previous: {code: 'colloque_la_releve', nom: 'Colloque "La Relève"'},
		next: {code: 'jeanne_2014', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2014"},
		creation: new Date('31', '08', '2014', '22', '32', '00')
	},
	'jeanne_2014' : {
		code: 'jeanne_2014',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		titre: function() { return nom + (editions ? ' - ' + editions.actelle : '')},
		editions: {
			precedente : {code: 'jeanne_2013', libelle: 'Edition 2013'},
			actuelle : "Edition 2014",
			suivante : {code: 'jeanne_2015', libelle: 'Edition 2015'},
		},
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'droles_de_candidats', nom: "De drôles de candidats ..."},
		next: {code: 'jeanne_2015', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2015"},
		creation: new Date('31', '08', '2014', '22', '33', '00')
	},
	'cmrds_2014' : {
		code: 'cmrds_2014',
		nom: "Camp Maxime Réal del Sarte",
		titre: function() { return nom + (editions ? ' - ' + editions.actelle : '')},
		editions: null,
		type: 'cmrds',
		description: loremipsum,
		previous: {code: 'jeanne_2014', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2014"},
		next: {code: 'jeanne_2015', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2015"},
		creation: new Date('31', '08', '2014', '22', '34', '00')
	},
	'jeanne_2015' : {
		code: 'jeanne_2015',
		nom: "Cortège traditionnel de Jeanne d'Arc",
		titre: function() { return nom + (editions ? ' - ' + editions.actelle : '')},
		editions: {
			precedente : {code: 'jeanne_2014', libelle: 'Edition 2014'},
			actuelle : "Edition 2015",
			suivante : null,
		},
		type: 'évenement',
		description: loremipsum,
		previous: {code: 'jeanne_2014', nom: "Cortège traditionnel de Jeanne d'Arc - Edition 2014"},
		next: null,
		creation: new Date('31', '08', '2014', '22', '35', '00')
	}
};

exports.exists = function(code, callback) {
	callback(false, typeof data[code] !== 'undefined');
}

function fetchOne(code, callback) {
	if(typeof data[code] === 'undefined') callback("Code " + code + " introuvable dans les actions", undefined);
	else callback(false, data[code]);
}

function fetchOneSync(code) {
	if(typeof data[code] === 'undefined') throw("Code " + code + " introuvable dans les action");
	else return data[code];
}

exports.fetchLatest = function(callback) {
	fetchOne('jeanne_2015', callback);
}

exports.fetchOne = fetchOne;
exports.fetchOneSync = fetchOneSync;