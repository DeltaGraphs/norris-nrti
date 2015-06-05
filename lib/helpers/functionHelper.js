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
module.exports.isValidMapFormat= function(format){
	switch(format) {
    case 'coordinates':
		break;
    case 'geographic':
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
module.exports.isValidMapMarker= function(marker){
	if (marker!==undefined || typeof marker==='object'){
		if (marker.type!==undefined){
			if (marker.type==='shape' && marker.shape!==undefined){
				switch(marker.shape) {
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
			}
			if (marker.type==='icon' && marker.icon!==undefined && typeof marker.icon==='string'){
				//may check if file exists
				return true;
			}
			if (marker.type==='text' &&
				marker.text!==undefined && typeof marker.text==='string' &&
				marker.color!==undefined && this.isHEX(marker.color)){
				return true;
			}
		}
	}
	return false;
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

module.exports.isValidTrace= function(trace){
	if (trace!==undefined || typeof trace==='object'){
		if (trace.type!==undefined){
			if (trace.type==='none'){
				return true;
			}
			if (trace.type==='area' || trace.type==='poly'){
				if (trace.coordinates!==undefined && Array.isArray(trace.coordinates) && trace.coordinates.length>=2){
					if (trace.strokeColor!==undefined && this.isHEX(trace.strokeColor) ){
						if (trace.fillColor!==undefined && !this.isHEX(trace.fillColor)){
							return false;
						}
						var nCoordinates=trace.coordinates.length;
						for (var i=0; i<nCoordinates; i++){
							if (trace.coordinates[i]===undefined || !Array.isArray(trace.coordinates[i]) || trace.coordinates[i].length!==2){
								return false;
							}
							if (typeof trace.coordinates[i][0]!=='number' || typeof trace.coordinates[i][1]!=='number'){
								return false;
							}
						}
						//every coordinate is valid
						return true;
					}
				}
			}
		}
	}
	return false;
};