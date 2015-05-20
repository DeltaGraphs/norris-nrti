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
	this._dataTierMapChartFlow=mc;
}

MapChartFlow.prototype = Object.create(Flow.prototype);
MapChartFlow.prototype.constructor = Flow;
MapChartFlow.prototype.parent = Flow.prototype;

MapChartFlow.prototype.addRecord = function(record){
	return this._dataTierMapChartFlow.addRecord(record);
};

MapChartFlow.prototype.deleteRecord = function(ID){
	return this._dataTierMapChartFlow.deleteRecord(ID);
};

MapChartFlow.prototype.updateRecord = function(ID, record){
	return this._dataTierMapChartFlow.updateRecord(ID, record);
};

module.exports = MapChartFlow;
