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
var sqlStack = [];

function initDb() {
	fs.createReadStream(dbPath).pipe(fs.createWriteStream(backupPath));

	patchs = fs.readdirSync(patch_dir);
	patchs.sort();

	executeBase(function() {
		getSchemaVersion(function(version) {
			console.log("Version du schéma initiale : " + version);
			
			upgradeSchema(function() {
				getSchemaVersion(function(version) {
					console.log("Fin de l'initialisation de la base, version du schéma : " + version);
				});
			});
		});
	});
}

function executeBase(callback) {
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS parameters (key TEXT PRIMARY KEY, value TEXT)");
		db.run("INSERT OR IGNORE INTO parameters (key, value) VALUES ('version', '0')");
		callback();
	});
}

function getSchemaVersion(callback) {
	db.serialize(function() {
		db.get("SELECT value FROM parameters WHERE (key == 'version')", {}, function(err, row) {
			if(err) throw err;
			if(typeof(row) == 'undefined') row = {value: 0};
			callback(parseInt(row.value));
		});
	});
}

function setSchemaVersion(version, callback) {
	db.serialize(function() {
		db.run("INSERT OR REPLACE INTO parameters (key, value) VALUES ($key, $value)", {'$key': 'version', '$value': version}, function(err) {
			if(err) throw err;
			callback();
		});
	});
}

function upgradeSchema(onFinish) {
	var lowestPatch = patchs[0];
	var schema_version = parseInt(lowestPatch.split('.')[0]);

	getSchemaVersion(function(version) {
		if(schema_version - version == 1) {
			console.log('Upgrade vers la version du schema ' + schema_version);
			executeSqlFile(patch_dir + lowestPatch, function() {
				setSchemaVersion(version + 1, function() {
					patchs.shift();
					upgradeSchema(onFinish);
				});
				
			});
		}
		else 
			if(schema_version > version) throw "Impossible de passer de la version du schema " + version + " a la version " + schema_version + " : chainon manquant";
	});

	if(patchs.length == 0) {
		onFinish();
		return;
	}
}

function executeSqlFile(file, callback) {
	var script = fs.readFileSync(file, {encoding: 'utf-8'});
	var parts = script.replace('\n', ' ').split(';');

	sqlStack.push('BEGIN TRANSACTION');
	parts.forEach(function(part) {
		sqlStack.push(part);
	});
	sqlStack.push('COMMIT');

	callback();
}

initDb();
console.log(JSON.stringify(sqlStack));

exports.db = db;