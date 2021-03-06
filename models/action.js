var async = require('async');
var dbHandler = require(document_root + '/database').handler;

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM actions WHERE code == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

function fetchPreviousEdition(code, callback) {
	dbHandler.get("SELECT code_action, nom_edition FROM actions_recurrentes " + 
		"WHERE code_groupe == (SELECT code_groupe FROM actions_recurrentes WHERE code_action == ?) " + 
		"AND rang_action < (SELECT rang_action FROM actions_recurrentes WHERE code_action == ?) " + 
		"ORDER BY rang_action DESC LIMIT 1", [code, code], callback);
}

function fetchNextEdition(code, callback) {
	dbHandler.get("SELECT code_action, nom_edition FROM actions_recurrentes " + 
		"WHERE code_groupe == (SELECT code_groupe FROM actions_recurrentes WHERE code_action == ?) " + 
		"AND rang_action > (SELECT rang_action FROM actions_recurrentes WHERE code_action == ?) " + 
		"ORDER BY rang_action ASC LIMIT 1", [code, code], callback);
}

function fetchPrevious(code, callback) {
	dbHandler.get("SELECT code, nom FROM actions WHERE date_debut < (SELECT date_debut FROM actions WHERE code == ?) " + 
		"ORDER BY date_debut DESC LIMIT 1", code, callback);
}

function fetchNext(code, callback) {
	dbHandler.get("SELECT code, nom FROM actions WHERE date_debut > (SELECT date_debut FROM actions WHERE code == ?) " + 
		"ORDER BY date_debut ASC LIMIT 1", code, callback);
}

function fetchOneWithLinks(fetcher, callback) {
	async.waterfall([
		fetcher,
		function(actionData, parentCallback) {
			async.parallel({
				previousData: function(callback) {
					fetchPrevious(actionData.code, callback);
				},
				nextData: function(callback) {
					fetchNext(actionData.code, callback);
				},
				previousEditionData: function(callback) {
					fetchPreviousEdition(actionData.code, callback);
				},
				nextEditionData: function(callback) {
					fetchNextEdition(actionData.code, callback);
				}
			}, function(err, array) {
				if(err) parentCallback(err);
				else parentCallback(null, actionData, array.previousData, array.nextData, array.previousEditionData, array.nextEditionData);
			});
		},
		function(actionData, previousData, nextData, previousEditionData, nextEditionData, callback) {
			var action = actionData;
			action.previous = previousData;
			action.next = nextData;
			action.editions = false;

			if(actionData['nom_edition']) {
				action.editions = {
					precedente: previousEditionData,
					actuelle: actionData['nom_edition'],
					suivante: nextEditionData
				};
			}

			callback(null, action);
		}
	], callback);
}

function fetchOne(code, callback) {
	dbHandler.get("SELECT actions.*, actions_recurrentes.nom_edition FROM actions " + 
		"INNER JOIN actions_recurrentes ON actions_recurrentes.code_action == actions.code WHERE code == ?", code, callback);
}

function fetchLatest(callback) {
	dbHandler.get("SELECT actions.*, actions_recurrentes.nom_edition FROM actions " + 
		"INNER JOIN actions_recurrentes ON actions_recurrentes.code_action == actions.code ORDER BY actions.date_debut DESC LIMIT 1", {}, callback);
}

exports.fetchLatest = function(callback) {
	fetchOneWithLinks(fetchLatest, callback);
};

exports.fetchOne = function(code, callback) {
	fetchOneWithLinks(function(callback) {
		fetchOne(code, callback);
	}, callback);
};