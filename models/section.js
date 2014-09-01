var data = [
	{
		id: 'bordeaux',
		court: 'Bordeaux',
		complet: 'Action Française Etudiante - Bordeaux',
		texte: '#TODO',
		facebook: 'actionfrancaisebordeaux',
		position: {x: '150', y: '240'}
	},
	{
		id: 'provence',
		court: 'Provence',
		complet: 'Action Française - Provence',
		texte: '#TODO',
		facebook: 'afprovence',
		position : {x: '430', y: '130'}
	},
	{
		id: 'iledefrance',
		court: 'Île de France',
		complet: 'Action Française - Île de France',
		texte: '#TODO',
		facebook: 'AFEIleDeFrance',
		position : {x: '280', y: '460'}
	},
	{
		id: 'annecy',
		court: 'Annecy',
		complet: 'Action Française Etudiante - Annecy',
		texte: '#TODO',
		facebook: '#',
		position : {x: '480', y: '320'}
	},
	{
		id: 'clermont',
		court: 'Clermont-Ferrand',
		complet: 'Action Française Etudiante - Clermont-Ferrand',
		texte: '#TODO',
		facebook: 'af.clermont',
		position : {x: '340', y: '280'}
	},
	{
		id: 'grenoble',
		court: 'Grenoble',
		complet: 'Action Française Etudiante - Grenoble',
		texte: '#TODO',
		facebook: 'action.francaise.grenoble',
		position : {x: '480', y: '240'}
	},
	{
		id: 'lyon',
		court: 'Lyon',
		complet: 'Action Française - Lyon',
		texte: '#TODO',
		facebook: 'action.francaise.lyon',
		position : {x: '420', y: '290'}
	},
	{
		id: 'nantes',
		court: 'Nantes',
		complet: 'Action Française Etudiante - Nantes',
		texte: '#TODO',
		facebook: 'action.francaise.etudiante.nantes',
		position : {x: '120', y: '370'}
	},
	{
		id: 'oise_picardie',
		court: 'Oise-Picardie',
		complet: 'Action Française - Oise-Picardie',
		texte: '#TODO',
		facebook: 'actionfrancaise.oise.picardie',
		position : {x: '300', y: '540'}
	},
	{
		id: 'rennes',
		court: 'Rennes',
		complet: 'Action Française Etudiante - Rennes',
		texte: '#TODO',
		facebook: '#',
		position : {x: '120', y: '440'}
	},
	{
		id: 'annonay',
		court: 'Annonay',
		complet: 'Action Française - Annonay',
		texte: '#TODO',
		facebook: 'af.annonay',
		position : {x: '395', y: '230'}
	},
];

exports.fetchAll = function(callback) {
	callback(false, data);
};

exports.exists = function(value, callback) {
	callback(false, true);
}