/*CREATE TABLE comptes (
	nom_utilisateur TEXT PRIMARY_KEY,
	code_profil TEXT UNIQUE,
	adresse_mail TEXT,
	mot_passe TEXT NOT NULL,
	date_creation DATE DEFAULT CURRENT_DATE
);

CREATE TABLE droits_2_comptes (
	nom_utilisateur TEXT PRIMARY_KEY,
	code_droit TEXT PRIMARY_KEY
);

CREATE TABLE droits (
	code TEXT PRIMARY_KEY
);

CREATE TABLE profil (
	code TEXT PRIMARY_KEY,
	nom TEXT NOT NULL,
	titre TEXT,
	biographie TEXT
);

CREATE TABLE texte (
	code TEXT PRIMARY_KEY,
	date_creation DATE DEFAULT CURRENT_DATE,
	titre TEXT NOT NULL,
	ss_titre TEXT
);

CREATE TABLE grand_texte (
	code_texte UNIQUE,
	texte TEXT
);

CREATE TABLE article (
	code_article TEXT PRIMARY_KEY,
	code_texte TEXT UNIQUE
);

CREATE TABLE version_article (
	code_article TEXT PRIMARY_KEY,
	version INT PRIMARY_KEY AUTOINCREMENT,
	date_edition DATE DEFAULT CURRENT_DATE,
	texte TEXT NOT NULL
);

CREATE TABLE entite (
	code TEXT PRIMARY_KEY,
	nom_court TEXT NOT NULL,
	nom TEXT NOT NULL,
	description TEXT,
	chef_code_profil TEXT NOT NULL
);

CREATE TABLE membres_entites (
	code_entite TEXT PRIMARY_KEY,
	code_profil TEXT PRIMARY_KEY
);

CREATE TABLE federation (
	code_federation TEXT PRIMARY_KEY,
	code_entite TEXT UNIQUE
);

CREATE TABLE section (
	code_section TEXT PRIMARY_KEY,
	code_entite TEXT UNIQUE,
	code_federation TEXT,
	possede_section_afe BOOLEAN,
	possede_section_af BOOLEAN
);

CREATE TABLE action (
	code TEXT PRIMARY_KEY,
	code_entite_organisatrice TEXT,
	date_debut DATE NOT NULL,
	date_fin DATE,
	nom TEXT NOT NULL,
	description TEXT NOT NULL
	type TEXT NOT NULL
);

CREATE TABLE action_recurrente (
	code_action TEXT UNIQUE,
	code_groupe TEXT PRIMARY_KEY,
	rang_action INTEGER PRIMARY_KEY,
	nom_edition TEXT NOT NULL
);

CREATE TABLE type_action (
	code_type TEXT PRIMARY_KEY
);*/