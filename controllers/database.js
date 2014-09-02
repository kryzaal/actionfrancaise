var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname . '/data/database.s3db');
create();

function createIfNeeded() {
	db.run("CREATE TABLE IF NOT EXISTS actions (code TEXT PRIMARY KEY, nom TEXT, )");
}

exports.db = db;

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