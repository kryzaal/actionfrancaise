var sections = [
	{
		id: 'bordeaux',
		court: 'Bordeaux',
		complet: 'Action Française Etudiante - Bordeaux',
		image: 'bordeaux.png',
		texte: '#TODO',
		facebook: 'actionfrancaisebordeaux',
		contact: 'bordeaux',
		position: {x: '100', y: '250'}
	},
	{
		id: 'provence',
		court: 'Provence',
		complet: 'Action Française - Provence',
		image: 'provence.png',
		texte: '#TODO',
		facebook: 'afprovence',
		contact: 'provence',
		position : {x: '300', y: '150'}
	},
	{
		id: 'iledefrance',
		court: 'Île de France',
		complet: 'Action Française - Île de France',
		image: 'iledefrance.png',
		texte: '#TODO',
		facebook: 'AFEIleDeFrance',
		contact: 'iledefrance',
		position : {x: '70', y: '480'}
	},
	{
		id: 'annecy',
		court: 'Annecy',
		complet: 'Action Française Etudiante - Annecy',
		image: 'annecy.png',
		texte: '#TODO',
		facebook: '#',
		contact: 'annecy',
		position : {x: '150', y: '340'}
	},
	{
		id: 'clermont',
		court: 'Clermont-Ferrand',
		complet: 'Action Française Etudiante - Clermont-Ferrand',
		image: 'clermont.png',
		texte: '#TODO',
		facebook: 'af.clermont',
		contact: 'clermont',
		position : {x: '-85', y: '300'}
	},
	{
		id: 'grenoble',
		court: 'Grenoble',
		complet: 'Action Française Etudiante - Grenoble',
		image: 'grenoble.png',
		texte: '#TODO',
		facebook: 'action.francaise.grenoble',
		contact: 'grenoble',
		position : {x: '5', y: '260'}
	},
	{
		id: 'lyon',
		court: 'Lyon',
		complet: 'Action Française - Lyon',
		image: 'lyon.png',
		texte: '#TODO',
		facebook: 'action.francaise.lyon',
		contact: 'lyon',
		position : {x: '265', y: '395'}
	},
	{
		id: 'nantes',
		court: 'Nantes',
		complet: 'Action Française Etudiante - Nantes',
		image: 'nantes.png',
		texte: '#TODO',
		facebook: 'action.francaise.etudiante.nantes',
		contact: 'nantes',
		position : {x: '-100', y: '500'}
	},
	{
		id: 'oise_picardie',
		court: 'Oise-Picardie',
		complet: 'Action Française - Oise-Picardie',
		image: 'oise_picardie.png',
		texte: '#TODO',
		facebook: 'actionfrancaise.oise.picardie',
		contact: 'oise_picardie',
		position : {x: '-10', y: '640'}
	},
	{
		id: 'rennes',
		court: 'Rennes',
		complet: 'Action Française Etudiante - Rennes',
		image: 'rennes.png',
		texte: '#TODO',
		facebook: '#',
		contact: 'rennes',
		position : {x: '-300', y: '550'}
	},
]; 

function get(request, response) {
	response.render('militez_carte.ejs', {
    	pageSubtitle: "L'AF près de chez moi",
    	customStylesheets: ["militez_carte.css", "militez_tuiles.css"],
    	tuiles: true,
    	sections: sections
    });
}

exports.get = get;
exports.sections = sections;