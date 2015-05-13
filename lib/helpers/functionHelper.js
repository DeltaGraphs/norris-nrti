/*jshint node: true, -W106 */
'use strict';

/*
* Name : functionHelper.js
* Module : FunctionHelper
* Location : /lib/helpers
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

module.exports.isHEX= function(hex){
	return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex));
};
module.exports.parseCondition= function(cond){
	console.dir(cond);
	var array=cond.split('==');
	if(array.length){
		console.log();
	}
	//   <   <=   >   >=   !=   == 
	var key='';
	var operator='';
	var value='';
	return {
		key: key,
		operator: operator,
		value: value
	};
};