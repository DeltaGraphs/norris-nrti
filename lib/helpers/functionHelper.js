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
module.exports.getCorrectType= function(str){
	var arr=str.split('\'');
	if(arr.length===3){ // is a string 'hello'
		return arr[1];
	}else{
		str=str.replace('\'', '');
		if(isNaN(str)){ // is a malformed string 'hello
			return str;
		}else{ // is a number -2.948
			return parseFloat(str);
		}
	}
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
							console.log('Error: 701');
							return 701;
						}
					}
				}
			}
		}
	}
	var key=array[0].trim();
	var value=array[2].trim();
	return {
		key: module.exports.getCorrectType(key),
		operator: array[1].trim(),
		value: module.exports.getCorrectType(value)
	};
};