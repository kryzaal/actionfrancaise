exports.get = function(request, response) {
    response.render('militez_creer.ejs.ejs', {
        customStylesheets: ["formulaire"]
    });
};