var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var sync = require('sync');

var patch_dir = document_root + '/sql/patch/';
var sql_dir = document_root + '/sql/data/';

function getSchemaVersion() {
	var row = handler.get.sync(handler, "SELECT value FROM parameters WHERE (key == 'version')", {});

	if(typeof(row) == 'undefined') return 0;
	return parseInt(row.value);
}

function setSchemaVersion(version) {
	return handler.run.sync(handler, "INSERT OR REPLACE INTO parameters (key, value) VALUES ($key, $value)", {'$key': 'version', '$value': version});
}

function upgradeSchema(patchs) {
	if(patchs.length == 0) return;

	var lowestPatch = patchs[0];
	patchs.shift();
	var schema_version = parseInt(lowestPatch.split('.')[0]);
	var current_version = getSchemaVersion();

	if(schema_version - current_version == 1) {
		console.log('Upgrade vers la version du schema ' + schema_version);
		executeSqlFile(patch_dir + lowestPatch);
		setSchemaVersion(current_version + 1);
		upgradeSchema(patchs);
	}
	else 
		if(schema_version > current_version) throw "Impossible de passer de la version du schema " + version + " a la version " + schema_version + " : chainon manquant";
}

function executeSqlFile(file) {
	var script = fs.readFileSync(file, {encoding: 'utf-8'});
	var parts = script.replace('\n', ' ').replace('\r', '').replace('\t', '').split(';');

	handler.run.sync(handler, 'BEGIN TRANSACTION', {});
	parts.forEach(function(part) {
		if(part.trim().length > 0)
			handler.run.sync(handler, part, {});
	});
	handler.run.sync(handler, 'COMMIT', {});
}

function init() {
	sync(function() {
		var patchs = fs.readdirSync(patch_dir);
		patchs.sort();
 
		handler.run.sync(handler, 'PRAGMA encoding = "UTF-8"', {});
		handler.run.sync(handler, "PRAGMA foreign_keys = ON", {});
		handler.run.sync(handler, "CREATE TABLE IF NOT EXISTS parameters (key TEXT PRIMARY KEY, value TEXT)", {});
		handler.run.sync(handler, "INSERT OR IGNORE INTO parameters (key, value) VALUES ('version', '0')", {});

		console.log("Version du schéma initiale : " + getSchemaVersion());

		upgradeSchema(patchs);

		console.log("Fin de l'initialisation de la base, version du schéma : " + getSchemaVersion());

		if(isDevelopment) {
			fs.readdirSync(sql_dir).forEach(function(file) {
				executeSqlFile(sql_dir + file)
			});
		}
	}, function(err){
	    if (err) {
	    	throw err;
	    }
	});
}

var handler = new sqlite3.Database(document_root + '/data/database.s3db');

exports.init = init;
exports.handler = handler;
exports.finalize = exports.handler.close;