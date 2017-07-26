var http = require('http');

var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8889);


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World!\n');
}).listen(port);


var tools = require('./steps');
console.log(typeof tools.foo);

tools.convertToJson();

//tools.convertToXml();

console.log('Server running at http://127.0.0.1:'+port);

