var Recaptcha = require('recaptcha').Recaptcha;

function check(request, callback) {
	var recaptcha = new Recaptcha(global.recaptcha.publicKey, global.recaptcha.privateKey, {
		remoteip: request.connection.remoteAddress,
		challenge: request.body.recaptcha_challenge_field,
		response: request.body.recaptcha_response_field
	});

	recaptcha.verify(function(success, error_code) {
		callback(success == true ? null : error_code);
	});
}

exports.check = check;