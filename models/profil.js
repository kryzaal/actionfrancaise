var data = {
	stephane_blanchonnet : {
	    code : "stephane_blanchonnet",
	    nom : "Stéphane Blanchonnet",
	    titre : "Président du comité directeur de l'AF"
	},
	olivier_perceval : {
		code : "olivier_perceval",
	    nom : "Olivier Perceval",
	    titre : "Secrétaire général de l'AF"
	},
	elie_hatem : {
		code : "elie_hatem",
	    nom : "Elie Hatem",
	    titre : "Avocat, membre du comité directeur de l'AF"
	},
	michel_bracciali : {
		code : "michel_bracciali",
	    nom : "Michel Bracciali",
	    titre : "Membre du comité directeur de l'AF"
	},
	marie_gabrielle_pujo : {
		code : "marie_gabrielle_pujo",
	    nom : "Marie-Gabrielle Pujo",
	    titre : "Membre du comité directeur de l'AF"
	},
	francois_bel_ker : {
		code : "francois_bel_ker",
	    nom : "François Bel-Ker",
	    titre : "Secrétaire général adjoint de l'AF"
	},
	michel_michel : {
		code : "michel_michel",
	    nom : "Michel Michel",
	    titre : "Sociologue, membre du comité directeur de l'AF"
	},
	michel_franceschetti : {
		code : "michel_franceschetti",
	    nom : "Michel Franceschetti",
	    titre : "Membre du comité directeur de l'AF"
	},
	bernard_bonnaves : {
		code : "bernard_bonnaves",
	    nom : "Bernard Bonnaves",
	    titre : "Membre du comité directeur de l'AF"
	},
	louis_charles_bonnaves : {
		code : "louis_charles_bonnaves",
	    nom : "Louis-Charles Bonnaves",
	    titre : "Membre du bureau politique de l'AF"
	},
};

function object_to_array(object) {
	array = [];
	for( var i in object ) {
	    array.push(object[i]);
	}
	return array;
}

exports.exists = function(code, callback) {
	callback(false, typeof data[code] !== 'undefined');
}

exports.fetchOne = function(code, callback) {
	if(typeof data[code] === 'undefined') callback("Code " + code + " introuvable dans les profils", undefined);
	else callback(false, data[code]);
}