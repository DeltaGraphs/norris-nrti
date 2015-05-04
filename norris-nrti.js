/*jshint node: true, -W106 */
'use strict';

console.log('Hello World');

var http = require('http');

http.createServer(function (req, res) {
  var html = buildHtml();

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(80);

function buildHtml() {
	return '<!DOCTYPE html><html><header><title>Hello World</title></header><body><p>Hello World</p></body></html>';
}