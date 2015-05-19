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


function Routes(app, norrisNamespace) {
	if(app===undefined || norrisNamespace===undefined || typeof norrisNamespace !=='string' || !app.hasOwnProperty('lazyrouter')) {
		return;
	}
	this._app = app;
	this._norrisNamespace = null;
}

Routes.prototype.addRoutingPath = function(namespace, filename) {
	var nspNorris=this.namespaceNorris;
	var handle = function (req, res) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		var norrisNamespace=req.protocol + '://' + req.get('host')+nspNorris;
		res.render(filename,{fullURL:fullUrl, norrisNamespace : norrisNamespace});
	};
	
	this.app.get(namespace, handle);
};

module.exports = Routes;