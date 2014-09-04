CREATE TABLE comptes (
	nom_utilisateur TEXT PRIMARY KEY,
	code_profil TEXT UNIQUE,
	adresse_mail TEXT,
	mot_passe TEXT NOT NULL,
	date_creation DATE DEFAULT CURRENT_DATE
);

CREATE TABLE droits_2_comptes (
	nom_utilisateur TEXT,
	code_droit TEXT,
	PRIMARY KEY(nom_utilisateur, code_droit)
);

CREATE TABLE droits (
	code TEXT PRIMARY KEY
);

CREATE TABLE profil (
	code TEXT PRIMARY KEY,
	nom TEXT NOT NULL,
	titre TEXT,
	biographie TEXT
);

CREATE TABLE texte (
	code TEXT PRIMARY KEY,
	date_creation DATE DEFAULT CURRENT_DATE,
	titre TEXT NOT NULL,
	ss_titre TEXT
);

CREATE TABLE grand_texte (
	code_texte UNIQUE,
	texte TEXT
);

CREATE TABLE article (
	code_article TEXT PRIMARY KEY,
	code_texte TEXT UNIQUE
);

CREATE TABLE version_article (
	code_article TEXT,
	date_edition DATE DEFAULT CURRENT_DATE,
	texte TEXT NOT NULL,
	PRIMARY KEY(code_article, date_edition)
);

CREATE TABLE entite (
	code TEXT PRIMARY KEY,
	nom_court TEXT NOT NULL,
	nom TEXT NOT NULL,
	description TEXT,
	chef_code_profil TEXT NOT NULL
);

CREATE TABLE membres_entites (
	code_entite TEXT,
	code_profil TEXT,
	PRIMARY KEY(code_entite, code_profil)
);

CREATE TABLE federation (
	code_federation TEXT PRIMARY KEY,
	code_entite TEXT UNIQUE
);

CREATE TABLE section (
	code_section TEXT PRIMARY KEY,
	code_entite TEXT UNIQUE,
	code_federation TEXT,
	possede_section_afe BOOLEAN,
	possede_section_af BOOLEAN
);

CREATE TABLE action (
	code TEXT PRIMARY KEY,
	code_entite_organisatrice TEXT,
	date_debut DATE NOT NULL,
	date_fin DATE,
	nom TEXT NOT NULL,
	description TEXT NOT NULL,
	type TEXT NOT NULL
);

CREATE TABLE action_recurrente (
	code_action TEXT UNIQUE,
	code_groupe TEXT,
	rang_action INTEGER ,
	nom_edition TEXT NOT NULL,
	PRIMARY KEY(code_groupe, rang_action)
);

CREATE TABLE type_action (
	code_type TEXT PRIMARY KEY
);