/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartFlow.js
* Module : Lib::BusinessTier::MapChartFlow
* Location : /lib/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Filippo Rampado    Initial code
* =========================================================
* 0.0.2     2015-06-24   Filippo Rampado	Fix addRecord
* =========================================================
*/

var MapChartFlowModel=require('../../dataTier/flow/mapChartFlowModel.js');
var Flow=require('./flow.js');

//build the object if graphsocket and params are valid
function MapChartFlow(params, graphSocket) {
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 201');
		return;
	}
	var mc=new MapChartFlowModel(params);
	if (!mc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, graphSocket);
	this._dataMapChartFlow=mc;
}

MapChartFlow.prototype = Object.create(Flow.prototype);
MapChartFlow.prototype.constructor = Flow;
MapChartFlow.prototype.parent = Flow.prototype;

//if record is valid, add the record and notify the clients
MapChartFlow.prototype.addRecord = function(record){
	var res=this._dataMapChartFlow.addRecord(record);
	if (res!==133 && this._dataMapChartFlow.getRecordByID(res).norrisRecordIsValid){
		var latKey=this._dataMapChartFlow._latitudeKey;
		var longKey=this._dataMapChartFlow._longitudeKey;
		var newValue=[null, null];
		if (record[latKey]!==undefined && typeof record[latKey]==='number' && record[longKey]!==undefined && typeof record[longKey]==='number'){
			newValue=[record[latKey], record[longKey]];
		}
		var data={
			action: 'insertRecords',
			ID: this._dataMapChartFlow._ID,
			records: [{
				norrisRecordID: res,
				markerID: record[this._dataMapChartFlow._objectKey],
				value: newValue
			}]
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

//id ID is valid, delete the record and notify clients
MapChartFlow.prototype.deleteRecord = function(ID){
	var record=this._dataMapChartFlow.getRecordByID(ID);
	if (record!==155){
		if (record.norrisRecordIsValid){
			var data={
				action: 'deleteRecord',
				ID: this._dataMapChartFlow._ID,
				norrisRecordID: ID
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		this._dataMapChartFlow.deleteRecord(ID);
		return true;
	}
	return 155;
};

//if ID and record are valid, updates the record and notify the clients to remove, add or simply modify the record 
MapChartFlow.prototype.updateRecord = function(ID, record){
	var oldValid=this._dataMapChartFlow.getRecordByID(ID).norrisRecordIsValid;
	var res=this._dataMapChartFlow.updateRecord(ID, record);
	var newValid=this._dataMapChartFlow.getRecordByID(ID).norrisRecordIsValid;
	if (res===true ){
		if (oldValid && !newValid){
			var data={
				action: 'deleteRecord',
				ID: this._dataMapChartFlow._ID,
				norrisRecordID: ID
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		if (newValid){
			var latKey=this._dataMapChartFlow._latitudeKey;
			var longKey=this._dataMapChartFlow._longitudeKey;
			var newValue=[null, null];
			if (record[latKey]!==undefined && typeof record[latKey]==='number' && record[longKey]!==undefined && typeof record[longKey]==='number'){
				newValue=[record[latKey], record[longKey]];
			}
			if (!oldValid){
				var data2={
					action: 'insertRecords',
					ID: this._dataMapChartFlow._ID,
					records: [{
						norrisRecordID: ID,
						markerID: record[this._dataMapChartFlow._objectKey],
						value: newValue
					}]
				};
				this._graphSocket.sendMessage('updateFlowData', data2);
			}
			if (oldValid){
				var data3={
					action: 'updateRecord',
					ID: this._dataMapChartFlow._ID,
					norrisRecordID: ID,
					markerID: record[this._dataMapChartFlow._objectKey],
					value: newValue
				};
				this._graphSocket.sendMessage('updateFlowData', data3);
			}
		}
	}
	return res;
};

//it returns a JSON with all records
MapChartFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	var dataRecords=this._dataMapChartFlow.getData();
	var latKey=this._dataMapChartFlow._latitudeKey;
	var longKey=this._dataMapChartFlow._longitudeKey;
	var objKey=this._dataMapChartFlow._objectKey;
	for (var i=0; i<dataRecords.length; i++){
		if (dataRecords[i][latKey]!==undefined &&
			typeof dataRecords[i][latKey]==='number' &&
			dataRecords[i][longKey]!==undefined &&
			typeof dataRecords[i][longKey]==='number'){

			records.push({
				norrisRecordID: dataRecords[i].norrisRecordID,
				markerID: dataRecords[i][objKey],
				value: [ //lat,long
					dataRecords[i][latKey],
					dataRecords[i][longKey]
				]
			});
		}
	}

	return {
		action: 'replaceData',
		ID: this._dataMapChartFlow._ID,
		records: records
	};
};

//perform update movie and returns an array with IDs
MapChartFlow.prototype.updateMovie = function(records){
	var recIDs=this._dataMapChartFlow.updateMovie(records);
	this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
	return recIDs;
};


//it updates properties and notify clients about it
MapChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataMapChartFlow.updateProperties(params);
		prop.ID=this._dataMapChartFlow._ID;
		if (prop.filters !== undefined){
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

//it returns model properties
MapChartFlow.prototype.getProperties = function(){
	return this._dataMapChartFlow.getProperties();
};

//returns the flow data
MapChartFlow.prototype.getData = function(){
	return this._dataMapChartFlow.getData();
};

module.exports = MapChartFlow;
