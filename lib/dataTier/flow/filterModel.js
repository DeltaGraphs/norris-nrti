/*jshint node: true, -W106 */
'use strict';

/*
* Name : filterModel.js
* Module : Lib::DataTier::FilterModel
* Location : /lib/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/
var FilterConditionModel = require('./filterConditionModel.js');

function FilterModel(textRules) {
	if(typeof textRules !== 'string'){
		console.log('Error: 621');
		return;
	}
	var arr=textRules.split(',');
	var condit=[];
	for (var key in arr) {
		arr[key]=arr[key].trim();
		if(arr[key]!==''){
			var fcm=new FilterConditionModel(arr[key]);
			if(fcm.hasOwnProperty('_operator')){
				condit.push=fcm;
			}
		}
	}
	if(condit.length===0){
		console.log('Error: 622');
		return;
	}
	this._filterText=textRules;
	this._conditions=condit;
}

FilterModel.prototype={
	validateRecord: function(record){
		for (var key in this._conditions) {
			if(this._conditions[key].validateRecord(record)===false){
				return false;
			}
		}
		return true;
	},
	getFilterText: function(){
		return this._filterText;
	}
};
module.exports = FilterModel;