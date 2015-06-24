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
* 0.0.1     2015-05-20   Matteo Furlan      Working version with addRoutingPath
* 0.0.1     2015-05-18   Samuele Zanella    Initial code
* =========================================================
*/

var Express = require('express');

function Routes(exprApp, norrisNamespace, baseURL) {
	if(exprApp===undefined || norrisNamespace===undefined || exprApp.lazyrouter===undefined ||
		typeof norrisNamespace !=='string' || norrisNamespace.length < 1 ||
		norrisNamespace.indexOf('/')!==0) {
		console.log('Error: 911');
		return;
	}
	
	this._baseURL=baseURL;
	this._norrisNamespace = norrisNamespace;
	this._exprApp=exprApp;
	this._exprNorris=null;
    this.addRoutingPath(norrisNamespace,'pageList'); //page is pageList.ejs;
}

Routes.prototype.addRoutingPath = function(namespace, filename) {
	console.log('addRoutingPath \n'+namespace+'\n'+filename);
	if(namespace===undefined || typeof namespace !=='string' || namespace.length < 1 ||
		namespace.indexOf('/')!==0 || filename === undefined || typeof filename !== 'string' ||
		filename.length <= 0) {
		console.log('Error: 912');
		return false;
	}

	var app = Express();
	// set render
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

	var nspNorris=this._norrisNamespace;
	// dynamic baseURL -- commented
	/*var baseURL='';
	var routesObject=this;*/
	var handle = function (req, res) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		if(fullUrl.substring(fullUrl.length-1, fullUrl.length)==='/'){
			fullUrl=fullUrl.slice(0,-1);
		}
		// dynamic baseURL -- commented
		/*baseURL=req.protocol + '://' + req.get('host');
		routesObject._baseURL=baseURL;*/
		var norrisNamespace=req.protocol + '://' + req.get('host')+nspNorris;
		res.render(filename,{fullURL:fullUrl, norrisNamespace : norrisNamespace});
	};
	// set middleware
	app.get('/', handle);
	// set static file directory
	app.use('/',Express.static(__dirname + '/../../frontend/app'));
	
	// routing as 
	if(filename==='pageList'){
		// attach to passed express middleware   XXXX.com/norris
		this._exprApp.use(namespace, app);
		this._exprNorris=app;
	}else{
		// attach to norris express middleware   XXXX.com/norris/page1
		this._exprNorris.use(namespace, app);
	}

	//routing as  XXXX.com/norris
	//            XXXX.com/page1
	// always do
	/* this._exprApp.use(namespace, app); */

	return true;
};

module.exports = Routes;