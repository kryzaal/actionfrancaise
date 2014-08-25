var sections = [
	{
		id: 'bordeaux',
		court: 'Bordeaux',
		complet: 'Action Française Etudiante - Bordeaux',
		image: 'bordeaux.png',
		texte: '#TODO',
		facebook: 'actionfrancaisebordeaux',
		contact: 'bordeaux',
		position: {x: '150', y: '240'}
	},
	{
		id: 'provence',
		court: 'Provence',
		complet: 'Action Française - Provence',
		image: 'provence.png',
		texte: '#TODO',
		facebook: 'afprovence',
		contact: 'provence',
		position : {x: '430', y: '130'}
	},
	{
		id: 'iledefrance',
		court: 'Île de France',
		complet: 'Action Française - Île de France',
		image: 'iledefrance.png',
		texte: '#TODO',
		facebook: 'AFEIleDeFrance',
		contact: 'iledefrance',
		position : {x: '280', y: '460'}
	},
	{
		id: 'annecy',
		court: 'Annecy',
		complet: 'Action Française Etudiante - Annecy',
		image: 'annecy.png',
		texte: '#TODO',
		facebook: '#',
		contact: 'annecy',
		position : {x: '480', y: '320'}
	},
	{
		id: 'clermont',
		court: 'Clermont-Ferrand',
		complet: 'Action Française Etudiante - Clermont-Ferrand',
		image: 'clermont.png',
		texte: '#TODO',
		facebook: 'af.clermont',
		contact: 'clermont',
		position : {x: '340', y: '280'}
	},
	{
		id: 'grenoble',
		court: 'Grenoble',
		complet: 'Action Française Etudiante - Grenoble',
		image: 'grenoble.png',
		texte: '#TODO',
		facebook: 'action.francaise.grenoble',
		contact: 'grenoble',
		position : {x: '480', y: '240'}
	},
	{
		id: 'lyon',
		court: 'Lyon',
		complet: 'Action Française - Lyon',
		image: 'lyon.png',
		texte: '#TODO',
		facebook: 'action.francaise.lyon',
		contact: 'lyon',
		position : {x: '420', y: '290'}
	},
	{
		id: 'nantes',
		court: 'Nantes',
		complet: 'Action Française Etudiante - Nantes',
		image: 'nantes.png',
		texte: '#TODO',
		facebook: 'action.francaise.etudiante.nantes',
		contact: 'nantes',
		position : {x: '120', y: '370'}
	},
	{
		id: 'oise_picardie',
		court: 'Oise-Picardie',
		complet: 'Action Française - Oise-Picardie',
		image: 'oise_picardie.png',
		texte: '#TODO',
		facebook: 'actionfrancaise.oise.picardie',
		contact: 'oise_picardie',
		position : {x: '300', y: '540'}
	},
	{
		id: 'rennes',
		court: 'Rennes',
		complet: 'Action Française Etudiante - Rennes',
		image: 'rennes.png',
		texte: '#TODO',
		facebook: '#',
		contact: 'rennes',
		position : {x: '120', y: '440'}
	},
	{
		id: 'annonay',
		court: 'Annonay',
		complet: 'Action Française - Annonay',
		image: 'annonay.png',
		texte: '#TODO',
		facebook: 'af.annonay',
		contact: 'rennes',
		position : {x: '395', y: '230'}
	},
]; 

function get(request, response) {
	response.render('militez_carte.ejs', {
    	pageSubtitle: "L'AF près de chez moi",
    	customStylesheets: ["militez_carte", "militez_tuiles"],
    	tuiles: true,
    	sections: sections
    });
}

exports.get = get;
exports.sections = sections;