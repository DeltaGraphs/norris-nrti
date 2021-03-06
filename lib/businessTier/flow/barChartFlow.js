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
* 0.0.2     2015-06-24   Filippo Rampado	Fix addRecord
* =========================================================
*/

var BarChartFlowModel=require('../../dataTier/flow/barChartFlowModel.js');
var Flow=require('./flow.js');

//build the object if graphsocket and params are valid
function BarChartFlow(params, graphSocket, records) {
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 201');
		return;
	}
	var bc=new BarChartFlowModel(params, records);
	if (!bc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, graphSocket);
	this._dataBarChartFlow=bc;
}

BarChartFlow.prototype = Object.create(Flow.prototype);
BarChartFlow.prototype.constructor = Flow;
BarChartFlow.prototype.parent = Flow.prototype;

//if ID and record are valid, updates the record and notify the clients to remove, add or simply modify the record 
BarChartFlow.prototype.updateRecord = function(index, record){
	if ((index===undefined)||(typeof index !== 'number')||(index >= this._dataBarChartFlow._records.length || index < 0)){
		return 112;
	}
	var oldValid=this._dataBarChartFlow.getRecordByIndex(index).norrisRecordIsValid;
	var res=this._dataBarChartFlow.updateRecord(index, record);
	var newValid=this._dataBarChartFlow.getRecordByIndex(index).norrisRecordIsValid;
	if (res===true ){
		if (oldValid && !newValid){
			var data={
				action: 'deleteRecord',
				ID: this._dataBarChartFlow._ID,
				norrisRecordID: this._dataBarChartFlow.getRecordByIndex(index).norrisRecordID
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		if (newValid){
			var indexKey=this._dataBarChartFlow._indexKey;
			var valueKey=this._dataBarChartFlow._valueKey;
			var newValue=[null, null];
			if (record[indexKey]!==undefined && typeof record[indexKey]==='number' && record[valueKey]!==undefined && typeof record[valueKey]==='number'){
				newValue=[record[indexKey], record[valueKey]];
			}
			if (!oldValid){
				var data2={
					action: 'insertRecords',
					ID: this._dataBarChartFlow._ID,
					records: [{
						norrisRecordID: this._dataBarChartFlow.getRecordByIndex(index).norrisRecordID,
						value: newValue
					}]
				};
				this._graphSocket.sendMessage('updateFlowData', data2);
			
			}
			if (oldValid){
				var data3={
					action: 'updateRecord',
					ID: this._dataBarChartFlow._ID,
					norrisRecordID: this._dataBarChartFlow.getRecordByIndex(index).norrisRecordID,
					value: newValue
				};
				this._graphSocket.sendMessage('updateFlowData', data3);
			}
		}
	}
	return res;
};

//it returns a JSON with all records
BarChartFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	/*for(var key in this._dataBarChartFlow._records){
		records.push({
			norrisRecordID : this._dataBarChartFlow._records[key].norrisRecordID,
			markerID: this._dataBarChartFlow._records[key][this._dataBarChartFlow._objectKey],
			value: [ //lat,long
				this._dataBarChartFlow._records[key][this._dataBarChartFlow._xKey],
				this._dataBarChartFlow._records[key][this._dataBarChartFlow._yKey]
			]
		});
	}*/
	var dataRecords=this._dataBarChartFlow._records;
	for (var i=0; i<dataRecords.length; i++){
		if (dataRecords[i].norrisRecordIsValid){
			records.push({
				norrisRecordID : dataRecords[i].norrisRecordID,
				value: [ //lat,long
					dataRecords[i][this._dataBarChartFlow._indexKey],
					dataRecords[i][this._dataBarChartFlow._valueKey]
				]
			});
		}
	}

	return {
		action: 'replaceData',
		ID: this._dataBarChartFlow._ID,
		records: records
	};
};

//it updates properties and notify clients about it
BarChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataBarChartFlow.updateProperties(params);
		prop.ID=this._dataBarChartFlow._ID;
		if (prop.filters !== undefined){//filters changed
			var indexKey=this._dataBarChartFlow._indexKey;
			var records=[];
			var recordsModel=this._dataBarChartFlow._records;
			var nRecords=this._dataBarChartFlow._records.length;
			for (var i=0; i<nRecords; i++){
				if (recordsModel[i][indexKey]!==undefined &&
				typeof recordsModel[i][indexKey]==='number'){
					if (recordsModel[i].norrisRecordIsValid){
						records.push({
							norrisRecordID: recordsModel[i].norrisRecordID,
							markerID: params[this._dataBarChartFlow._objectKey],
							value: [recordsModel[i][indexKey]]
						});
					}
				}
			}
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

//it returns model properties
BarChartFlow.prototype.getProperties = function(){
	return this._dataBarChartFlow.getProperties();
};

//returns the flow data
BarChartFlow.prototype.getData = function(){
	return this._dataBarChartFlow.getData();
};

module.exports = BarChartFlow;
