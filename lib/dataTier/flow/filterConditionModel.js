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

var HF = require('../../helpers/functionHelper.js');

function FilterConditionModel(cond) {
	if(cond===undefined || typeof cond !== 'string' || cond.trim().length<3){
		console.log('Error: 611');
		return;
	}
	var parsed=HF.parseCondition(cond);
	if(typeof parsed === 'number'){
		console.log('Error: 612');
		return;
	}
	this._key=parsed.key;
	this._operator=parsed.operator;
	this._value=parsed.value;
}

FilterConditionModel.prototype={
	validateRecord: function(record){
		if(record===undefined || record===null || record[this._key]===undefined){
			return false;
		}
		switch (this._operator) {
		case '>':
			return record[this._key] > this._value;
		case '>=':
			return record[this._key] >= this._value;
		case '<':
			return record[this._key] < this._value;
		case '<=':
			return record[this._key] <= this._value;
		case '==':
			return record[this._key] === this._value;
		case '!=':
			return record[this._key] !== this._value;
		}
	}
};
module.exports = FilterConditionModel;