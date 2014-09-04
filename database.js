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

exports.db = db;