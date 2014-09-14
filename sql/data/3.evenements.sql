INSERT OR REPLACE INTO types_action (code) VALUES
('évenement'),
('campagne'),
('cmrds');

INSERT OR REPLACE INTO actions (code, code_entite_organisatrice, date_debut, date_fin, nom, description, type) VALUES
('jeanne_2013', 'craf', '2013-01-01 09:00:00', '2013-01-01 12:00:00', 'Cortège traditionnel de Jeanne d''Arc', '', 'évenement'),
('jeanne_2014', 'craf', '2014-01-01 09:00:00', '2014-01-01 12:00:00', 'Cortège traditionnel de Jeanne d''Arc', '', 'évenement'),
('jeanne_2015', 'craf', '2015-01-01 09:00:00', '2015-01-01 12:00:00', 'Cortège traditionnel de Jeanne d''Arc', '', 'évenement');

INSERT OR REPLACE INTO actions_recurrentes (code_action, code_groupe, rang_action, nom_edition) VALUES
('jeanne_2013', 'cortege_jeanne', 2013, 'Edition 2013'),
('jeanne_2014', 'cortege_jeanne', 2014, 'Edition 2014'),
('jeanne_2015', 'cortege_jeanne', 2015, 'Edition 2015');