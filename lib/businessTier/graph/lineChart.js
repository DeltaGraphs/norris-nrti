/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChart.js
* Module : Lib::BusinessTier::LineChart
* Location : /lib/businessTier/lineChart
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-31   Filippo Rampado    Initial code
* =========================================================
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var LineChartFlow=require('../flow/lineChartFlow.js');
var LineChartModel=require('../../dataTier/graph/lineChartModel.js');

function LineChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 281');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 282');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 283');
		return;
	}
	var lc=new LineChartModel(params);
	if (!lc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataLineChart=lc;
	this._flows=[];
}

LineChart.prototype = Object.create(Graph.prototype);
LineChart.prototype.constructor = Graph;
LineChart.prototype.parent = Graph.prototype;

LineChart.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i].ID===ID){
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
	return 282;
};

LineChart.prototype.createLineChartFlow = function(params){
	var lcf=new LineChartFlow(params, this._graphSocket);
	if (!lcf.hasOwnProperty('_dataLineChartFlow')){
		return 232;
	}
	this._flows.push(lcf);
	this._dataLineChart.addFlow(lcf._dataLineChartFlow);

	var prop={ID: params.ID};
	prop.name=lcf._name;
	prop.marker=lcf._marker;
	prop.flowColor=lcf._flowColor;
	prop.interpolation=lcf._interpolation;
	prop.area=lcf._area;
	prop.maxItems=lcf._maxItems;

	this._graphSocket.sendMessage('insertFlow', prop);
	return lcf;
};

LineChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i].ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID			
			this._graphSocket.sendMessage('deleteFlow', ID);
			this._flows.splice(i, 1);
			return true;
		}
		//no ID in flows
	}
	return 283;
};

LineChart.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', this._flows[0]._dataLineChartFlow._ID);
		this._flows.splice(0, 1);
	}
};

LineChart.prototype.addRecord = function(flowID, record){
	return this.getFlowByID(flowID).addRecord(record);
};

LineChart.prototype.updateRecord = function(flowID, ID, record){
	return this.getFlowByID(flowID).updateRecord(ID, record);
};


LineChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataLineChart.updateProperties(params);
		prop.ID=this._dataLineChart.ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
	}
};

LineChart.prototype.getProperties = function(){
	return this._dataLineChart.getProperties();
};

LineChart.prototype.getConfigJSON = function(){
	var configJSON={};
	configJSON.properties=this._dataLineChart.getProperties();
	var flowProp=[];
	var flows=this._flows.length;
	var flowsData={};
	for (var i=0; i<flows; i++){
		flowProp.push(this._flows[i]._dataLineChartFlow.getProperties());
		var records=this._flows[i]._dataLineChartFlow.getData();
		flowsData.ID=this._flows[i]._dataLineChartFlow._ID;
		flowsData.records=[];
		for (var j=0; j<records.length; j++){
			flowsData.records.push({
				norrisRecordID : records[j].norrisRecordID,
				value: [ //lat,long
					records[j][this._flows[i]._dataLineChartFlow._xKey],
					records[j][this._flows[i]._dataLineChartFlow._yKey]
				]
			});
		}
	}
	configJSON.properties.flows=flowProp;
	configJSON.data=flowsData;
	return configJSON;
};

module.exports = LineChart;
