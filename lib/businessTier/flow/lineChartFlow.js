/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChartFlow.js
* Module : Lib::BusinessTier::LineChartFlow
* Location : /lib/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-25   Filippo Rampado    Initial code
* =========================================================
*/

var LineChartFlowModel=require('../../dataTier/flow/lineChartFlowModel.js');
var Flow=require('./flow.js');

function LineChartFlow(params, graphSocket) {
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 201');
		return;
	}
	var lc=new LineChartFlowModel(params);
	if (!lc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, graphSocket);
	this._dataLineChartFlow=lc;
}

LineChartFlow.prototype = Object.create(Flow.prototype);
LineChartFlow.prototype.constructor = Flow;
LineChartFlow.prototype.parent = Flow.prototype;

LineChartFlow.prototype.addRecord = function(record){
	var res=this._dataLineChartFlow.addRecord(record);
	if (res!==123 && this._dataLineChartFlow.getRecordByID(res).norrisRecordIsValid){
		var xKey=this._dataLineChartFlow._xKey;
		var yKey=this._dataLineChartFlow._yKey;
		var newValue=[null, null];
		if (record[xKey]!==undefined && typeof record[xKey]==='number' && record[yKey]!==undefined && typeof record[yKey]==='number'){
			newValue=[record[xKey], record[yKey]];
		}
		var data={
			action: 'insertRecords',
			ID: this._dataLineChartFlow._ID,
			records: [{
				norrisRecordID: res,
				value: newValue
			}]
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

LineChartFlow.prototype.updateRecord = function(ID, record){
	var oldValid=this._dataLineChartFlow.getRecordByID(ID).norrisRecordIsValid;
	var res=this._dataLineChartFlow.updateRecord(ID, record);
	var newValid=this._dataLineChartFlow.getRecordByID(ID).norrisRecordIsValid;
	if (res===true ){
		if (oldValid && !newValid){
			var data={
				action: 'deleteRecord',
				ID: this._dataLineChartFlow._ID,
				norrisRecordID: ID
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		if (newValid){
			var xKey=this._dataLineChartFlow._xKey;
			var yKey=this._dataLineChartFlow._yKey;
			var newValue=[null, null];
			if (record[xKey]!==undefined && typeof record[xKey]==='number' && record[yKey]!==undefined && typeof record[yKey]==='number'){
				newValue=[record[xKey], record[yKey]];
			}
			if (!oldValid){
				var data2={
					action: 'insertRecords',
					ID: this._dataLineChartFlow._ID,
					records: [{
						norrisRecordID: ID,
						value: newValue
					}]
				};
				this._graphSocket.sendMessage('updateFlowData', data2);
			}
			if (oldValid){
				var data3={
					action: 'updateRecord',
					ID: this._dataLineChartFlow._ID,
					norrisRecordID: ID,
					value: newValue
				};
				this._graphSocket.sendMessage('updateFlowData', data3);
			}
		}
	}
	return res;
};

LineChartFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	var dataRecords=this._dataLineChartFlow._records;
	var xKey=this._dataLineChartFlow._xKey;
	var yKey=this._dataLineChartFlow._yKey;
	for (var i=0; i<dataRecords.length; i++){
		console.log (dataRecords[i][xKey]+'__'+dataRecords[i][yKey]);
		if (dataRecords[i][xKey]!==undefined &&
			typeof dataRecords[i][xKey]==='number' &&
			dataRecords[i][yKey]!==undefined &&
			typeof dataRecords[i][yKey]==='number' &&
			dataRecords[i].norrisRecordIsValid){

			records.push({
				norrisRecordID : dataRecords[i].norrisRecordID,
				value: [
					dataRecords[i][xKey],
					dataRecords[i][yKey]
				]
			});
		}
	}
	return {
		action: 'replaceData',
		ID: this._dataLineChartFlow._ID,
		records: records
	};
};

LineChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataLineChartFlow.updateProperties(params);
		prop.ID=this._dataLineChartFlow.ID;
		if (prop.filters !== undefined){//filters changed
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

module.exports = LineChartFlow;
