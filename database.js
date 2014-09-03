var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var dbPath = document_root + '/data/database.s3db';
var backupPath = document_root + '/data/database.backup.s3db';
var patch_dir = document_root + '/sql/patch/';

var db = new sqlite3.Database(dbPath);
process.on('exit', function(code) {
	db.close();
});

var patchs = [];

function initDb() {
	fs.createReadStream(dbPath).pipe(fs.createWriteStream(backupPath));

	patchs = fs.readdirSync(patch_dir);
	patchs.sort();

	executeSqlFile(document_root + '/sql/base.sql', function() {
		getSchemaVersion(function(version) {
			console.log("Version du schéma initiale : " + version);
		});

		upgradeSchema(function() {
			getSchemaVersion(function(version) {
				console.log("Fin de l'initialisation de la base, version du schéma : " + version);
			});
		});
	});
}

function getSchemaVersion(callback) {
	db.get("SELECT value FROM parameters WHERE (key == $key)", {$key: 'version'}, function(err, row) {
		if(err) throw err;
		if(typeof(row) == 'undefined') row = {value: 0};
		callback(parseInt(row.value));
	});
}

function setSchemaVersion(version, callback) {
	db.run("INSERT OR REPLACE INTO parameters (key, value) VALUES ($key, $value)", {$key: 'version', $value: version}, function(err) {
		if(err) throw err;
		callback();
	})
}

function upgradeSchema(onFinish) {
	if(patchs.length == 0) return;
	var lowestPatch = patchs[0];
	patchs.shift();

	var schema_version = parseInt(lowestPatch.split('.')[0]);

	getSchemaVersion(function(version) {
		if(schema_version - version == 1) {
			console.log('Upgrade vers la version du schema ' + schema_version);
			executeSqlFile(patch_dir + lowestPatch, function() {
				setSchemaVersion(version + 1, function() {upgradeSchema(function() {})});
				onFinish();
			});
		}
		else 
			if(schema_version > version) throw "Impossible de passer de la version du schema " + version + " a la version " + schema_version + " : chainon manquant";
	});
}

function executeSqlFile(file, callback) {
	var script = fs.readFileSync(file, {encoding: 'utf-8'});
	db.run(script, {}, function(err) {
		if(err) throw err;
		callback();
	});
}

db.serialize(function() {
	initDb();
});

exports.db = db;