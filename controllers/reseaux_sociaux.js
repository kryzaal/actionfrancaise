function facebook(request, response) {
    response.redirect("https://facebook.com/action.francaise.nationale");
}

function twitter(request, response) {
    response.redirect("https://twitter.com/actionfrancaise");
}

function youtube(request, response) {
    response.redirect("https://youtube.com/channel/UCgYqaZrPyWNEIEKOESjc8IA");
}

exports.facebook = facebook;
exports.twitter = twitter;
exports.youtube = youtube;