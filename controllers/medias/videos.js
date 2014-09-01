var videos = ["1rC2plTGGBU", "5W-IIoqQHKs", "1jPOX72PPMw", "io3Yk1IGyaA", "e5WxM2qjpBo", "c7lxeFrHh9M", "Gf8oIxqaHRs"];

function list(request, response) {
	response.writeHead('200', {'Content-Type': 'application/json'});
	response.end(JSON.stringify(videos));
}

exports.list = list;