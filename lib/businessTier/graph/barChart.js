/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChart.js
* Module : Lib::BusinessTier::BarChart
* Location : /lib/businessTier/barChart
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-01   Samuele Zanella    Initial code
* =========================================================
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var BarChartFlow=require('../flow/barChartFlow.js');
var BarChartModel=require('../../dataTier/graph/barChartModel.js');
var Helper = require('../../helpers/functionHelper.js');

function BarChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 361');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 362');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 363');
		return;
	}
	var bc=new BarChartModel(params);
	if (!bc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataBarChart=bc;
	this._flows=[];
}

BarChart.prototype = Object.create(Graph.prototype);
BarChart.prototype.constructor = Graph;
BarChart.prototype.parent = Graph.prototype;

BarChart.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataBarChartFlow._ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID
			return this._flows[i];
		}
		//no ID in flows
	}
	return 262;
};

BarChart.prototype.createBarChartFlow = function(params, records){
	var bcf=new BarChartFlow(params, this._graphSocket, records);
	if (!bcf.hasOwnProperty('_dataBarChartFlow')){
		return 212;
	}
	this._flows.push(bcf);
	this._dataBarChart.addFlow(bcf._dataBarChartFlow);

	var prop={
		properties: {
			ID: params.ID
		}
	};
	if(params.name!==undefined && typeof params.name === 'string'){
		prop.properties.name=params.name;
	}
	if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
		prop.properties.flowColor=params.flowColor;
	}
	//prop.records=records;
	prop.records = [];//bcf.getReplaceDataJSON();
	var dataRecords=bcf._dataBarChartFlow._records;
	for (var i=0; i<dataRecords.length; i++){
		if (dataRecords[i].norrisRecordIsValid){
			prop.records.push({
				norrisRecordID : dataRecords[i].norrisRecordID,
				value: [ //lat,long
					dataRecords[i][bcf._dataBarChartFlow._indexKey],
					dataRecords[i][bcf._dataBarChartFlow._valueKey]
				]
			});
		}
	}
	this._graphSocket.sendMessage('insertFlow', prop);
	return bcf;
};

BarChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataBarChartFlow._ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID	
			this._graphSocket.sendMessage('deleteFlow', {ID: ID});
			this._flows.splice(i, 1);
			return true;
		}
		//no ID in flows
	}
	return 263;
};

BarChart.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {ID: this._flows[0]._dataBarChartFlow._ID});
		this._flows.splice(0, 1);
	}
};

BarChart.prototype.updateRecord = function(flowID, index, record){
	return this.getFlowByID(flowID).updateRecord(index, record);
};


BarChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataBarChart.updateProperties(params);
		//prop.ID=this._dataBarChart._ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
	}
};

BarChart.prototype.getProperties = function(){
	return this._dataBarChart.getProperties();
};

BarChart.prototype.getConfigJSON = function(){
	var configJSON={};
	var prop={};
	prop.ID=this._dataBarChart._ID;
	prop.title=this._dataBarChart._title;
	prop.type=this._dataBarChart._type;
	prop.height=this._dataBarChart._height;
	prop.width=this._dataBarChart._width;
	prop.enableLegend=this._dataBarChart._enableLegend;
	prop.legendOnPoint=this._dataBarChart._legendOnPoint;
	prop.backgroundColor=this._dataBarChart._backgroundColor;
	prop.grid=this._dataBarChart._grid;
	prop.groupingControl=this._dataBarChart._groupingControl;
	prop.barOrientation=this._dataBarChart._barOrientation;
	prop.legend=this._dataBarChart._legend.getProperties();
	prop.xAxis=this._dataBarChart._xAxis.getProperties();
	prop.yAxis=this._dataBarChart._yAxis.getProperties();
	prop.headers=this._dataBarChart._headers;
	configJSON.properties=prop;

	var flowProp=[];
	var flows=this._flows.length;
	configJSON.data=[];
	for (var i=0; i<flows; i++){
		var flowData={};
		flowProp.push(this._flows[i]._dataBarChartFlow.getProperties());
		var records=this._flows[i]._dataBarChartFlow.getData();
		flowData.ID=this._flows[i]._dataBarChartFlow._ID;
		flowData.records=[];
		for (var j=0; j<records.length; j++){
			flowData.records.push({
				norrisRecordID : records[j].norrisRecordID,
				value: [
					records[j][this._flows[i]._dataBarChartFlow._indexKey],
					records[j][this._flows[i]._dataBarChartFlow._valueKey]
				]
			});
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = BarChart;
