/*jshint node: true, -W106 */
'use strict';

/*
* Name : socket.js
* Module : Lib::PresentationTier::Routes
* Location : /lib/presentationTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-18   Samuele Zanella    Initial code
* =========================================================
*/

var Express = require('express');

function setAppExpressAndViewEngine(){
	var app = Express();
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(function (req, res, next) {
		console.log('Using the Norris module');
		next();
	});

    return app;
}

function Routes(exprApp, norrisNamespace) {
	if(exprApp===undefined || norrisNamespace===undefined || exprApp.lazyrouter===undefined ||
		typeof norrisNamespace !=='string' || norrisNamespace.length < 1 ||
		norrisNamespace.indexOf('/')!==0) {
		console.log('Error: 911');
		return;
	}
	
	this._norrisNamespace = norrisNamespace;

	this._exprApp=exprApp;

	this._app = setAppExpressAndViewEngine();

    this._app.use('/',Express.static(__dirname + '/../../frontend/app/views'));
    
    this._exprApp.use(this._norrisNamespace, this._app);
    
    console.log('end config routes \n'+ __dirname + '/views'+'  \n'+this._norrisNamespace+'\n'+__dirname + '/../../frontend/app/views');
}

Routes.prototype.addRoutingPath = function(namespace, filename) {
	if(namespace===undefined || typeof namespace !=='string' || namespace.length < 1 ||
		namespace.indexOf('/')!==0 || filename === undefined || typeof filename !== 'string' ||
		filename.length <= 0) {
		console.log('Error: 912');
		return false;
	}
	var nspNorris=this._norrisNamespace;
	var handle = function (req, res) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		var norrisNamespace=req.protocol + '://' + req.get('host')+nspNorris;
		res.render(filename,{fullURL:fullUrl, norrisNamespace : norrisNamespace});
	};
	this._app.get(namespace, handle);
	return true;
};

module.exports = Routes;