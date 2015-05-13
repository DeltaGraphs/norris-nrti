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

function FilterConditionModel(cond) {
	if(cond===undefined || typeof cond !== 'string' || cond.trim().length<3){
		return 611;
	}
	this._key;
	this._operator;
	this._value;
}

FilterConditionModel.prototype={
	validateRecord: function(record){
		return record; //boolean di ritorno
	}
};
module.exports = FilterConditionModel;