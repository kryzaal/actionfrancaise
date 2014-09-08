CREATE TABLE comptes (
	nom_utilisateur TEXT PRIMARY KEY,
	code_profil TEXT UNIQUE NOT NULL REFERENCES profils(code),
	adresse_mail TEXT,
	mot_passe TEXT NOT NULL,
	date_creation DATETIME DEFAULT (DATETIME('now'))
);

CREATE TABLE droits_comptes (
	nom_utilisateur TEXT NOT NULL REFERENCES comptes(nom_utilisateur),
	code_droit TEXT NOT NULL REFERENCES droits(code),
	PRIMARY KEY(nom_utilisateur, code_droit)
);

CREATE TABLE droits (
	code TEXT PRIMARY KEY
);

CREATE TABLE profils (
	code TEXT PRIMARY KEY,
	nom TEXT NOT NULL,
	titre TEXT,
	biographie TEXT,
	contactable BOOLEAN NOT NULL DEFAULT '0'
);

CREATE TABLE textes (
	code TEXT PRIMARY KEY,
	profil_auteur TEXT NOT NULL REFERENCES profils(code),
	date_creation DATETIME DEFAULT (DATETIME('now')),
	titre TEXT NOT NULL,
	ss_titre TEXT
);

CREATE TABLE grands_textes (
	code_texte UNIQUE NOT NULL REFERENCES textes(code),
	texte TEXT
);

CREATE TABLE articles (
	code TEXT PRIMARY KEY REFERENCES textes(code),
	categorie TEXT REFERENCES categories(code)
);

CREATE TABLE versions_articles (
	code_article TEXT NOT NULL REFERENCES articles(code),
	date_edition DATETIME DEFAULT (DATETIME('now')),
	compte_editeur TEXT NOT NULL REFERENCES comptes(nom_utilisateur),
	texte TEXT NOT NULL,
	PRIMARY KEY(code_article, date_edition)
);

CREATE TABLE categories (
	code TEXT PRIMARY KEY,
	libelle TEXT NOT NULL
);

CREATE TABLE entites (
	code TEXT PRIMARY KEY,
	nom_court TEXT NOT NULL,
	nom TEXT NOT NULL,
	description TEXT,
	chef_code_profil TEXT NOT NULL REFERENCES profils(code)
);

CREATE TABLE membres_entites (
	code_entite TEXT NOT NULL REFERENCES entites(code),
	code_profil TEXT NOT NULL REFERENCES profils(code),
	PRIMARY KEY(code_entite, code_profil)
);

CREATE TABLE federations (
	code_federation TEXT PRIMARY KEY,
	code_entite TEXT UNIQUE NOT NULL REFERENCES entites(code)
);

CREATE TABLE sections (
	code_section TEXT PRIMARY KEY,
	code_entite TEXT UNIQUE NOT NULL REFERENCES entites(code),
	code_federation TEXT REFERENCES federations(code_federation),
	possede_section_afe BOOLEAN NOT NULL,
	possede_section_af BOOLEAN NOT NULL
);

CREATE TABLE actions (
	code TEXT PRIMARY KEY,
	code_entite_organisatrice TEXT NOT NULL REFERENCES entites(code),
	date_debut DATETIME NOT NULL,
	date_fin DATETIME,
	nom TEXT NOT NULL,
	description TEXT NOT NULL,
	type TEXT NOT NULL REFERENCES types_action(code)
);

CREATE TABLE actions_recurrentes (
	code_action TEXT UNIQUE NOT NULL REFERENCES actions(code),
	code_groupe TEXT NOT NULL,
	rang_action INTEGER NOT NULL,
	nom_edition TEXT NOT NULL,
	PRIMARY KEY(code_groupe, rang_action)
);

CREATE TABLE types_action (
	code TEXT PRIMARY KEY
);