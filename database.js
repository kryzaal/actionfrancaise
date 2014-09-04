var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var sync = require('sync');

var dbPath = document_root + '/data/database.s3db';
var backupPath = document_root + '/data/database.backup.s3db';
var patch_dir = document_root + '/sql/patch/';

var db = new sqlite3.Database(dbPath);

process.on('exit', function(code) {
	db.close();
});

var patchs = [];

function getSchemaVersion() {
	var row = db.get.sync(db, "SELECT value FROM parameters WHERE (key == 'version')", {});

	if(typeof(row) == 'undefined') return 0;
	return parseInt(row.value);
}

function setSchemaVersion(version) {
	return db.run.sync(db, "INSERT OR REPLACE INTO parameters (key, value) VALUES ($key, $value)", {'$key': 'version', '$value': version});
}

function upgradeSchema() {
	if(patchs.length == 0) return;

	var lowestPatch = patchs[0];
	patchs.shift();
	var schema_version = parseInt(lowestPatch.split('.')[0]);
	var current_version = getSchemaVersion();

	if(schema_version - current_version == 1) {
		console.log('Upgrade vers la version du schema ' + schema_version);
		executeSqlFile(patch_dir + lowestPatch);
		setSchemaVersion(current_version + 1);
		upgradeSchema();
	}
	else 
		if(schema_version > current_version) throw "Impossible de passer de la version du schema " + version + " a la version " + schema_version + " : chainon manquant";
}

function executeSqlFile(file) {
	var script = fs.readFileSync(file, {encoding: 'utf-8'});
	var parts = script.replace('\n', ' ').replace('\r', '').replace('\t', '').split(';');

	db.run.sync(db, 'BEGIN TRANSACTION', {});
	parts.forEach(function(part) {
		if(part.trim().length > 0)
			db.run.sync(db, part, {});
	});
	db.run.sync(db, 'COMMIT', {});
}

sync(function() {
	fs.createReadStream(dbPath).pipe(fs.createWriteStream(backupPath));

	patchs = fs.readdirSync(patch_dir);
	patchs.sort();

	db.run.sync(db, "PRAGMA foreign_keys = ON", {});
	db.run.sync(db, "CREATE TABLE IF NOT EXISTS parameters (key TEXT PRIMARY KEY, value TEXT)", {});
	db.run.sync(db, "INSERT OR IGNORE INTO parameters (key, value) VALUES ('version', '0')", {});

	console.log("Version du schéma initiale : " + getSchemaVersion());

	upgradeSchema();

	console.log("Fin de l'initialisation de la base, version du schéma : " + getSchemaVersion());
}, function(err){
    if (err) throw err;
});

exports.db = db;