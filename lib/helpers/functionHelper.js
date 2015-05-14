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
	//   <   <=   >   >=   !=   == 
	// splitting string
	var array=cond.split('==');
	if(array.length!==3){
		array=cond.split('!=');
		if(array.length!==3){
			array=cond.split('>=');
			if(array.length!==3){
				array=cond.split('<=');
				if(array.length!==3){
					array=cond.split('>');
					if(array.length!==3){
						array=cond.split('<');
						if(array.length!==3){
							return 701;
						}
					}
				}
			}
		}
	}
	// test typeof key operator and value??
	return {
		key: array[0].trim(),
		operator: array[1].trim(),
		value: array[2].trim()
	};
};