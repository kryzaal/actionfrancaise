INSERT OR REPLACE INTO contactable (code, mail, facebook, twitter, youtube ,site) VALUES
('craf', 'contact@actionfrancaise.net', 'action.francaise.nationale', 'actionfrancaise', 'https://www.youtube.com/user/afnational', 'actionfrancaise.net'),
('federation_provence', 'provence@actionfrancaise.net', 'actionfrancaiseprovence', NULL, NULL, 'http://provence.actionfrancaise.net'),
('federation_iledefrance', NULL, 'AFEIleDeFrance', NULL, NULL, NULL),

('section_bordeaux', 'bordeaux.etudiants@actionfrancaise.net', 'actionfrancaisebordeaux', 'AfeBordeaux', 'https://www.youtube.com/channel/UCHuEaJy3lOfSPzdseNvxjQw', 'http://bordeaux.actionfrancaise.net'),
('section_annecy', NULL, NULL, NULL, NULL, NULL),
('section_clermont', NULL, 'af.clermont', NULL, NULL, NULL),
('section_nantes', NULL, 'action.francaise.etudiante.nantes', NULL, NULL, NULL),
('section_rennes', NULL, 'action.francaise.etudiante.rennes', NULL, NULL, NULL),
('section_annonay', NULL, 'af.annonay', NULL, NULL, NULL),
('section_grenoble', NULL, 'action.francaise.grenoble', NULL, NULL, NULL),
('section_lyon', NULL, 'action.francaise.lyon', NULL, NULL, "http://aflyon.com/"),
('section_oise-picardie', NULL, 'actionfrancaise.oise.picardie', NULL, NULL, NULL),
('section_aix-en-provence', NULL, NULL, NULL, NULL, NULL),
('section_marseille', NULL, NULL, NULL, NULL, NULL),
('section_dijon', NULL, NULL, NULL, NULL, NULL),
('section_paris', NULL, NULL, NULL, NULL, NULL),
('section_rambouillet', NULL, NULL, NULL, NULL, NULL),
('section_orleans', NULL, NULL, NULL, NULL, NULL),

('af_marseille', NULL, NULL, NULL, NULL, NULL),
('af_oise-picardie', NULL, NULL, NULL, NULL, NULL),
('af_paris', NULL, NULL, NULL, NULL, NULL),
('af_lyon', NULL, NULL, NULL, NULL, NULL),
('afe_bordeaux', NULL, NULL, NULL, NULL, NULL),
('afe_annecy', NULL, NULL, NULL, NULL, NULL),
('afe_nantes', NULL, NULL, NULL, NULL, NULL),
('afe_rennes', NULL, NULL, NULL, NULL, NULL),
('afe_annonay', NULL, NULL, NULL, NULL, NULL),
('afe_clermont', NULL, NULL, NULL, NULL, NULL),
('afe_grenoble', NULL, NULL, NULL, NULL, NULL),
('afe_paris', NULL, NULL, NULL, NULL, NULL),
('afe_rambouillet', NULL, NULL, NULL, NULL, NULL),
('afe_orleans', NULL, NULL, NULL, NULL, NULL),
('afe_marseille', NULL, NULL, NULL, NULL, NULL),
('afe_aix-en-provence', NULL, NULL, NULL, NULL, NULL);

INSERT OR REPLACE INTO entites (code, nom_court, nom, description, code_contactable) VALUES
('craf', 'CRAF', 'Centre royaliste d''Action Française', '#TODO', 'craf'),
('federation_provence', 'Provence', 'Fédération de Provence', '#TODO', 'federation_provence'),
('federation_iledefrance', 'Île de France', 'Fédération d''Île-de-France', '#TODO', 'federation_iledefrance'),

('section_bordeaux', 'Bordeaux', 'Section de Bordeaux', '#TODO', 'section_bordeaux'),
('section_annecy', 'Annecy', 'Section d''Annecy', '#TODO', 'section_annecy'),
('section_clermont', 'Clermont-Ferrand', 'Section de Clermont-Ferrand', '#TODO', 'section_clermont'),
('section_nantes', 'Nantes', 'Section de Nantes', '#TODO', 'section_nantes'),
('section_rennes', 'Rennes', 'Section de Rennes', '#TODO', 'section_rennes'),
('section_annonay', 'Annonay', 'Section d''Annonay', '#TODO', 'section_annonay'),
('section_grenoble', 'Grenoble', 'Section de Grenoble', '#TODO', 'section_grenoble'),
('section_lyon', 'Lyon', 'Section de Lyon', '#TODO', 'section_lyon'),
('section_oise-picardie', 'Oise-Picardie', 'Section Oise-Picardie', '#TODO', 'section_oise-picardie'),
('section_aix-en-provence', 'Aix-en-Provence', 'Section d''Aix-en-Provence', '#TODO', 'section_aix-en-provence'),
('section_marseille', 'Marseille', 'Section de Marseille', '#TODO', 'section_marseille'),
('section_dijon', 'Dijon', 'Section de Dijon', '#TODO', 'section_dijon'),
('section_paris', 'Paris', 'Section de Paris', '#TODO', 'section_paris'),
('section_rambouillet', 'Rambouillet', 'Section de Rambouillet', '#TODO', 'section_rambouillet'),
('section_orleans', 'Orléans', 'Section d''Orléans', '#TODO', 'section_orleans'),

