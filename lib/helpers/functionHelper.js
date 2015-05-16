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
	var operator='==';
	if(array.length!==2){
		array=cond.split('!=');
		operator='!=';
		if(array.length!==2){
			array=cond.split('>=');
			operator='>=';
			if(array.length!==2){
				array=cond.split('<=');
				operator='<=';
				if(array.length!==2){
					array=cond.split('>');
					operator='>';
					if(array.length!==2){
						array=cond.split('<');
						operator='<';
						if(array.length!==2){
							console.log('Error: 701');
							return 701;
						}
					}
				}
			}
		}
	}
	var key=array[0].trim();
	var value=array[1].trim();
	if(key.length===0 || value.length===0){
		console.log('Error: 701');
		return 701;
	}
	return {
		key: module.exports.getCorrectType(key),
		operator: operator,
		value: module.exports.getCorrectType(value)
	};
};
module.exports.converter= function(record,key,format){
	if(record===undefined || record===null || record[key]===undefined){
		console.log('@@@NULL76');
		return null;
	}
	switch(format) {
    case 'toInt':
		record[key]=record[key].replace('\'', '').replace('"', '').trim();
		if(isNaN(record[key])){
			console.log('@@@NULL83'+record[key]);
			return null;
		}
		record[key]=parseInt(record[key],10);
		break;
    case 'toFloat':
		record[key]=record[key].replace('\'', '').replace('"', '').trim();
		if(isNaN(record[key])){
			console.log('@@@NULL91'+record[key]);
			return null;
		}
		record[key]=parseFloat(record[key]);
		break;
    default:
		console.log('@@@DEFAULT'+record[key]);
        return null;
	}
	console.log('@@@RECORD'+record[key]);
	return record;
};
module.exports.isValidFormat= function(format){
	switch(format) {
    case 'toInt':
		break;
    case 'toFloat':
		break;
    default:
        return false;
	}
	return true;
};