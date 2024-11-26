//create web server
//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (pathname == '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathname == '/getComment') {
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            res.end(data);
        });
    }
});
server.listen(3000, function() {
    console.log('server is listening on 3000');
});