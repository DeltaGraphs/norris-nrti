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
String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};
module.exports.isHEX= function(hex){
	return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex));
};
module.exports.getCorrectType= function(str){
	var arr=str.split('\'');
	if(arr.length===3){ // is a string 'hello'
		return arr[1];
	}else{
		str=str.replaceAll('\'', '');
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
		return null;
	}
	switch(format) {
    case 'toInt':
		record[key]=record[key].replaceAll('\'', '').replaceAll('"', '').trim();
		if(isNaN(record[key])){
			return null;
		}
		record[key]=parseInt(record[key],10);
		break;
    case 'toFloat':
		record[key]=record[key].replaceAll('\'', '').replaceAll('"', '').trim();
		if(isNaN(record[key])){
			return null;
		}
		record[key]=parseFloat(record[key]);
		break;
    default:
        return null;
	}
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
module.exports.isValidMarker= function(marker){
	switch(marker) {
    case 'none':
		break;
    case 'square':
		break;
	case 'triangle':
		break;
	case 'circle':
		break;
	case 'diamond':
		break;
    default:
        return false;
	}
	return true;
};
module.exports.isValidInterpolation= function(interpolation){
	switch(interpolation) {
    case 'linear':
		break;
    case 'step':
		break;
	case 'basis':
		break;
	case 'cardinal':
		break;
	case 'monotone':
		break;
    default:
        return false;
	}
	return true;
};