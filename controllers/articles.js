var auteur_blanchonnet = {
    nom : "Stéphane Blanchonnet",
    titre : "Président du comité directeur de l'AF",
    photo : "auteur_1.jpg"
}

global.articles_demo = [
	{id: 1, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014',  sous_titre: 'Moment de camaraderie et de formation', 
    resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article2.jpg', auteur: auteur_blanchonnet},

	{id: 2, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', 
    resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},

	{id: 3, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article3.jpg', auteur: auteur_blanchonnet},

	{id: 4, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b> A mort la république !      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article5.jpg', auteur: auteur_blanchonnet},

	{id: 5, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article2.jpg', auteur: auteur_blanchonnet},

	{id: 6, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},

	{id: 7, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article3.jpg', auteur: auteur_blanchonnet},

	{id: 8, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},
]; 

function get(request, response) {
	response.render('article.ejs', {
        pageSubtitle: articles_demo[request.params.id].titre,
        customStylesheets: ["article.css"],
        article: articles_demo[request.params.id],
        uri: 'http://' + server + ':' + port + '/article/' + request.params.id
    });
}

exports.get = get;