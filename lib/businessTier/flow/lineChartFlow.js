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

var LineChartFlowModel=require('../../dataTier/flow/lineChartFlowModel.js');
var Flow=require('./flow.js');

//build the object if graphsocket and params are valid
function LineChartFlow(params, graphSocket) {
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 201');
		return;
	}
	var lc=new LineChartFlowModel(params);
	if (!lc.hasOwnProperty('_ID')){
		return;
	}
	//call parent constructor
	this.parent.constructor.call(this, graphSocket);
	this._dataLineChartFlow=lc;
}

LineChartFlow.prototype = Object.create(Flow.prototype);
LineChartFlow.prototype.constructor = Flow;
LineChartFlow.prototype.parent = Flow.prototype;

//if record is valid, add the record and notify the clients
LineChartFlow.prototype.addRecord = function(record){
	var res=this._dataLineChartFlow.addRecord(record);
	if (res!==123 && this._dataLineChartFlow.getRecordByID(res).norrisRecordIsValid){
		//obtain data from record
		var xKey=this._dataLineChartFlow._xKey;
		var yKey=this._dataLineChartFlow._yKey;
		var newValue=[null, null];
		if (record[xKey]!==undefined && typeof record[xKey]==='number' && record[yKey]!==undefined && typeof record[yKey]==='number'){
			newValue=[record[xKey], record[yKey]];
		}
		//build JSON need by clients
		var data={
			action: 'insertRecords',
			ID: this._dataLineChartFlow._ID,
			records: [{
				norrisRecordID: res,
				value: newValue
			}]
		};
		//send message to clients
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

//if ID and record are valid, updates the record and notify the clients to remove, add or simply modify the record 
LineChartFlow.prototype.updateRecord = function(ID, record){
	var oldValid=this._dataLineChartFlow.getRecordByID(ID).norrisRecordIsValid;
	var res=this._dataLineChartFlow.updateRecord(ID, record);
	var newValid=this._dataLineChartFlow.getRecordByID(ID).norrisRecordIsValid;
	if (res===true ){
		if (oldValid && !newValid){
			//new record must not be displayed
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
				//new record to be displayed
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
				//record must be modified
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

//it returns a JSON with all records
LineChartFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	var dataRecords=this._dataLineChartFlow._records;
	var xKey=this._dataLineChartFlow._xKey;
	var yKey=this._dataLineChartFlow._yKey;
	for (var i=0; i<dataRecords.length; i++){
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

//it updates properties and notify clients about it
LineChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataLineChartFlow.updateProperties(params);
		prop.ID=this._dataLineChartFlow._ID;
		if (prop.filters !== undefined){//filters are changed, so also data may be
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

//it returns model properties
LineChartFlow.prototype.getProperties = function(){
	return this._dataLineChartFlow.getProperties();
};

module.exports = LineChartFlow;
