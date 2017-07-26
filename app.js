var http = require('http');

var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8889);


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World!\n');
}).listen(port);


var tools = require('./steps');
console.log(typeof tools.foo);

tools.convertToJson();

//tools.convertToXml('/quote.xml');

//tools.convertToHtml('/quote.html');

console.log('Server running at http://127.0.0.1:'+port);

/*var http=require('http');
var url=require('url');

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/subpage':
            res.end('subpage');
        break;
        default:
            res.end('default');
        break;
    }

}).listen(8080);
*/