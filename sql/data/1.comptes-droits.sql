INSERT OR REPLACE INTO comptes (nom_utilisateur, code_profil, adresse_mail, mot_passe) VALUES
('kryzaal', 'administrateur', 'enzo.sandre@gmail.com', 'af89ba6b2d371a201d19ab38add44826810fea9bb924cc8d99c7721c948f0ee7');

INSERT OR REPLACE INTO droits (code) VALUES
('usurpation'),
('connexion');

INSERT OR REPLACE INTO droits_comptes (nom_utilisateur, code_droit) VALUES
('kryzaal', 'connexion'),
('kryzaal', 'usurpation');