/*jshint node: true, -W106 */
'use strict';

console.log('Hello World');

var http = require('http');

http.createServer(function (req, res) {
  var html = buildHtml(req);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(80);

function buildHtml(req) {
  var header = '<title>Hello World</title>';
  var body = '<p>Hello World</p>';

  // concatenate header string
  // concatenate body string

  return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};