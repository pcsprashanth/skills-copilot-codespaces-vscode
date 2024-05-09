// create a web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
            if (err) {
                response.writeHead(404, 'Not Found');
                response.end('Not Found');
                return;
            }
            response.writeHead(200, 'OK');
            response.end(data);
        });
    } else if (pathname === '/comment') {
        var comment = parsedUrl.query;
        comments.push(comment);
        response.writeHead(200, 'OK');
        response.end('OK');
    } else if (pathname === '/getComments') {
        var data = JSON.stringify(comments);
        response.writeHead(200, 'OK');
        response.end(data);
    } else {
        response.writeHead(404, 'Not Found');
        response.end('Not Found');
    }
});
server.listen(8080);
console.log('Server is running at http://localhost:8080/');