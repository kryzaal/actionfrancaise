function insert_profils(handler) {
	var data = [
		{
		    code : "stephane_blanchonnet",
		    nom : "Stéphane Blanchonnet",
		    titre : "Président du comité directeur de l'AF"
		},
		{
			code : "olivier_perceval",
		    nom : "Olivier Perceval",
		    titre : "Membre du comité directeur de l'AF"
		},
		{
			code : "elie_hatem",
		    nom : "Elie Hatem",
		    titre : "Avocat, membre du comité directeur de l'AF"
		},
		{
			code : "michel_bracciali",
		    nom : "Michel Bracciali",
		    titre : "Membre du comité directeur de l'AF"
		},
		{
			code : "marie_gabrielle_pujo",
		    nom : "Marie-Gabrielle Pujo",
		    titre : "Membre du comité directeur de l'AF"
		},
		{
			code : "francois_bel_ker",
		    nom : "François Bel-Ker",
		    titre : "Secrétaire général de l'AF"
		},
		{
			code : "michel_michel",
		    nom : "Michel Michel",
		    titre : "Sociologue, membre du comité directeur de l'AF"
		},
		{
			code : "michel_franceschetti",
		    nom : "Michel Franceschetti",
		    titre : "Membre du comité directeur de l'AF"
		},
		{
			code : "bernard_bonnaves",
		    nom : "Bernard Bonnaves",
		    titre : "Membre du comité directeur de l'AF"
		},
		{
			code : "antoine_desonay",
		    nom : "Antoine Desonay",
		    titre : "Secrétaire général étudiant"
		},
		{
			code : "louis_charles_bonnaves",
		    nom : "Louis-Charles Bonnaves",
		    titre : "Membre du bureau politique de l'AF"
		},
		{
			code : "pierre_marchand",
		    nom : "Pierre Marchand",
		    titre : "Secrétaire général adjoint de l'AF"
		},
		{
			code : "blanche_pupion",
		    nom : "Blanche Pupion",
		    titre : "Assistante"
		},
		{
			code : "odile_veron",
		    nom : "Odile Véron",
		    titre : "Secrétaire"
		},
		{
			code : "marie_suzanne_de_benque_d_agut",
		    nom : "Marie Suzanne de Benque d'Agut",
		    titre : "Secrétaire"
		},
		{
			code : "arnaud_paris",
		    nom : "Arnaud Pâris",
		    titre : "Directeur de la cellule de communication"
		},
		{
			code : "marielle_pujo",
		    nom : "Marielle Pujo",
		    titre : "Directrice de la publication"
		},
		{
			code : "gregoire_dubost",
		    nom : "Grégoire Dubost",
		    titre : "Secrétaire de rédaction - Maquettiste"
		},
		{
			code : "philippe_mesnard",
		    nom : "Philippe Mesnard",
		    titre : "Rédacteur en chef"
		},
		{
			code : "francois_marcilhac",
		    nom : "François Marcilhac",
		    titre : "Directeur politique et éditorialiste"
		}
	];

	var statement = handler.prepare("INSERT OR REPLACE INTO profils(code, nom, titre,	biographie) VALUES (?, ?, ?, ?)");
	data.forEach(function(profil) {
		statement.run(profil.code, profil.nom, profil.titre, "");
	});
	statement.finalize();
}

exports.insert_profils = insert_profils;