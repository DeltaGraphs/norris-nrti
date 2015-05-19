/*jshint node: true, -W106 */
'use strict';

/*
* Name : norris.js
* Module : Norris
* Location : /lib/businessTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

function Norris(app,server,io,namespace){
	if(app===undefined || server===undefined || io===undefined || namespace===undefined){
		console.log('Error: 521');
		return;
	}
	this._app=app;
	this._server=server;
	this._io=io;
	this._namespace=namespace;
}
Norris.prototype.createPage = function(params) {
	console.log(params);
	//return new Page;
};
Norris.prototype.getData = function() {
	//return JSON;
};
Norris.prototype.pageChanged = function(params) {
	console.log(params);
};
module.exports = Norris;