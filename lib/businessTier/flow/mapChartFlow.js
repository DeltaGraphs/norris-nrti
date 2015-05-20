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

var Socket=require('../../presentationTier/socket.js');
var MapChartFlowModel=require('../../dataTier/flow/mapChartFlowModel.js');
var Flow=require('./flow.js');
var Helper = require('../../helpers/functionHelper.js');

function MapChartFlow(params, graphSocket) {
	if (!graphSocket instanceof Socket){
		console.log('Error: 201');
		return;
	}
	var mc=new MapChartFlowModel(params);
	if (!mc.hasOwnProperty('ID')){
		console.log('Error: 232');
		return;
	}
	this.parent.constructor.call(this, graphSocket);
	this._dataFlow=mc;
}

MapChartFlow.prototype = Object.create(Flow.prototype);
MapChartFlow.prototype.constructor = Flow;
MapChartFlow.prototype.parent = Flow.prototype;

MapChartFlow.prototype.addRecord = function(record){
	var res=this._dataFlow.addRecord(record);
	if (res!==133){	//aggiungere controllo isValid
		var latKey=this._dataFlow._latitudeKey;
		var longKey=this._dataFlow._longitudeKey;
		var newValue=[null, null];
		if (record[latKey]!==undefined && typeof record[latKey]==='number' && record[longKey]!==undefined && typeof record[longKey]==='number'){
			newValue=[record.latKey, record.longKey];
		}
		var data={
			action: 'insertRecords',
			ID: this._dataFlow._ID,
			records: [{
				norrisRecordID: res,
				value: newValue
			}]
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

MapChartFlow.prototype.deleteRecord = function(ID){
	//aggiungere controllo isValid
	var res=this._dataFlow.deleteRecord(ID);
	if (res!==134){
		var data={
			action: 'deleteRecord',
			ID: this._dataFlow._ID,
			norrisRecordID: ID
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

MapChartFlow.prototype.updateRecord = function(ID, record){
	//aggiungere controllo isValid
	var res=this._dataFlow.updateRecord(ID, record);
	if (res===true){
		var latKey=this._dataFlow._latitudeKey;
		var longKey=this._dataFlow._longitudeKey;
		var newValue=[null, null];
		if (record[latKey]!==undefined && typeof record[latKey]==='number' && record[longKey]!==undefined && typeof record[longKey]==='number'){
			newValue=[record.latKey, record.longKey];
		}
		var data={
			action: 'updateRecord',
			ID: this._dataFlow._ID,
			norrisRecordID: ID,
			value: newValue
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

MapChartFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop={};
		this._dataFlow.updateProperties(params);
		if(params.name!==undefined && typeof params.name === 'string'){
			prop.name=params.name;
		}
		if (params.name!==undefined && typeof params.filters === 'string'){
			var latKey=this._dataFlow._latitudeKey;
			var longKey=this._dataFlow._longitudeKey;
			var records=[];
			var recordsModel=this._dataFlow._records;
			var nRecords=this._dataFlow._records.length;
			for (var i=0; i<nRecords; i++){
				if (recordsModel[i][latKey]!==undefined && typeof recordsModel[i][latKey]==='number' && recordsModel[i][longKey]!==undefined && typeof recordsModel[i][longKey]==='number'){
					records.push({
						norrisRecordID: recordsModel[i].norrisRecordID,
						value: [recordsModel[i][latKey], recordsModel[i][longKey]]
					});
				}
			}
			var data={
				action: 'filtersChanged',
				ID: this._dataFlow._ID,
				records: records
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		if(params.marker!==undefined && Helper.isValidMapMarker(params.marker)){
			prop.marker=params.marker;
		}
		if(params.trace!==undefined && Helper.isValidTrace(params.trace)){
			prop.trace=params.trace;
		}
		if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
			prop.maxItems=params.maxItems;
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

module.exports = MapChartFlow;
