/*
* Name :  Flow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-05-14  Maria Giovanna Chinellato	Fix updateParameters
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

app.factory('Flow', function(){
	var dataFormat;
	var name;

	var Flow = function(info) {
		if (info.dataFormat) {
			dataFormat = info.dataFormat;
		}
		if (info.name){
			name = info.name;
		}
	};

	Flow.prototype.updateParameters = function(info) { //abstract
    	if (info.dataFormat) {
			dataFormat = info.dataFormat;
		}
		if (info.name){
			name = info.name;
		}
	};
	Flow.prototype.getDataFormat = function() {
		return dataFormat;
	};
	Flow.prototype.getName = function() {
		return name;
	};
	return Flow;
});