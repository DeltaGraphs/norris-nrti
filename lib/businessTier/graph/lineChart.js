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
* 0.0.1     2015-05-31   Samuele Zanella    Initial code
* =========================================================
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var LineChartFlow=require('../flow/lineChartFlow.js');
var LineChartModel=require('../../dataTier/graph/lineChartModel.js');

function LineChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 371');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 372');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 373');
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
			if (this._flows[i]._dataLineChartFlow._ID===ID){
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
	return 272;
};

LineChart.prototype.createLineChartFlow = function(params){
	var lcf=new LineChartFlow(params, this._graphSocket);
	if (!lcf.hasOwnProperty('_dataLineChartFlow')){
		return 222;
	}
	this._flows.push(lcf);
	this._dataLineChart.addFlow(lcf._dataLineChartFlow);

	var data={};
	var prop={};
	prop.ID=params.ID;
	prop.name=lcf._dataLineChartFlow._name;
	prop.marker=lcf._dataLineChartFlow._marker;
	prop.flowColor=lcf._dataLineChartFlow._flowColor;
	prop.area=lcf._dataLineChartFlow._area;
	prop.maxItems=lcf._dataLineChartFlow._maxItems;
	data.properties=prop;
	data.records=[];

	this._graphSocket.sendMessage('insertFlow', data);
	return lcf;
};

LineChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataLineChartFlow._ID===ID){
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
	return 273;
};

LineChart.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {
			ID: this._flows[0]._dataLineChartFlow._ID
		});
		this._flows.splice(0, 1);
	}
};

LineChart.prototype.addRecord = function(flowID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==272){
		return flow.addRecord(record);
	}
	return 272;
};

LineChart.prototype.updateRecord = function(flowID, ID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==272){
		return flow.updateRecord(ID, record);
	}
	return 272;
};

LineChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataLineChart.updateProperties(params);
		this._graphSocket.sendMessage('updateGraphProp', prop);
		this._page.graphChanged({eventType: 'updateGraph', params: params});
	}
};

LineChart.prototype.getProperties = function(){
	return this._dataLineChart.getProperties();
};

LineChart.prototype.getConfigJSON = function(){
	var configJSON={};
	var prop={};
	prop.ID=this._dataLineChart._ID;
	prop.title=this._dataLineChart._title;
	prop.type=this._dataLineChart._type;
	prop.height=this._dataLineChart._height;
	prop.width=this._dataLineChart._width;
	prop.enableLegend=this._dataLineChart._enableLegend;
	prop.legendOnPoint=this._dataLineChart._legendOnPoint;
	prop.backgroundColor=this._dataLineChart._backgroundColor;
	prop.viewFinder=this._dataLineChart._viewFinder;
	prop.horizontalGrid=this._dataLineChart._horizontalGrid;
	prop.verticalGrid=this._dataLineChart._verticalGrid;
	prop.legend=this._dataLineChart._legend.getProperties();
	prop.xAxis=this._dataLineChart._xAxis.getProperties();
	prop.yAxis=this._dataLineChart._yAxis.getProperties();
	configJSON.properties=prop;
	

	var flowProp=[];
	var flows=this._flows.length;
	configJSON.data=[];
	for (var i=0; i<flows; i++){
		var flowData={};
		flowProp.push(this._flows[i]._dataLineChartFlow.getProperties());
		var records=this._flows[i]._dataLineChartFlow.getData();
		flowData.ID=this._flows[i]._dataLineChartFlow._ID;
		flowData.records=[];
		for (var j=0; j<records.length; j++){
			flowData.records.push({
				norrisRecordID : records[j].norrisRecordID,
				value: [ //x,y
					records[j][this._flows[i]._dataLineChartFlow._xKey],
					records[j][this._flows[i]._dataLineChartFlow._yKey]
				]
			});
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = LineChart;
