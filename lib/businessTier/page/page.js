/*jshint node: true, -W106 */
'use strict';

/*
* Name : page.js
* Module : Page
* Location : /lib/businessTier/page
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

function Page(params,networkHandler,norris){
	if(params===undefined || networkHandler===undefined || norris===undefined || norris instanceof 'Norris'){
		console.log('Error: 421');
		return;
	}
	this._networkHandler=networkHandler;
	this._norris=norris;
}
Page.prototype.getConfigJSON = function() {
	//return JSON;
};
module.exports = Page;