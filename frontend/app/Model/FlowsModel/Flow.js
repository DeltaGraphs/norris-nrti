/*
* Name :  Flow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Creazione file      
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Codifica di tutti gli attributi e i metodi
* =================================================================================================
*
*/

app.factory('Flow', function(){
	var dataFormat;
	var name;

	var Flow = function(info) {
		dataFormat = info.dataFormat;
		name = info.name;
	};

	Flow.prototype.updateParameters = function(info) { //abstract
    	alert('Flow.updateParameters not implemented');
	};
	Flow.prototype.getDataFormat = function() { //abstract
		return dataFormat;
	};
	Flow.prototype.getName = function() {
		return name;
	};
	return Flow;
});