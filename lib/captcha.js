var Recaptcha = require('recaptcha').Recaptcha;

var publicKey = '6LcNWPkSAAAAAIkvo3QKCFVMM6Y3ghgRt-umaHGv';
var privateKey = '6LcNWPkSAAAAAJNcyx9ecNtE5CaSiMOTXTCZpe2y';

function check(request, callback) {
	var recaptcha = new Recaptcha(publicKey, privateKey, {
		remoteip: request.connection.remoteAddress,
		challenge: request.body.recaptcha_challenge_field,
		response: request.body.recaptcha_response_field
	});

	recaptcha.verify(function(success, error_code) {
		callback(success == true ? null : error_code);
	});
}

exports.publicKey = publicKey;
exports.check = check;