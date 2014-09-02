var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname . '/data/database.s3db');

db.run("CREATE TABLE lorem (info TEXT)");

exports.db = db;