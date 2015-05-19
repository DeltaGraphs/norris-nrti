/*jshint node: true, -W106 */
'use strict';

/*
* Name : page.js
* Module : Page
* Location : /lib/businessTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

function Page(params,networkHandler,norris){
	if(params===undefined || networkHandler===undefined || norris===undefined){
		console.log('Error: 421');
		return;
	}
	this._networkHandler=networkHandler;
	this._norris=norris;
}
Page.prototype.createPage = function(params) {
	console.log(params);
	//return new Page;
};
Page.prototype.getData = function() {
	//return JSON;
};
Page.prototype.pageChanged = function(params) {
	console.log(params);
};
module.exports = Page;