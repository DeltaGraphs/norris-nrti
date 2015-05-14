/*jshint node: true, -W106 */
'use strict';

/*
* Name : filterConditionModel.js
* Module : Lib::DataTier::FilterConditionModel
* Location : /lib/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

var HF = require('../helpers/functionHelper.js');

function FilterConditionModel(cond) {
	if(cond===undefined || typeof cond !== 'string' || cond.trim().length<3){
		return 611;
	}
	var parsed=HF.parseCondition(cond);
	if(typeof parsed === 'number'){
		return 612;
	}
	this._key=parsed.key;
	this._operator=parsed.operator;
	this._value=parsed.value;
}
/*
FilterConditionModel.prototype={ 
	validateRecord: function(record){
		switch (this._operator) {
			case ">":
				return record[this._key]>this._value;
				break;
			case ">=":
				//
				break;
		}
		return false;
	
};}*/
module.exports = FilterConditionModel;