('af_marseille', 'AF Marseille', 'Action Française - Marseille', '#TODO', 'af_marseille'),
('af_oise-picardie', 'AF Oise-Picardie', 'Action Française - Oise-Picardie', '#TODO', 'af_oise-picardie'),
('af_lyon', 'AF Lyon', 'Action Française - Lyon', '#TODO', 'af_lyon'),
('af_paris', 'AF Paris', 'Action Française - Paris', '#TODO', 'af_paris'),

('afe_bordeaux', 'AFE Bordeaux', 'Action Française Etudiante - Bordeaux', '#TODO', 'afe_bordeaux'),
('afe_annecy', 'AFE Annecy', 'Action Française Etudiante - Annecy', '#TODO', 'afe_annecy'),
('afe_clermont', 'AFE Clermont-Ferrand', 'Action Française Etudiante - Clermont-Ferrand', '#TODO', 'afe_clermont'),
('afe_nantes', 'AFE Nantes', 'Action Française Etudiante - Nantes', '#TODO', 'afe_nantes'),
('afe_rennes', 'AFE Rennes', 'Action Française Etudiante - Rennes', '#TODO', 'afe_rennes'),
('afe_annonay', 'AFE Annonay', 'Action Française Etudiante - Annonay', '#TODO', 'afe_annonay'),
('afe_grenoble', 'AFE Grenoble', 'Action Française Etudiante - Grenoble', '#TODO', 'afe_grenoble'),
('afe_paris', 'AFE Paris', 'Action Française Etudiante - Paris', '#TODO', 'afe_paris'),
('afe_rambouillet', 'AFE Rambouillet', 'Action Française Etudiante - Rambouillet', '#TODO', 'afe_rambouillet'),
('afe_orleans', 'AFE Orléans', 'Action Française Etudiante - Orléans', '#TODO', 'afe_orleans'),
('afe_marseille', 'AFE Marseille', 'Action Française Etudiante - Marseille', '#TODO', 'afe_marseille'),
('afe_aix-en-provence', 'AFE Aix-en-Provence', 'Action Française Etudiante - Aix-en-Provence', '#TODO', 'afe_aix-en-provence');

INSERT OR REPLACE INTO federations (code_federation, code_entite) VALUES
('provence', 'federation_provence'),
('iledefrance', 'federation_iledefrance');

INSERT OR REPLACE INTO sections (code_section, code_entite, code_federation) VALUES
('bordeaux', 'section_bordeaux', NULL),
('annecy', 'section_annecy', NULL),
('clermont', 'section_clermont', NULL),
('nantes', 'section_nantes', NULL),
('rennes', 'section_rennes', NULL),
('annonay', 'section_annonay', NULL),
('grenoble', 'section_grenoble', NULL),
('lyon', 'section_lyon', NULL),
('oise-picardie', 'section_oise-picardie', NULL),
('aix-en-provence', 'section_aix-en-provence', 'provence'),
('marseille', 'section_marseille', 'provence'),
('dijon', 'section_dijon', NULL),
('orleans', 'section_orleans', NULL),
('paris', 'section_paris', 'iledefrance'),
('rambouillet', 'section_rambouillet', 'iledefrance');

INSERT OR REPLACE INTO section_afe (code_section, code_entite) VALUES
('bordeaux', 'afe_bordeaux'),
('annecy', 'afe_annecy'),
('clermont', 'afe_clermont'),
('nantes', 'afe_nantes'),
('rennes', 'afe_rennes'),
('annonay', 'afe_annonay'),
('grenoble', 'afe_grenoble'),
('paris', 'afe_paris'),
('rambouillet', 'afe_rambouillet'),
('orleans', 'afe_orleans'),
('marseille', 'afe_marseille'),
('aix-en-provence', 'afe_aix-en-provence');

INSERT OR REPLACE INTO section_af (code_section, code_entite) VALUES
('marseille', 'af_marseille'),
('oise-picardie', 'af_oise-picardie'),
('paris', 'af_paris'),
('lyon', 'af_lyon');