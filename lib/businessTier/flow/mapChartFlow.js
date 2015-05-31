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
*/

var MapChartFlowModel=require('../../dataTier/flow/mapChartFlowModel.js');
var Flow=require('./flow.js');

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

MapChartFlow.prototype.addRecord = function(record){
	var res=this._dataMapChartFlow.addRecord(record);
	if (res!==133 && this._dataMapChartFlow.getRecordByID(res).norrisRecordIsValid){
		var latKey=this._dataMapChartFlow._latitudeKey;
		var longKey=this._dataMapChartFlow._longitudeKey;
		var newValue=[null, null];
		if (record[latKey]!==undefined && typeof record[latKey]==='number' && record[longKey]!==undefined && typeof record[longKey]==='number'){
			newValue=[record.latKey, record.longKey];
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

MapChartFlow.prototype.deleteRecord = function(ID){
	var record=this._dataMapChartFlow.getRecordByID(ID);
	if (record!==135){
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
	return 135;
};

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
				newValue=[record.latKey, record.longKey];
			}
			if (!oldValid){
				var data2={
					action: 'insertRecords',
					ID: this._dataMapChartFlow._ID,
					records: [{
						norrisRecordID: res,
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

MapChartFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	/*for(var key in this._dataMapChartFlow._records){
		records.push({
			norrisRecordID : this._dataMapChartFlow._records[key].norrisRecordID,
			markerID: this._dataMapChartFlow._records[key][this._dataMapChartFlow._objectKey],
			value: [ //lat,long
				this._dataMapChartFlow._records[key][this._dataMapChartFlow._latitudeKey],
				this._dataMapChartFlow._records[key][this._dataMapChartFlow._longitudeKey]
			]
		});
	}*/
	var dataRecords=this._dataMapChartFlow._records;
	for (var i=0; i<dataRecords.length; i++){
		records.push({
			norrisRecordID : dataRecords[i].norrisRecordID,
			markerID: dataRecords[i][this._dataMapChartFlow._objectKey],
			value: [ //lat,long
				dataRecords[i][this._dataMapChartFlow._latitudeKey],
				dataRecords[i][this._dataMapChartFlow._longitudeKey]
			]
		});
	}

	return {
		action: 'replaceData',
		ID: this._dataMapChartFlow._ID,
		records: records
	};
};

MapChartFlow.prototype.updateMovie = function(records){
	var recIDs=this._dataMapChartFlow.updateMovie(records);
	this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
	return recIDs;
};


MapChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataMapChartFlow.updateProperties(params);
		prop.ID=this._dataMapChartFlow.ID;
		if (prop.filters !== 'undefined'){
			var latKey=this._dataMapChartFlow._latitudeKey;
			var longKey=this._dataMapChartFlow._longitudeKey;
			var records=[];
			var recordsModel=this._dataMapChartFlow._records;
			var nRecords=this._dataMapChartFlow._records.length;
			for (var i=0; i<nRecords; i++){
				if (recordsModel[i][latKey]!==undefined &&
				typeof recordsModel[i][latKey]==='number' &&
				recordsModel[i][longKey]!==undefined &&
				typeof recordsModel[i][longKey]==='number'){
					if (recordsModel[i].norrisIsValid){
						records.push({
							norrisRecordID: recordsModel[i].norrisRecordID,
							markerID: params[this._dataMapChartFlow._objectKey],
							value: [recordsModel[i][latKey], recordsModel[i][longKey]]
						});
					}
				}
			}
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};



module.exports = MapChartFlow;
