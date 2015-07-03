/*jshint node: true */
'use strict';

/*
* Name :  norris-nrti.js
* Module : FrontEnd
* Location : /frontend/app
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.0			2015-05-31	Rossetto Francesco			Modified structure of appConfig
*
* 0.0.2         2015-05-15  Maria Giovanna Chinellato   Add code of config file
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

var norrisConfig = function($routeProvider) {
    $routeProvider /* inizio definizione di routeProvider */
        .when('/', {
            //controller: 'PagesListController',
            template: '<pages-list></pages-list>'
        })
        .when('/page/:pageId', {
        	//controller : 'PageController',
        	template: '<page></page>'
        })
        .otherwise({
            redirectTo: '/'
        })
    ; /* fine definizione di routeProvider */
};

var norris = angular.module('norris-nrti', ['ngRoute', 'smart-table', 'nvd3ChartDirectives']).config(norrisConfig); /* definisce un
namespace (chiamato modulo) */ 

/*jshint node: true */
'use strict';

/*
* Name :  BarChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0			2015-05-20	Francesco Rossetto			Tested
*
* 0.2.0			2015-05-18	Francesco Rossetto			Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fixes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('BarChartFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var barFlowJson = {};

        if (json !== undefined){
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.flowColor !== undefined) {
	            barFlowJson.flowColor = json.flowColor;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'barFlowJson' : barFlowJson
        };
    }

    //BarChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function BarChartFlow(info) {
    	this._data = [];
		this._flowColor = undefined;
		this._flow = null;

		var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;
		this._flow = FlowFactory.build(fJson);

		if (bfJson.flowColor !== undefined) {
            this._flowColor = bfJson.flowColor;
        }

	}

	BarChartFlow.prototype.updateParameters = function(info) {
    	var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;

		this._flow.updateParameters(fJson);

		if (Object.keys(bfJson).length !== 0) {
			if (bfJson.flowColor !== undefined) {
	            this._flowColor = bfJson.flowColor;
	        }
	    }
	};

	BarChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			this._data.push(newData.records[i]);
		}
	};
	BarChartFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	BarChartFlow.prototype.inPlaceUpdate = function(newData) {
        for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
                this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
    BarChartFlow.prototype.addRecords = function(newData) {
		this.initializeData(newData);
    };
    BarChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    BarChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	BarChartFlow.prototype.getData = function() {
		return this._data;
	};
	BarChartFlow.prototype.getFlowColor = function() {
		return this._flowColor;
	};

    function BarChartFlowFactory(){}

    BarChartFlowFactory.build = function(info) {
        return new BarChartFlow(info);
    };

	return BarChartFlowFactory;

}]);
/*jshint node: true */
'use strict';

/*
* Name :  Flow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-05-20  Maria Giovanna Chinellato	Tested
*
* 0.1.2         2015-05-17  Maria Giovanna Chinellato	Fix attributes
*
* 0.1.1         2015-05-16  Maria Giovanna Chinellato	Fix updateParameters
*
* 0.1.0         2015-05-16  Maria Giovanna Chinellato	Add all attributes and all methods
*
* 0.0.1         2015-05-15  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('FlowFactory', function(){

	function Flow(info){
		
		this._name = null;

		if (info !== undefined) {
			if (info.name !== undefined){
				this._name = info.name;
			}
		}
	}

	Flow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
			if (info.name !== undefined){
				this._name = info.name;
			}
		}
	};
	Flow.prototype.getName = function() {
		return this._name;
	};

	function FlowFactory(){}

    FlowFactory.build = function(info) {
        return new Flow(info);
    };
	return( FlowFactory );
});
/*jshint node: true */
'use strict';

/*
* Name :  LineChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0         2015-05-18  Maria Giovanna Chinellato	Tested
*
* 0.2.0         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.2         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.1			2015-05-15	Francesco Rossetto			Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('LineChartFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var lineFlowJson = {};

        if (json !== undefined) {
	        if (json.dataFormat !== undefined) {
	            flowJson.dataFormat = json.dataFormat;
	        }
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.flowColor !== undefined) {
	            lineFlowJson.flowColor = json.flowColor;
	        }
	        if (json.marker !== undefined) {
	            lineFlowJson.marker = json.marker;
	        }
	        if (json.area !== undefined) {
	            lineFlowJson.area = json.area;
	        }
	        if (json.maxItems !== undefined) {
	            lineFlowJson.maxItems = json.maxItems;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'lineFlowJson' : lineFlowJson
        };
    }

    //LineChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

	function LineChartFlow(info) {
		this._data = [];
		this._flowColor = '#000';
		this._marker = 'square';
		this._area = false;
		this._maxItems = null;

		var json = split(info);
		var fJson = json.flowJson;
		var lfJson = json.lineFlowJson;

		this._flow = FlowFactory.build(fJson);

		if (Object.keys(lfJson).length !== 0) {
		
			if (lfJson.flowColor !== undefined) {
	            this._flowColor = lfJson.flowColor;
	        }
	        if (lfJson.marker !== undefined) {
	            this._marker = lfJson.marker;
	        }
	        if (lfJson.area !== undefined) {
	            this._area = lfJson.area;
	        }
	        if (lfJson.maxItems !== undefined) {
	            this._maxItems = lfJson.maxItems;
	        }
	    }
	}

	LineChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var lfJson = json.lineFlowJson;

			this._flow.updateParameters(fJson);

			if (Object.keys(lfJson).length !== 0) {
				if (lfJson.flowColor !== undefined) {
		            this._flowColor = lfJson.flowColor;
		        }
		        if (lfJson.marker !== undefined) {
		            this._marker = lfJson.marker;
		        }
		        if (lfJson.area !== undefined) {
		            this._area = lfJson.area;
		        }
		        if (lfJson.maxItems !== undefined) {
		            this._maxItems = lfJson.maxItems;
		        }
		    }
		}
	};

	LineChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			if (this._maxItems === null || this._data.length < this._maxItems){
				this._data.push(newData.records[i]);
			}
			else{
				this._data.splice(0,1);
				this._data.push(newData.records[i]);
			}
		}
	};
	LineChartFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	LineChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
                this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
	LineChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    LineChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    LineChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	LineChartFlow.prototype.getData = function() {
		return this._data;
	};
	LineChartFlow.prototype.getFlowColor = function() {
		return this._flowColor;
	};
	LineChartFlow.prototype.getMarker = function() {
		return this._marker;
	};
	LineChartFlow.prototype.getArea = function() {
		return this._area;
	};
	LineChartFlow.prototype.getMaxItem = function() {
		return this._maxItems;
	};

	function LineChartFlowFactory() {}

	LineChartFlowFactory.build = function(info){
		return new LineChartFlow(info);
	};

	return LineChartFlowFactory;
}]);
/*jshint node: true */
'use strict';

/*
* Name :  MapChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0			2015-05-19	Francesco Rossetto			Tested
*
* 0.2.0			2015-05-18	Francesco Rossetto			Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fixes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('MapChartFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var mapFlowJson = {};

        if (json !== undefined) {
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.marker !== undefined) {
	            mapFlowJson.marker = json.marker;
	        }
	        if (json.trailLength !== undefined) {
	            mapFlowJson.trailLength = json.trailLength;
	        }
	        if (json.trace !== undefined) {
	            mapFlowJson.trace = json.trace;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'mapFlowJson' : mapFlowJson
        };
    }

    //MapChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function MapChartFlow(info) {
    	this._data = [];
		this._marker = null;
		this._trailLength = null;
		this._trace = null;

		var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		this._flow = FlowFactory.build(fJson);

		if (Object.keys(mfJson).length !== 0) {
	        if (mfJson.marker !== undefined) {
	            this._marker = mfJson.marker;
	        }
	        if (mfJson.trailLength !== undefined) {
	            this._trailLength = mfJson.trailLength;
	        }
	        if (mfJson.trace !== undefined) {
	        	this._trace = mfJson.trace;
	        }
 	    }
	}

	MapChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			this._flow = FlowFactory.build(fJson);
			this._flow.updateParameters(fJson);
	
			if (Object.keys(mfJson).length !== 0) {
				if (mfJson.marker !== undefined) {
		            this._marker = mfJson.marker;
		        }
		        if (mfJson.trailLength !== undefined) {
		            this._trailLength = mfJson.trailLength;
		        }
		        if (mfJson.trace !== undefined) {
	        		this._trace = mfJson.trace;
	        	}
		    }
		}
	};

	MapChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			if (this._trailLength === null || this._data.length < this._trailLength){
				this._data.push(newData.records[i]);
			}
			else{
				this._data.splice(0,1);
				this._data.push(newData.records[i]);
			}
		}
	};
	MapChartFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	MapChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
            	this._data[i] = newData;
                //this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
	MapChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    MapChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    MapChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	MapChartFlow.prototype.getData = function() {
		return this._data;
	};
	MapChartFlow.prototype.getMarker = function() {
		return this._marker;
	};
	MapChartFlow.prototype.getMaxItem = function() {
		return this._trailLength;
	};
	MapChartFlow.prototype.getTrace = function() {
		return this._trace;
	};

	function MapChartFlowFactory() {}

	MapChartFlowFactory.build = function(info) {
		return new MapChartFlow(info);
	};

	return MapChartFlowFactory;

}]);
/*jshint node: true */
'use strict';

/*
* Name :  TableFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0         2015-05-22  Maria Giovanna Chinellato	Tested
*
* 0.2.0         2015-05-16  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('TableFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var tableFlowJson = {};

        if(json !== undefined) {
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.maxItems !== undefined) {
	            tableFlowJson.maxItems = json.maxItems;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'tableFlowJson' : tableFlowJson
        };
    }

    //TableFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function TableFlow(info) {
    	this._data = [];
		this._maxItems = null;
		
		var json = split(info);
		var fJson = json.flowJson;
		var tfJson = json.tableFlowJson;

		this._flow = FlowFactory.build(fJson);

        if (tfJson.maxItems !== undefined) {
            this._maxItems = tfJson.maxItems;
        }
	}

	TableFlow.prototype.updateParameters = function(info) { // abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var tfJson = json.tableFlowJson;

			if (Object.keys(fJson).length !== 0) {
				this._flow.updateParameters(fJson);
			}

			if (Object.keys(tfJson).length !== 0) {
		        if (tfJson.maxItems !== undefined) {
		            this._maxItems = tfJson.maxItems;
		        }
		    }
		}
	};

	TableFlow.prototype.initializeData = function(newData, addRowOn) {
		for (var i=0; i<newData.records.length; i++) {
			if (this._maxItems === null || this._data.length < this._maxItems){
				if (addRowOn === 'bottom') {
					this._data.push(newData.records[i]);
				} else if (addRowOn === 'top') {
					this._data.unshift(newData.records[i]);
				}
			}
			else{
				if (addRowOn === 'bottom') {
					this._data.splice(0,1);
					this._data.push(newData.records[i]);
				} else if (addRowOn === 'top') {
					this._data.splice(this._data.length-1,1);
					this._data.unshift(newData.records[i]);
				}
			}
		}
	};
	TableFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	TableFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
                this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
    TableFlow.prototype.streamUpdate = function(newData, addRowOn) {
		this.initializeData(newData, addRowOn);
    };
    TableFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    TableFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	TableFlow.prototype.getData = function() {
		return this._data;
	};
	TableFlow.prototype.getMaxItem = function() {
		return this._maxItems;
	};

	function TableFlowFactory() {}

	TableFlowFactory.build = function(info) {
		return new TableFlow(info);
	};

	return TableFlowFactory;

}]);
/*jshint node: true */
'use strict';

/*
* Name :  Axis.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-21  Maria Giovanna Chinellato   Tested
*
* 0.1.3         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1         2015-05-15  Francesco Rossetto          Fix attributes and methods
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('AxisFactory', function(){

    // costruttore di Axis
    function Axis(info){
        // campi dati di axis e valori di default
        this._name = null;
        this._color = '#FFF';
        this._minValue = null;
        this._maxValue = null;
        this._ticks = 10;
        this._scale = 'linear';

        // controlla se ci sono dei campi dati da impostare, altrimenti crea un asse di default
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.color !== undefined) {
                this._color = info.color;
            }
            if (info.minIndex !== undefined) {
                this._minValue = info.minIndex;
            }
            if (info.maxIndex !== undefined) {
                this._maxValue = info.maxIndex;
            }
            if (info.ticks !== undefined) {
                this._ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this._scale = info.scale;
            }
        }
    }

    // funzine che aggiorna i campi dati di un asse
    Axis.prototype.updateParameters = function(info){
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.color !== undefined) {
                this._color = info.color;
            }
            if (info.minIndex !== undefined) {
                this._minValue = info.minIndex;
            }
            if (info.maxIndex !== undefined) {
                this._maxValue = info.maxIndex;
            }
            if (info.ticks !== undefined) {
                this._ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this._scale = info.scale;
            }
        }
    };

    Axis.prototype.getName = function(){
        return this._name; // ritorna il nome dell'asse
    };
    Axis.prototype.getColor = function(){
        return this._color; // ritona il colore dell'asse
    };
    Axis.prototype.getMinValue = function(){
        return this._minValue; // ritorna il minimo valore dell'asse
    };
    Axis.prototype.getMaxValue = function(){
        return this._maxValue; // ritorna il massimo valore dell'asse
    };
    Axis.prototype.getTicks = function(){
        return this._ticks; // ritorna il valore dei tick
    };
    Axis.prototype.getScale = function(){
        return this._scale; // ritorna la scale dell'asse
    };

    // costruttore di default di AxisFactory
    function AxisFactory() {}

    AxisFactory.build = function(info) {
        return new Axis(info); // ritorna l'istanza di un nuovo asse
    };
    return( AxisFactory );
});
/*jshint node: true */
'use strict';

/*
* Name :  BarChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-21  Francesco Rossetto          Tested
*
* 0.3.0         2015-05-20  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.1         2015-05-19  Francesco Rossetto          Various fixes, insert inzializeData
*
* 0.2.0         2015-05-18  Maria Giovanna Chinellato   Add all methods and fix class
*
* 0.1.0         2015-05-18  Maria Giovanna Chinellato   Add all attributes, add methods split and updateParameter
*
* 0.0.1         2015-05-18  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('BarChartFactory', ['GraphFactory','AxisFactory', 'BarChartFlowFactory', function(GraphFactory, AxisFactory, BarChartFlowFactory){

    // funzione di utilità che ha lo scopo di separare le proprietà legate al grafico generale da quelle legate al bar chart
    function split(json) {
        var graphJson = {};
        if (json.title !== undefined) {
            graphJson.title = json.title;
        }
        if (json.height !== undefined) {
            graphJson.height = json.height;
        }
        if (json.width !== undefined) {
            graphJson.width = json.width;
        }
        if (json.enableLegend !== undefined) {
            graphJson.enableLegend = json.enableLegend;
        }
        if (json.legend !== undefined) {
            graphJson.legend = json.legend;
        }
        if (json.socketURL !== undefined) {
            graphJson.socketURL = json.socketURL;
        }

        var barJson = {};
        if (json.xAxis !== undefined) {
            barJson.xAxis = json.xAxis;
        }
        if (json.yAxis !== undefined) {
            barJson.yAxis = json.yAxis;
        }
        if (json.barOrientation !== undefined) {
            barJson.barOrientation = json.barOrientation;
        }
        if (json.headers !== undefined) {
            barJson.headers = json.headers;
        }
        if (json.backgroundColor !== undefined) {
            barJson.backgroundColor = json.backgroundColor;
        }
        if (json.sortable !== undefined) {
            barJson.sortable = json.sortable;
        }
        if (json.groupingControl !== undefined) {
            barJson.groupingControl = json.groupingControl;
        }
        if (json.legendOnPoint !== undefined) {
            barJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.grid !== undefined) {
            barJson.grid = json.grid;
        }

        return {
            'graphJson' : graphJson,
            'barJson' : barJson
        };
    }

    // costruttore di default di un BarChart
    function BarChart(info) {
        // campi dati di un bar chart e valori di default
        this._axisX = null;
        this._axisY = null;
        this._barOrientation = 'V';
        this._headers = [];
        this._background = '#FFF';
        this._sortable = true;
        this._groupingControl = true;
        this._legendOnPoint = false;
        this._horizontalGrid = false;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del bar chart
    BarChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var bJson = json.barJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            } 
            if (Object.keys(bJson).length !== 0) {
                if (bJson.xAxis !== undefined) {
                    this._axisX = AxisFactory.build(bJson.xAxis);
                }
                if (bJson.yAxis !== undefined) {
                    this._axisY = AxisFactory.build(bJson.yAxis);
                }
                if (bJson.barOrientation !== undefined) {
                    this._barOrientation = bJson.barOrientation;
                }
                if (bJson.headers !== undefined) {
                    this._headers = bJson.headers;
                }
                if (bJson.backgroundColor !== undefined) {
                    this._background = bJson.backgroundColor;
                }
                if (bJson.sortable !== undefined) {
                    this._sortable = bJson.sortable;
                }
                if (bJson.groupingControl !== undefined) {
                    this._groupingControl = bJson.groupingControl;
                }
                if (bJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = bJson.legendOnPoint;
                }
                if (bJson.grid !== undefined) {
                    this._horizontalGrid = bJson.grid;
                }
            }
            // aggiunge i flussi relativi all'istanza di bar chart
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = BarChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
        
    };

    // aggiunge un nuovo flusso alla lista di flussi
    BarChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow.constructor.name === 'BarChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(newId, newFlow);
        }
    };
    // elimina il flusso con id === ID
    BarChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    BarChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    BarChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }   
    };

    // funzione che permette l'aggiornamento di tipo in place dei dati
    BarChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            for (var j=0; j<this._graph.getFlowList().length; j++) {
                if (this._graph.getFlowList()[j].id === newData.ID) {
                    this._graph.getFlowList()[j].flow.inPlaceUpdate(newData);
                }
            }
        }   
    };
    // funzione che permette di aggiongere un record ad un flusso esistente
    BarChart.prototype.addRecords = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.addRecords(newData);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    BarChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    BarChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    BarChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    BarChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    BarChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    BarChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    BarChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    BarChart.prototype.getX = function() {
        return this._axisX; // ritorna l'asse X
    };
    BarChart.prototype.getY = function() {
        return this._axisY; // ritorna l'asse Y
    };
    BarChart.prototype.getBarOrientation = function() {
        return this._barOrientation; // ritorna l'orientamento delle barre del bar chart (verticale: V, orizzontale: H)
    };
    BarChart.prototype.getHeaders = function() {
        return this._headers; // ritorna gli header relativi alle barre
    };
    BarChart.prototype.getBackground = function() {
        return this._background; // ritorna il colore di background del grafico
    };
    BarChart.prototype.getSortable = function() {
        return this._sortable; // ritorna true se è possibile ordinare il grafico dalla view
    };
    BarChart.prototype.getGroupingControl = function() {
        return this._groupingControl; // ritorna true se è data la possibilità di cambiare la posizine delle barre da grouped a stacked e viceversa
    };
    BarChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la funzionalità legend on point
    };
    BarChart.prototype.getHGrid = function() {
        return this._horizontalGrid; // ritorna se deve essere visualizzata la griglia orizzontale
    };

    // costruttore di default di BarChartFactory
    function BarChartFactory(){}

    BarChartFactory.build = function(info) {
        return new BarChart(info); // ritorna un'istanza di BarChart
    };

    return BarChartFactory;

}]);
/*jshint node: true */
'use strict';

/*
* Name :  ColorPicker.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-22  Maria GiovannaChinellato    Add all attributes and add initial code for methods 
*
* 0.0.1         2015-06-22  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.factory('ColorPicker', function(){
	var defaultColorFlow = [
        '#1f77b4',
        '#aec7e8',
        '#ff7f0e',
        '#ffbb78',
        '#2ca02c',
        '#98df8a',
        '#d62728',
        '#ff9896',
        '#9467bd',
        '#c5b0d5',
        '#8c564b',
        '#c49c94',
        '#e377c2',
        '#f7b6d2',
        '#7f7f7f',
        '#c7c7c7',
        '#bcbd22',
        '#dbdb8d',
        '#17becf',
        '#9edae5'
    ];

    return {
    	getDefaultColor : function(){
    		return defaultColorFlow;
    	}
    };

});
/*jshint node: true */
'use strict';

/*
* Name :  Graph.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GrapshModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0			2015-05-21	Maria Giovanna Chinellato	Tested
*
* 0.1.5			2015-05-18	Maria Giovanna Chinellato	Fix methods addFlow and deleteFlow
*
* 0.1.4			2015-05-15	Francesco Rossetto			Various fixes
*
* 0.1.3			2015-05-14	Maria Giovanna Chinellato	Add method getFlowList
*
* 0.1.3			2015-05-14	Francesco Rossetto			Fix constructor
*
* 0.1.2			2015-05-13	Francesco Rossetto			Fix constructor 
*
* 0.1.1			2015-05-12	Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Francesco Rossetto   		Add all attributes and all methods
*
* 0.0.1         2015-05-12  Francesco Rossetto			Initial code    
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('GraphFactory', ['LegendFactory', function(LegendFactory){

	// costruttore di default
	function Graph(info){
		// campi dati di Graph
		this._flowList = [];
		this._title = null;
		this._height = null;
		this._width = null;
		this._legend = null;
		this._enableLegend = false;
		this._url = null;

		// controlla se ci sono dei campi dati da impostare, altrimenti crea un grafico di default
		if (info !== undefined) {
			if (info.title !== undefined) {
				this._title = info.title;
			}
			if (info.socketURL !== undefined) {
				this._url = info.socketURL;
			}
		}		
	}

	// funzione che aggiorna i campi dati del grafico
	Graph.prototype.updateParameters = function(info) {
		if (info !== undefined) {
			if (info.title !== undefined) {
				this._title = info.title;
			}
			if (info.height !== undefined) {
				this._height = info.height;
			}
			if (info.width !== undefined) {
				this._width = info.width;
			}
			if (info.enableLegend !== undefined) {
				this._enableLegend = info.enableLegend;
			}
			if (this._enableLegend && info.legend !== undefined) {
					this._legend = LegendFactory.build(info.legend);
			}
		}
	};

	// funzione che aggiunge un flusso alla lista dei flussi
	Graph.prototype.addFlow = function(newId, newFlow) {
		var count = 0;

		for (var i = 0; i<this._flowList.length; i++) { // conta i flussi presenti nella lista che hanno lo stesso id del nuovo flusso
			if (this._flowList[i].id === newId) {
				count++;
			}
		}

	    if(count === 0) { // controlla il numero di flusso della lista che hanno lo stesso id del nuovo flusso
	        this._flowList.push({ id: newId, flow: newFlow}); // inserisce il nuovo flusso nella lista solo se non è già presente u flusso con lo stesso id
		}
		// error
	};
	// elimina un flusso dalla lista dei flussi
	Graph.prototype.deleteFlow = function(flowID) {
        for (var i = 0; i<this._flowList.length; i++){
            if (this._flowList[i].id === flowID){
                this._flowList.splice(i,1);
            }
        }
	};
	// rimpiazza i dati di un flusso con dei nuovi dati
	Graph.prototype.replaceData = function(newData) {
		for (var i = 0;i<this._flowList.length; i++) {
			if (this._flowList[i].id === newData.ID){
                this._flowList[i].flow.emptyData();
                this._flowList[i].flow.initializeData(newData);
            }
		}
	};
	
	Graph.prototype.getTitle = function() {
		return this._title; // ritorna il titolo del grafico
	};
	Graph.prototype.getHeight = function() {
		return this._height; // ritorna l'altezza del grafico
	};
	Graph.prototype.getWidth = function() {
		return this._width; // ritorna la larghezza del grafico
	};
	Graph.prototype.getLegend = function() {
		if (this._enableLegend) { // controlla se la legenda è disponibile
			return this._legend; // ritorna la legenda
		} else {
			return null; // ritorna null perchè la legenda non è disponibile
		}
	};
	Graph.prototype.getUrl = function() {
		return this._url; // ritorna l'url del grafico
	};
	Graph.prototype.getFlowList = function() {
		return this._flowList; // ritorna la lista dei flussi
	};

	// costruttore di default di GraphFactory
	function GraphFactory() {}

	GraphFactory.build = function(info) {
		return new Graph(info); // ritorna una nuova istanza di Graph
	};
	
	return( GraphFactory );
}]);
/*jshint node: true */
'use strict';

/*
* Name :  Legend.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-17  Maria Giovanna Chinellato   Tested
*
* 0.1.2         2015-05-15  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.1         2015-05-15  Francesco Rossetto          Variuos Fix
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('LegendFactory', function(){

    // costruttore di Legend
    function Legend(info){
        this._position = 'E';
        this._fontColor = '#000';
        this._backgroundColor = '#FFF';

        // imposta i valori dei campi dati se il JSON 'info' è definito, altrimenti lascia i valori di default
        if (info !== undefined){
            if (info.position !== undefined) {
                this._position = info.position;
            }
            if (info.fontColor !== undefined) {
                this._fontColor = info.fontColor;
            }
            if (info.backgroundColor !== undefined) {
                this._backgroundColor = info.backgroundColor;
            }
        }
    }

    // funzione che aggiorna i valori dei campi dati della legenda
    Legend.prototype.updateParameters = function(info){
        if (info !== undefined) {
            if (info.position !== undefined) {
                this._position = info.position;
            }
            if (info.fontColor !== undefined) {
                this._fontColor = info.fontColor;
            }
            if (info.backgroundColor !== undefined) {
                this._backgroundColor = info.backgroundColor;
            }
        }
    };

    Legend.prototype.getPosition = function(){
        return this._position; // ritorna la posizione della legenda
    };
    Legend.prototype.getFontColor = function(){
        return this._fontColor; // ritorna il colore del testo della legenda
    };
    Legend.prototype.getBackgroundColor = function(){
        return this._backgroundColor; // ritorna il colore di background della legenda
    };

    // costruttore di default di LegendFactory
    function LegendFactory() {}

    LegendFactory.build = function(info) {
        return new Legend(info); // ritorna una nuova istanza di Legend
    };
    
    return( LegendFactory );
});
/*jshint node: true */
'use strict';

/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-19  Maria Giovanna Chinellato   Tested
*
* 0.3.0         2015-05-18  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.2			2015-05-15	Francesco Rossetto			Various fixes, insert inzializeData
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato	Fix all methods
*
* 0.2.0         2015-05-13  Maria Giovanna Chinellato	Add all methods
*
* 0.1.0         2015-05-13  Francesco Rossetto   		Add all attributes and some methods
*
* 0.0.1         2015-05-13  Francesco Rossetto			Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('LineChartFactory', ['GraphFactory', 'AxisFactory', 'LineChartFlowFactory', function(GraphFactory, AxisFactory, LineChartFlowFactory){

    // funzione di utilità che ha lo scopo di separare le proprietà legate al grafico generale da quelle legate al bar chart
	function split(json) {
		var graphJson = {};
		if (json.title !== undefined) {
			graphJson.title = json.title;
		}
		if (json.height !== undefined) {
			graphJson.height = json.height;
		}
		if (json.width !== undefined) {
			graphJson.width = json.width;
		}
		if (json.enableLegend !== undefined) {
			graphJson.enableLegend = json.enableLegend;
		}
        if (json.legend !== undefined) {
            graphJson.legend = json.legend;
        }
        if (json.socketURL !== undefined) {
            graphJson.socketURL = json.socketURL;
        }

		var lineJson = {};
        if (json.legendOnPoint !== undefined) {
            lineJson.legendOnPoint = json.legendOnPoint;
        }
		if (json.xAxis !== undefined) {
			lineJson.xAxis = json.xAxis;
		}
		if (json.yAxis !== undefined) {
			lineJson.yAxis = json.yAxis;
		}
		if (json.viewFinder !== undefined) {
			lineJson.viewFinder = json.viewFinder;
		}
		if (json.backgroundColor !== undefined) {
			lineJson.backgroundColor = json.backgroundColor;
		}
        if (json.interpolation !== undefined) {
            lineJson.interpolation = json.interpolation;
        }
        if (json.horizontalGrid !== undefined) {
            lineJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid !== undefined) {
            lineJson.verticalGrid = json.verticalGrid;
        }

		return {
			'graphJson' : graphJson,
			'lineJson' : lineJson
		};
	}

    // costruttore di default di un LineChart
    function LineChart(info) {
        this._legendOnPoint = false;
        this._axisX = null;
        this._axisY = null;
        this._viewFinder = false;
        this._backgroundColor = '#FFF';
        this._interpolation = 'linear';
        this._horizontalGrid = false;
        this._verticalGrid = false;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del line chart
    LineChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var lJson = json.lineJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            }
            if (Object.keys(lJson).length !== 0) {
                if (lJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = lJson.legendOnPoint;
                }
                if (lJson.xAxis !== undefined) {
                    this._axisX = AxisFactory.build(lJson.xAxis);
                }
                if (lJson.yAxis !== undefined) {
                    this._axisY = AxisFactory.build(lJson.yAxis);
                }
                if (lJson.viewFinder !== undefined) {
                    this._viewFinder = lJson.viewFinder;
                }
                if (lJson.backgroundColor !== undefined) {
                    this._backgroundColor = lJson.backgroundColor;
                }
                if (lJson.interpolation !== undefined) {
                    this._interpolation = lJson.interpolation;
                }
                if (lJson.horizontalGrid !== undefined) {
                    this._horizontalGrid = lJson.horizontalGrid;
                }
                if (lJson.verticalGrid !== undefined) {
                    this._verticalGrid = lJson.verticalGrid;
                }
            }
            // aggiunge i flussi relativi all'istanza di line chart
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = LineChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
    };

    // aggiunge un nuovo flusso alla lista di flussi
    LineChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow.constructor.name === 'LineChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(newId, newFlow);
        }
    };
    // elimina il flusso con id === ID
    LineChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    LineChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    LineChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }
    };
    
    // funzione che permette l'aggiornamento di tipo in place dei dati
    LineChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    // funzione che permette l'aggiornamento di tipo stream dei dati
    LineChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
           var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    LineChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    LineChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    LineChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    LineChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    LineChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    LineChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    LineChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    LineChart.prototype.getX = function() {
        return this._axisX; // ritorna l'asse X
    };
    LineChart.prototype.getY = function() {
        return this._axisY; // ritorna l'asse Y
    };
    LineChart.prototype.getViewFinder = function() {
        return this._viewFinder; // ritorna true se il grafico deve essere creato con il view finder
    };
    LineChart.prototype.getBackground = function() {
        return this._backgroundColor; // ritorna il colore di background del grafico
    };
    LineChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la legend on point
    };
    LineChart.prototype.getInterpolation = function() {
        return this._interpolation; // ritorna il tipo di iterpolazione del grafico
    };
    LineChart.prototype.getHGrid = function() {
        return this._horizontalGrid; // ritorna true se deve essere visibile la griglia orizzontale del line chart
    };
    LineChart.prototype.getVGrid = function() {
        return this._verticalGrid; // ritorna true se deve essere visibile la griglia verticale del line chart
    };

    // costruttore di default del LineChartFactory
    function LineChartFactory(){}

    LineChartFactory.build = function(info) {
        return new LineChart(info); // ritorna una nuova istanza di LineChart
    };

    return LineChartFactory;
}]);
/*jshint node: true */
'use strict';

/*
* Name :  MapChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-19  Maria Giovanna Chinellato   Tested
*
* 0.2.0         2015-05-18  Maria Giovanna Chinellato   Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('MapChartFactory',['GraphFactory', 'MapChartFlowFactory', function(GraphFactory, MapChartFlowFactory){

    // funzione di utilità che ha lo scopo di separare le proprietà legate al grafico generale da quelle legate al bar chart
    function split(json) {
        var graphJson = {};
        if (json.title !== undefined) {
            graphJson.title = json.title;
        }
        if (json.height !== undefined) {
            graphJson.height = json.height;
        }
        if (json.width !== undefined) {
            graphJson.width = json.width;
        }
        if (json.enableLegend !== undefined) {
            graphJson.enableLegend = json.enableLegend;
        }
        if (json.legend !== undefined) {
            graphJson.legend = json.legend;
        }


        var mapJson = {};
        if (json.legendOnPoint !== undefined) {
            mapJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.latitude !== undefined) {
            mapJson.latitude = json.latitude;
        }
        if (json.longitude !== undefined) {
            mapJson.longitude = json.longitude;
        }
        if (json.mapType !== undefined) {
            mapJson.mapType = json.mapType;
        }
        if (json.zoom !== undefined) {
            mapJson.zoom = json.zoom;
        }
        if (json.drag !== undefined) {
            mapJson.drag = json.drag;
        }
        if (json.mapWidth !== undefined) {
            mapJson.mapWidth = json.mapWidth;
        }
        if (json.mapHeight !== undefined) {
            mapJson.mapHeight = json.mapHeight;
        }


        return {
            'graphJson' : graphJson,
            'mapJson' : mapJson
        };
    }

    // costruttore di default di un MapChart
    function MapChart(info) {
        this._legendOnPoint = false;
        this._latitude = 45.4113311;
        this._longitude = 11.8876318;
        this._mapType = 'roadmap';
        this._zoom = true;
        this._drag = true;
        this._mapWidth = 0;
        this._mapHeight = 0;

        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del map chart
    MapChart.prototype.updateParameters = function(info) {
        var json = split(info);
        var gJson = json.graphJson;
        var mJson = json.mapJson;
        if (Object.keys(gJson).length !== 0) {
            this._graph.updateParameters(gJson);
        } 
        if (Object.keys(mJson).length !== 0) {
            if (mJson.legendOnPoint !== undefined) {
                this._legendOnPoint = mJson.legendOnPoint;
            }
            if (mJson.latitude !== undefined) {
                this._latitude = mJson.latitude;
            }
            if (mJson.longitude !== undefined) {
                this._longitude = mJson.longitude;
            }
            if (mJson.mapType !== undefined) {
                this._mapType = mJson.mapType;
            }
            if (mJson.zoom !== undefined) {
                this._zoom = mJson.zoom;
            }
            if (mJson.drag !== undefined) {
                this._drag = mJson.drag;
            }
            if (mJson.mapWidth !== undefined) {
                this._mapWidth = mJson.mapWidth;
            }
            if (mJson.mapHeight !== undefined) {
                this._mapHeight = mJson.mapHeight;
            }
        }
        // aggiunge i flussi relativi all'istanza di map chart
        if (info.flows !== undefined) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = MapChartFlowFactory.build(info.flows[i]);
                this.addFlow(info.flows[i].ID, newflow);
            }
        }
    };

    // aggiunge un nuovo flusso alla lista di flussi
    MapChart.prototype.addFlow = function(ID, newFlow) {
        if (newFlow.constructor.name === 'MapChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(ID, newFlow);
        }
    };
    // elimina il flusso con id === ID
    MapChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    MapChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    MapChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }
    };

    // funzione che permette l'aggiornamento di tipo in place dei dati
    MapChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    // funzione che permette l'aggiornamento di tipo stream dei dati
    MapChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    MapChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    MapChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    MapChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    MapChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    MapChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    MapChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    MapChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    MapChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la legend on point
    };
    MapChart.prototype.getLatitude = function() {
        return this._latitude; // ritorna la latitudine del centro della mappa
    };
    MapChart.prototype.getLongitude = function() {
        return this._longitude; // ritorna la longitudine del centro della mappa
    };
    MapChart.prototype.getMapType = function() {
        return this._mapType; // ritorna il tipo della mappa (roadmap, terrain, satellite, hybrid)
    };
    MapChart.prototype.getZoomable = function() {
        return this._zoom; // ritorna true se è disponibile la funzionalità 'zoom' sulla mappa
    };
    MapChart.prototype.getDraggable = function() {
        return this._drag; // ritorna true se è disponibile la funzionalità 'drag' sulla mappa
    };    
    MapChart.prototype.getMapWidth = function() {
        return this._mapWidth; // ritorna la larghezza (in metri) della mappa (quanti metri devono essere visilìbili)
    };
    MapChart.prototype.getMapHeight = function() {
        return this._mapHeight; // ritorna l'altezza (in metri) della mappa (quanti metri devono essere visilìbili)
    };

    // costruttore di default di MapChartFactory
    function MapChartFactory() {}

    MapChartFactory.build = function(info) {
        return new MapChart(info); // ritorna una nuova istanza di MapChart
    };

    return MapChartFactory;
}]);
/*jshint node: true */
'use strict';

/*
* Name :  Table.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-21  Maria Giovanna Chinellato   Tested
*
* 0.3.0         2015-05-18  Maria Giovanna Chinellato   Modified general structure, some fixes
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato   Fix methods test
*
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code          
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('TableFactory', ['GraphFactory', 'TableFlowFactory', function(GraphFactory, TableFlowFactory){

    // funzione di utilità che ha lo scopo di separare le proprietà legate al grafico generale da quelle legate al bar chart
	function split(json) {
		var graphJson = {};
		if (json.title !== undefined) {
			graphJson.title = json.title;
		}
		if (json.height !== undefined) {
			graphJson.height = json.height;
		}
		if (json.width !== undefined) {
			graphJson.width = json.width;
		}
		if (json.horizontalGrid !== undefined) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== undefined) {
			graphJson.verticalGrid = json.verticalGrid;
		}


		var tableJson = {};
		if (json.headers !== undefined) {
			tableJson.headers = json.headers;
		}
		if (json.maxItemsPage !== undefined) {
			tableJson.maxItemsPage = json.maxItemsPage;
		}
		if (json.addRowOn !== undefined) {
			tableJson.addRowOn = json.addRowOn;
		}
		if (json.sortable !== undefined) {
			tableJson.sortable = json.sortable;
		}
        if (json.sort !== undefined) {
            tableJson.sort = json.sort;
        }
        if (json.appearance !== undefined) {
            tableJson.appearance = json.appearance;
        }

		return {
			'graphJson' : graphJson,
			'tableJson' : tableJson
		};
	}

    // costruttore di default di una Table
    function Table(info) {
        this._headers = [];
        this._maxItemsPage = 20;
        this._addRowOn = 'top';
        this._sortable = true;
        this._sort = null;
        this._appearance = null;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati dela table
    Table.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var tJson = json.tableJson;
            
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            } 
            if (Object.keys(tJson).length !== 0) {
                if (tJson.headers !== undefined) {
                    this._headers = [];
                    for (var z=0; z<tJson.headers.length; z++) { 
                        this._headers.push(tJson.headers[z]);
                    }
                }
                if (tJson.maxItemsPage !== undefined) {
                    this._maxItemsPage = tJson.maxItemsPage;
                }
                if (tJson.addRowOn !== undefined) {
                    this._addRowOn = tJson.addRowOn;
                }
                if (tJson.sortable !== undefined) {
                    this._sortable = tJson.sortable;
                }
                if (tJson.sort !== undefined) {
                    this._sort = tJson.sort;
                }
                if (tJson.appearance !== undefined) {
                    this._appearance = tJson.appearance;
                }
            }
            if (info.flows !== undefined) {
                for (var y=0; y<info.flows.length; y++) {
                    var newflow = TableFlowFactory.build(info.flows[y]);
                    this.addFlow(info.flows[y].ID, newflow);
                }
            }
        }
    };

    // aggiunge un nuovo flusso alla lista di flussi
    Table.prototype.addFlow = function(ID, newFlow) {
        if (newFlow.constructor.name === 'TableFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(ID, newFlow);
        }
    };
    // elimina il flusso con id === ID
    Table.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    Table.prototype.replaceData = function(newData){
        for (var i = 0;i<this._graph.getFlowList().length; i++) {
            if (this._graph.getFlowList()[i].id === newData.ID){
                this._graph.getFlowList()[i].flow.emptyData();
                this._graph.getFlowList()[i].flow.initializeData(newData, this._addRowOn);
            }
        }
    };

    // inizializza i dati dei flussi presenti nella lista
    Table.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<this._graph.getFlowList().length; j++) {
                    if (this._graph.getFlowList()[j].id === newData[i].ID) {
                        this._graph.getFlowList()[j].flow.initializeData(newData[i], this._addRowOn);
                    }
                }
            }
        }
    };

    // funzione che permette l'aggiornamento di tipo in place dei dati
    Table.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    // funzione che permette l'aggiornamento di tipo stream dei dati
    Table.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData, this._addRowOn);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    Table.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    Table.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    Table.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    Table.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    Table.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    Table.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    Table.prototype.getHeaders = function() {
    return this._headers; // ritorna gli header della tabella
    };
    Table.prototype.getMaxItemsPage = function() {
        return this._maxItemsPage; // ritorna il massimo numero di elementi visualizzabili per pagina di tabella
    };
    Table.prototype.getAddRowOn = function() {
        return this._addRowOn; // ritorna la posizione di aggiunta record (top o bottom)
    };
    Table.prototype.getSortable = function() {
        return this._sortable; // ritorna true se è disponibile la funzionalità di ordinamento della tabella per colonne
    };
    Table.prototype.getSort = function() {
        return this._sort; // ritorna le colonne su cui è possibile ordinare la tabella
    };
    Table.prototype.getAppearance = function() {
        return this._appearance; // ritorna un array che definisce l'aspetto delle celle
    };

    // costruttore di default di TableFactory
    function TableFactory() {}

    TableFactory.build = function(info) {
        return new Table(info); // ritorna una nuova istanza di Table
    };

    return TableFactory;
}]);
/*jshint node: true */
'use strict';

/*
* Name :  Page.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model/PagesModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-05-20  Francesco Rossetto          Tested
*
* 0.1.4         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.3         2015-05-14  Francesco Rossetto          Fix addGraph
*
* 0.1.2         2015-05-13  Francesco Rossetto          Fix constructor
*
* 0.1.1         2015-05-12  Francesco Rossetto          Fix methods
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code     
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('PageFactory', function(){

    // Costruttore di page
    function Page(info){
        // campi dati di Page e valori di default
        this._graphsList = [];
        this._name = 'Titolo di default';
        this._description = '';
        this._graphsPerRow = 1;
        this._graphsPerCol = 5;
        this._url = null;


        if (info !== undefined) { // controlla che un json sia definito, se non lo è non modifica nessun campo dati
            if (info.properties.name !== undefined) { // controlla che il campo 'name' sia definito
                this._name = info.properties.name; // imposta la proprietà name
            }
            if (info.properties.description !== undefined) { // controlla che il campo 'description' sia definito
                this._description = info.properties.description; // imposta la proprietà description
            }
            if (info.properties.graphsPerRow !== undefined) { // controlla che il campo 'graphsPerRow' sia definito
                this._graphsPerRow = info.properties.graphsPerRow; // imposta la proprietà graphsPerRow
            }
            if (info.properties.graphsPerCol !== undefined) { // controlla che il campo 'graphsPerCol' sia definito
                this._graphsPerCol = info.properties.graphsPerCol; // imposta la proprietà graphsPerCol
            }
            if (info.properties.socketURL !== undefined) { // controlla che il campo 'socketURL' sia definito
                this._url = info.properties.socketURL; // imposta la proprietà socketURL
            }
            if (info.data !== undefined) { // controlla che il campo 'data' sia definito
                for (var i=0; i<info.data.length; i++){
                    this.addGraph(info.data[i]); // aggiunge un grafico alla graphsList
                }
            }
        }
    }

    // funzione che aggiorna i campi dati prsenti nel JSON info
    Page.prototype.updateParameters = function(info){
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.description !== undefined) {
                this._description = info.description;
            }
            if (info.graphsPerRow !== undefined) {
                this._graphsPerRow = info.graphsPerRow;
            }
            if (info.graphsPerCol !== undefined) {
                this._graphsPerCol = info.graphsPerCol;
            }
        }
    };

    // funzione che inizializza i dati della pagina aggiungendo i grafici presenti nel JSON data alla lista dei grafici
    Page.prototype.initializeData = function(data) {
        if (data !== undefined) {
            for (var i=0; i<data.length; i++) {
                this.addGraph(data[i]);
            }
        }
    },
    // funzione che aggiunge un grafico a graphsList
    Page.prototype.addGraph = function(graph){
        if (graph !== undefined) { // controlla che il JSON sia definito
            var count = 0;
            for (var j=0; j<this._graphsList.length; j++) { // conta i grafici presenti nella lista che hanno lo stesso id del nuovo grafico
                if (this._graphsList[j].id === graph.ID){
                    count++;
                }
            }
            if (count === 0){ // controlla che non sia già presente nella lista un grafico con lo stesso id
                this._graphsList.push( {'id' : graph.ID, 'type' : graph.type, 'url' : graph.socketURL} );
            }
        // error
        }
        // error
    };

    Page.prototype.getGraphsList = function(){
        return this._graphsList; // ritorna la lista dei grafici
    };
    Page.prototype.getName = function(){
        return this._name; // ritorna il nome della pagina
    };
    Page.prototype.getDescription = function(){
        return this._description; // ritorna la descrizione della pagina
    };
    Page.prototype.getGraphsPerRow = function(){
        return  this._graphsPerRow; // ritorna il numero di grafici visualizzabili per riga
    };
    Page.prototype.getGraphsPerCol = function(){
        return  this._graphsPerCol; // ritorna il numero di grafici visualizzabili per colonna
    };
    Page.prototype.getUrl = function(){
        return this._url; // ritorna l'url che invia i dati relativi alla pagina
    };

    // costruttore di default di PageFactory
    function PageFactory() {}

    PageFactory.build = function(info) {
        return new Page(info); // ritorna un'istanza di Page
    };

    return PageFactory;
});
/*jshint node: true */
'use strict';

/*
* Name :  PagesList.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model/PagesModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-05-19  Maria Giovanna Chinellato	Tested
*
* 0.1.1         2015-05-18  Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('PagesList', ['PageFactory', function(PageFactory){

	// campi dati di Pageslist
	var pagesList = [];

	// Costruttore di PagesList
	function PagesList(info) {

		if (info !== undefined) { // controlla che il JSON 'info' sia defito
			if (info.data !== undefined) { // controlla che il campo 'data' del JSON sia definito
				for (var i=0; i<info.data.length; i++){ // scorre l'array di pagine da inserire della lista
					var count = 0;
					for (var j=0; j<pagesList.length; j++) { // conta le pagine presenti in lista con lo stesso id della nuova pagina
						if (pagesList[j].id === info.data[i].properties.ID){
							count++;
						}
					}
	    			if(count === 0) { // controlla che non siano presenti pagine con lo stesso id della nuova pagina 
	    				var page = PageFactory.build(info.data[i]); // crea una nuova pagina
	       				pagesList.push({ 'id' : info.data[i].properties.ID, 'page' : page}); // inserisce la pagina nella lista delle pagine
					} 
					// error
				}
			}
		}
	}
	
	PagesList.prototype.addPage = function(page) {
		var count = 0;
		for (var j=0; j<pagesList.length; j++) {
			if (pagesList[j].id === page.properties.ID){
				count++;
			}
		}
		if (count === 0){
			var newPage = PageFactory.build(page); // crea una nuova pagina
			pagesList.push({ 'id' : page.properties.ID, 'page' : newPage}); // aggiunge la nuova pagina alla lista
		}
		// error
	};

	// chiama la funzione updatePage della pagina che necessità di aggiornamenti
	PagesList.prototype.updatePage = function(info) {
		for (var j=0; j<pagesList.length; j++) {
			if (pagesList[j].id === info.ID){
				pagesList[j].page.updateParameters(info);
			}
		}
	};

	PagesList.prototype.getPagesList = function(){
		return pagesList; // ritorna la lista della pagine
	};

	return( PagesList );
}]);
/*jshint node: true */
'use strict';

/*
* Name :  SocketServices.js
* Module : FrontEnd::Model
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('SocketServicesFactory', function ($rootScope) {

    function SocketServices(url) {
        var socket = io.connect(url);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }

    function SocketServicesFactory() {}

    SocketServicesFactory.build = function (url) {
        return new SocketServices(url);
    };

    return SocketServicesFactory;

});
/*jshint node: true */
'use strict';

/*
* Name :  UrlProvider.js
* Module : FrontEnd::Model
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-21 Francesco Rossetto			Tested
*
* 0.1.0         2015-06-09 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-09  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.factory('UrlProvider', function(){
	
	function UrlProvider() {
		this._url = '';
	}
	
	UrlProvider.prototype.setUrl = function(newUrl) {
		this._url = newUrl;
	};
	UrlProvider.prototype.getUrl = function() {
		return this._url;
	};
	return UrlProvider;
});
/*jshint node: true */
'use strict';

/*
* Name :  BarChartController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-30  Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('BarChartController', ['$scope', '$location', 'BarChartFactory', 'BarChartFlowFactory', 'SocketServicesFactory', 'ColorPicker', function($scope, $location, BarChartFactory, BarChartFlowFactory, SocketServicesFactory, ColorPicker){

	var socket;

	// crea un bar chart di default
	var barChart = BarChartFactory.build();
	$scope.barChart = barChart;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.socket = socket;
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	
	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0){
				$scope.barChart.updateParameters(info.properties); // aggiorna le proprietà del bar chart di default con i dati appena ricevuti
				$scope.barChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				count = 1;
			}
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.barChart.updateParameters(info); // aggiorna le proprietà del bar chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = BarChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializza il flusso
			$scope.barChart.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.barChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.barChart.getFlowList()[i].id === info.ID){
					$scope.barChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà di un flusso
				}
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.barChart.addRecords(data); // aggiunge record
					break;
				case 'deleteRecord':
					$scope.barChart.deleteData(data); // elimina dati
					break;
				case 'updateRecord':
					$scope.barChart.inPlaceUpdate(data); // effettua aggiornamento in place
					break;
				case 'replaceData':
					$scope.barChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
	};

	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	$scope.defaultColorFlow = ColorPicker.getDefaultColor();

}]);
/*jshint node: true */
'use strict';

/*
* Name :  LineChartController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-30  Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('LineChartController', ['$scope', '$location', 'LineChartFactory', 'LineChartFlowFactory', 'SocketServicesFactory', 'ColorPicker', function($scope, $location, LineChartFactory, LineChartFlowFactory, SocketServicesFactory, ColorPicker){

	var socket;
	var lineChart = LineChartFactory.build(); // crea un line chart di default
	$scope.lineChart = lineChart;
	
	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.socket = socket;
		this.listenOnEvents();
	};
	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0){
				$scope.lineChart.updateParameters(info.properties); // aggiorna le proprietà del line chart di default con i dati appena ricevuti
				$scope.lineChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				count++;
			}
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.lineChart.updateParameters(info);  // aggiorna le proprietà del line chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = LineChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializzail flusso
			$scope.lineChart.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('deleteFlow', function(info){
			$scope.lineChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.lineChart.getFlowList()[i].id === info.ID){
					$scope.lineChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('updateFlowData', function(data){
			switch (data.action){
				case 'insertRecords':
					$scope.lineChart.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.lineChart.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.lineChart.inPlaceUpdate(data);  // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.lineChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
	};
	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	$scope.defaultColorFlow = ColorPicker.getDefaultColor();
}]);
/*jshint node: true */
'use strict';

/*
* Name :  MapChartController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-05-25  Francesco Rossetto		   Tested
*
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('MapChartController', function($scope, $location, MapChartFactory, MapChartFlowFactory, SocketServicesFactory){

	var socket;
	var mapChart = MapChartFactory.build(); // crea un map chart di default
	$scope.mapChart = mapChart;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	var count1 = 0;
	this.socketConnection = function(url){
		if (count1 === 0) {
			socket = SocketServicesFactory.build(url);
			$scope.socket = socket;
			this.listenOnEvents();
			count1++;
		}
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	$scope.changedF = true;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0) {
				count++;
				$scope.mapChart.updateParameters(info.properties); // aggiorna le proprietà del map chart di default con i dati appena ricevuti
				$scope.mapChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
	        }
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.mapChart.updateParameters(info); // aggiorna le proprietà del map chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = MapChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializzail flusso
			$scope.mapChart.addFlow(info.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.mapChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.mapChart.getFlowList().length; i++){
				if ($scope.mapChart.getFlowList()[i].id === info.ID){
					$scope.mapChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.mapChart.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.mapChart.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.mapChart.inPlaceUpdate(data); // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.mapChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});

	};
	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

});
/*jshint node: true */
'use strict';

/*
* Name :  TableController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-04 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('TableController', ['$scope', '$location', 'TableFactory', 'TableFlowFactory', 'SocketServicesFactory', function($scope, $location, TableFactory, TableFlowFactory, SocketServicesFactory){

	var socket;
	var table = TableFactory.build(); // crea una table di default
	$scope.table = table;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.socket = socket;
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changed = true;
	$scope.changedP = false;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0) {
				count++;
				$scope.table.updateParameters(info.properties); // aggiorna le proprietà della table di default con i dati appena ricevuti
				$scope.table.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedP = true;
				$scope.changed = !$scope.changed; // 'notifica' cambiamento dati e proprietà
	        }
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.changedP = true;
			$scope.table.updateParameters(info); // aggiorna le proprietà della table con i dati appena ricevuti
			$scope.changed = !$scope.changed; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = TableFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info, $scope.table.getAddRowOn()); // inizializzail flusso
			$scope.table.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.table.deleteFlow(info.ID); // elimina un flusso
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.table.getFlowList().length; i++){
				if ($scope.table.getFlowList()[i].id === info.ID){
					$scope.table.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.table.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.table.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.table.inPlaceUpdate(data); // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.table.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});

	};

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);
/*jshint node: true */
'use strict';

/*
* Name :  PageController.js
* Module : FrontEnd::Controller::PagesController
* Location : /frontend/app/Controller/PagesController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-31  Francesco Rossetto		   Add all attributes and all methods
*
* 0.0.1         2015-05-31  Francesco Rossetto		   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('PageController', ['$scope', '$location', '$routeParams', 'PagesList', 'PageFactory', 'SocketServicesFactory', function($scope, $location, $routeParams, PagesList, PageFactory, SocketServicesFactory){

	var page = PagesList.prototype.getPagesList()[$routeParams.pageId].page; // recupera la pagina corrente
	//var page = PageFactory.build();
	$scope.page = page;
	/*$scope.previous = false;
	$scope.next = false;
	var a = $routeParams.pageId - 1;
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) - 1] !== undefined) {
		$scope.previous = true; // se è presente una pagina precedente mette il flag a true
	}
	var b = $routeParams.pageId + 1;
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) + 1] !== undefined) {
		$scope.next = true; // se è presente una pagina successiva mette il flag a true
	}*/
	var url = $scope.page.getUrl(); // recupera l'url a cui deve connettersi il socket

	var socket;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(){
		socket = SocketServicesFactory.build($scope.url);
		$scope.socket = socket;
		this.listenOnEvents();
	};

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configPage', function(info){ // ascolta sull'evento 'configPage' (ricevuto come risposta alla connessione)
			$scope.page.updateParameters(info.properties); // modifica i campi di default con i valori esatti della pagina
			$scope.page.initializeData(info.data); // inizializza i dati della pagina (aggiunge i grafici presenti in essa)
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
		/*socket.on('updatePageProp', function(info){ // ascolta sull'evento 'updatePageProp'
			$scope.page.updateParameters(info); // aggiorna le proprietà della pagina
		});*/
		socket.on('insertGraph', function(info){ // ascolta sull'evento 'insertGraph'
			$scope.page.addGraph(info); // inserisce un nuovo grafico alla lista dei grafici presente in $scope.page
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
	};

	/*this.previous = function(id){
		$location.path('/page/' + id);
	};

	this.next = function(id){
		$location.path('/page/' + id);
	};*/

	// funzione di utilità che dispone i grafici in un array per la successiva visualizzazione
	function matrix(list) {
		var array = [];
		var count = 0;
		var graphsPerCol = $scope.page.getGraphsPerCol();
		var graphsPerRow = $scope.page.getGraphsPerRow();
		if (graphsPerCol === -1){
			graphsPerRow = 1;
			graphsPerCol = list.length;
		}
		if (graphsPerRow === -1){
			graphsPerRow = list.length;
			graphsPerCol = 1;
		}
		for (var i=0;count<list.length && i<graphsPerCol; i++) {
			array[i] = [];
			for (var j=0;count<list.length && j<graphsPerRow; j++) {
				array[i].push(list[graphsPerRow*i+j]);
				count++;
			}
		}
		return array;
	}
	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;
	$scope.url = url;
	this.matrix = matrix;

	// vengono rese disponibili alcune funzioni sullo $scope
	$scope.graphs = [];
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

	//$scope.previous = this.previous;
	//$scope.next = this.next;
	
}]);
/*jshint node: true */
'use strict';

/*
* Name :  PagesListController.js
* Module : FrontEnd::Controller::PagesController
* Location : /frontend/app/Controller/PagesController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-20  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-20  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('PagesListController', ['$scope', '$location', 'PagesList', 'SocketServicesFactory', 'UrlProvider', function($scope, $location, PagesList, SocketServicesFactory, UrlProvider){

	var socket;
	var pagesList;

	var url = UrlProvider.prototype.getUrl(); // recupera l'url a cui deve connettersi il socket

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function() {
		socket = SocketServicesFactory.build($scope.url);
		$scope.socket = socket;
		this.listenOnEvents();
	};

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function() {
		socket.on('configPageList', function(info){ // ascolta sull'evento 'configPageList' (ricevuto come risposta alla connessione)
			pagesList = new PagesList(info); // crea una nuova PagesList
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
      $scope.name = info.name;
		});
		socket.on('insertPage', function(info) { // ascolta sull'evento 'insertPage'
			pagesList.addPage(info); // aggiunge una pagina alla lista
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
		});
		socket.on('updatePage', function(info) { // ascolta sull'evento 'updatePage'
			pagesList.updatePage(info);
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
		});

	};
	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;
	$scope.url = url;

	// vengono rese disponibili alcune funzioni sullo $scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);
/*jshint node: true */
'use strict';

/*
* Name :  RootController.js
* Module : FrontEnd::Controller
* Location : /frontend/app/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-12 Francesco Rossetto			Tested
*
* 0.1.0         2015-06-09 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-09  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('RootController', ['$scope', 'UrlProvider', function($scope, UrlProvider){
    $scope.url = '';
    $scope.$watch('url', function(newValue, oldValue) {            
        UrlProvider.prototype.setUrl(newValue);
    }, true);
}]);
/*jshint node: true */
'use strict';

/*
* Name :  BarChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.3         2015-06-22  Maria Giovanna Chinellato   Fix flow color     
*
* 1.0.2         2015-06-21  Maria Giovanna Chinellato   Fix legend update     
*
* 1.0.1         2015-06-19  Maria Giovanna Chinellato   Fix svg tag     
*
* 1.0.0         2015-06-13  Maria Giovanna Chinellato   Tested     
*
* 0.2.0         2015-06-10  Francesco Rossetto          Add init, setData and legend function    
*
* 0.1.1         2015-06-10  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.1.0         2015-06-09  Francesco Rossetto          Add all attributes and add initial code for methods 
*
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('barChart', function($compile){
    return {
        restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: { // attributo della direttiva
            url: '@'
        },
        //bindToController: true,
        link: function(scope, element, attrs){
            element.empty();
            attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    element.empty();
                    scope.init(); // crea  il grafico chiamando la funzione apposita
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    scope.setData(); // richiama la funzione che imposta i dati ad ogni cambiamento dei dati dei flussi del grafico
                    if (element.children()[2]){
                      element.children()[2].remove();
                    }
                    if (scope.$parent.barChart.getLegend() !== null){
                        scope.legend();  // richiama la funzione che crea la legenda relativa al grafico
                    }
                }
            }, true);

            scope.$on('$destroy', function() {
                for (var j=0; j<element.children().length; j++){
                    var nvd3 = element.children()[j];
                    nvd3.select('*').remove();
                    nvd3.select('svg').remove();
                }
            }); 
            // inserisce il codice HTML che crea il grafico desiderato
            scope.init = function(){
                element.empty(); // elimina i tag HTML relativi al bar chart
                var barchart = null;
                var legend, onPoint, control;
                var str = scope.url.split('/');
                var id = str[str.length-1];
                var width;
                var height;
                //var width = scope.$parent.barChart.getWidth();
                //var height = scope.$parent.barChart.getHeight();
                var xLabel = 'X axis';
                var yLabel = 'Y axis';
                if (scope.$parent.barChart.getX() !== null && scope.$parent.barChart.getX().getName() !== null){
                    xLabel = scope.$parent.barChart.getX().getName();
                }
                if (scope.$parent.barChart.getY() !== null && scope.$parent.barChart.getY().getName() !== null){
                    xLabel = scope.$parent.barChart.getY().getName();
                }
                if (scope.$parent.barChart.getWidth() !== 0){
                    width = scope.$parent.barChart.getWidth() + 'px';
                }
                else{
                    width = '100%';
                }
                if (scope.$parent.barChart.getHeight() !== 0){
                    height = scope.$parent.barChart.getHeight() + 'px';
                }
                else{
                    height = '100%';
                }
                if (scope.$parent.barChart.getLegend() !== null){
                    legend = true;
                }
                else{
                    legend = false;
                }
                if (scope.$parent.barChart.getGroupingControl()){
                    control = true;
                }
                else{
                    control = false;
                }
                if (scope.$parent.barChart.getLegendOnPoint()){
                    onPoint = true;
                }
                else{
                    onPoint = false;
                }
                if (scope.$parent.barChart.getBarOrientation() === 'V'){
                    barchart = '<div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-chart data="data" nodata=" " '+
                                'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ xLabel +'" yaxislabel="'+ yLabel +'" ' +
                                'color="colorFunction()" showcontrols="'+ control +'">' +
                                '<svg id="'+ id +'" ' + ' style="width: '+ width +'; height: '+ height +';"></svg></nvd3-multi-bar-chart>';
                }else if(scope.$parent.barChart.getBarOrientation() === 'H'){
                    barchart = '<div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-horizontal-chart data="data" nodata=" " '+
                                'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ xLabel + '" yaxislabel="'+ yLabel +'" ' +
                                'color="colorFunction()" showcontrols="'+ control +'">' +
                                '<svg id="'+ id +'" ' + ' style="width: '+ width +'; height: '+ height +';"></svg></nvd3-multi-bar-horizontal-chart>';
                }
                



                var compiled = $compile(barchart)(scope);
                element.append(compiled);

            };
            
            // imposta il colore dei flussi
            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray[i];
                };
            };

            // funzione che imposta il tick dell'asse X
            scope.xAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // funzione che imposta il tick dell'asse Y
            scope.yAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // imposta i dati da visualizzare
            scope.data = [];
            scope.setData = function(){
                var data = [];
                var colorArray = [];
                for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                    var key;
                    var values = [];
                    key = scope.$parent.barChart.getFlowList()[i].flow.getName();
                    if (scope.$parent.barChart.getFlowList()[i].flow.getFlowColor() !== undefined && scope.$parent.barChart.getFlowList()[i].flow.getFlowColor() !== null){
                       colorArray.push(scope.$parent.barChart.getFlowList()[i].flow.getFlowColor());
                    }
                    else{
                       colorArray.push(scope.$parent.defaultColorFlow[i]);
                    }
                    for (var j=0; j<scope.$parent.barChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    values.sort(function(a, b) {
                      if (isNaN(a[0]) && isNaN(b[0])){
                        if (a[0] === b[0]) {
                            return 0;
                        }
                        else {
                            return (a[0] < b[0]) ? -1 : 1;
                        }
                      }
                      else{
                        if (parseFloat(a[0]) === parseFloat(b[0])) {
                            return 0;
                        }
                        else {
                            return (parseFloat(a[0]) < parseFloat(b[0])) ? -1 : 1;
                        }
                      }
                    });


                    for (var y=0; y<values.length; y++){
                        values[y][0] = scope.$parent.barChart.getHeaders()[values[y][0]];
                    }
                    data.push({ 'key': key, 'values': values});
                }
                scope.colorArray = colorArray;
                scope.data = data;
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nord-ovest, sud-est o sud-ovest del grafico
            function changePosition(chart,parent){

                switch (scope.$parent.barChart.getLegend().getPosition()) {
                    case 'N':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; right: -' + (scope.$parent.barChart.getWidth()/2) + 'px; background-color: ' +
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + ((scope.$parent.barChart.getHeight()/2)+25) + 
                          'px; right: -' + scope.$parent.barChart.getWidth() + 'px;  background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.barChart.getWidth()/2) +
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.barChart.getHeight()/2) + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; right: -' + (scope.$parent.barChart.getWidth()+25) + 'px; background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.barChart.getWidth()+25) + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {

                var chart = element.children()[1];
                var parent = document.createElement('div');

                changePosition(chart,parent);
                parent.setAttribute('class','barChartLegend');

                if (scope.$parent.barChart.getLegend() !== null) {
                    var div = document.createElement('div');
                    div.setAttribute('class','legend-chart');
                    for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                        if (scope.$parent.barChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.colorArray[i] + ';');
                            square.setAttribute('class', 'square-flow-legend-chart');
                            var spanText = document.createElement('div');
                            var text = document.createTextNode(scope.$parent.barChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'color: '+ scope.$parent.barChart.getLegend().getFontColor() + ';');
                            spanText.setAttribute('class', 'text-flow-legend-chart');
                            spanText.appendChild(text);
                            div.appendChild(square);
                            div.appendChild(spanText);
                            parent.appendChild(div);
                        }
                    }
                }
                element.append(parent);
            };
        }
    };
});
/*jshint node: true */
'use strict';

/*
* Name :  LineChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.3         2015-06-22  Maria Giovanna Chinellato   Fix flow color     
*
* 1.0.2         2015-06-21  Maria Giovanna Chinellato   Fix legend update     
*
* 1.0.1         2015-06-19  Maria Giovanna Chinellato   Fix svg tag     
*
* 1.0.0         2015-06-13  Maria Giovanna Chinellato   Tested     
*
* 0.1.0         2015-06-05  Maria Giovanna Chinellato   Add init, setData and legend function     
*
* 0.0.2         2015-06-03  Francesco Rossetto          Add link function, observe and watch      
*
* 0.0.1         2015-06-02  Francesco Rossetto          Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('lineChart', function($compile){
    return {
        restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: { // attributo della direttiva
            url: '@'
        },
        //bindToController: true,
        link: function(scope, element, attrs){

            element.empty();
            attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    element.empty(); // elimina i tag HTML relativi al line chart
                    scope.init(); // crea  il grafico chiamando la funzione apposita
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    scope.setData(); // richiama la funzione che imposta i dati ad ogni cambiamento dei dati dei flussi del grafico
                    if (element.children()[2]){
                      element.children()[2].remove();
                    }
                    if (scope.$parent.lineChart.getLegend() !== null){
                        scope.legend();  // richiama la funzione che crea la legenda relativa al grafico
                    }
                }
            }, true);

            scope.$on('$destroy', function() {
                for (var j=0; j<element.children().length; j++){
                    var nvd3 = element.children()[j];
                    nvd3.select('*').remove();
                }
            }); 

            // inserisce il codice HTML che crea il grafico desiderato
            scope.init = function(){

                var linechart, legend, onPoint, ticks;
                var str = scope.url.split('/');
                var id = str[str.length-1];
                var width;
                var height;
                //var width = scope.$parent.lineChart.getWidth();
                //var height = scope.$parent.lineChart.getHeight();
                var xLabel = 'X axis';
                var yLabel = 'Y axis';
                if (scope.$parent.lineChart.getX() !== null && scope.$parent.lineChart.getX().getName() !== null){
                    xLabel = scope.$parent.lineChart.getX().getName();
                }
                if (scope.$parent.lineChart.getY() !== null && scope.$parent.lineChart.getY().getName() !== null){
                    xLabel = scope.$parent.lineChart.getY().getName();
                }
                if (scope.$parent.lineChart.getWidth() !== 0){
                    width = scope.$parent.lineChart.getWidth() + 'px';
                }
                else{
                    width = '100%';
                }
                if (scope.$parent.lineChart.getHeight() !== 0){
                    height = scope.$parent.lineChart.getHeight() + 'px';
                }
                else{
                    height = '100%';
                }
                if (scope.$parent.lineChart.getLegend() !== null){
                    legend = true;
                } else {
                    legend = false;
                }
                if (scope.$parent.lineChart.getLegendOnPoint()){
                    onPoint = true;
                } else {
                    onPoint = false;
                }
                if (scope.$parent.lineChart.getX() !== null && scope.$parent.lineChart.getX() !== undefined){
                    ticks = scope.$parent.lineChart.getX().getTicks();
                }
                else{
                    ticks = 10;
                }
                if (scope.$parent.lineChart.getViewFinder() === true) {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-with-focus-chart data="data" nodata=" " id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" x2axistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:50,top:50,bottom:50,right:50}" margin2="{left:50,top:50,bottom:50,right:50}" xaxisticks="' + ticks + '" x2axisticks="' + ticks + '" interactive="true" tooltips="'+ onPoint +'" ' +
                                'showlegend="' + legend + '" color="colorFunction()" xaxislabel="' + xLabel + '" yaxislabel="' + yLabel + '" ' + 
                                'xaxisrotatelabels="-90" x2axisrotatelables="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'">' + // perchè colorFunction ritorna null per adesso
                                '<svg style="width:'+ width +'px; height:'+ height +'px;"></svg></nvd3-line-with-focus-chart>';
                } else {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-chart data="data" nodata=" " id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:50,top:50,bottom:50,right:50}" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxisrotatelabels="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' +
                                'color="colorFunction()" x2axislabel="' + xLabel + '" yaxislabel="' + yLabel + '" ' +
                                'showxaxis="true" showyaxis="true" xaxisticks="' + ticks + '">' +
                                '<svg style="width:'+ width +'px; height:'+ height +'px;"></svg></nvd3-line-chart>';
                }

                var compiled = $compile(linechart)(scope);
                element.append(compiled);

                
            };

            // funzione che imposta il tick dell'asse X
            scope.xAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // funzione che imposta il tick dell'asse Y
            scope.yAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // imposta il colore dei flussi
            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray[i];
                };
            };

            // imposta i dati da visualizzare
            scope.data;
            scope.setData = function(){
                var data = [];
                var colorArray = [];

                for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                    var key = scope.$parent.lineChart.getFlowList()[i].flow.getName();
                    var area = scope.$parent.lineChart.getFlowList()[i].flow.getArea();
                    if (scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor() !== undefined && scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor() !== null){
                       colorArray.push(scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor());
                    }
                    else{
                       colorArray.push(scope.$parent.defaultColorFlow[i]); 
                    }
                    var values = [];
                    for (var j=0; j<scope.$parent.lineChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    data.push({ 'key': key, 'area' : area, 'values': values});
                }
                scope.data = data;
                scope.colorArray = colorArray;
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nosrd-ovest, sud-est o sud-ovest del grafico
            function changePosition(chart,parent){
                switch (scope.$parent.lineChart.getLegend().getPosition()) {
                    case 'N':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; right: -' + (scope.$parent.lineChart.getWidth()+25) + 'px;  background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + (scope.$parent.lineChart.getWidth()+25) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.lineChart.getWidth()+25) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {
                var chart = element.children()[1];

                var parent = document.createElement('div');

                changePosition(chart,parent);

                if (scope.$parent.lineChart.getLegend() !== null) {
                    var div = document.createElement('div');
                    div.setAttribute('class','legend-chart');

                    for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                        if (scope.$parent.lineChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.colorArray[i] + ';');
                            square.setAttribute('class', 'square-flow-legend-chart');
                            var spanText = document.createElement('div');
                            var text = document.createTextNode(scope.$parent.lineChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'color: '+ scope.$parent.lineChart.getLegend().getFontColor() + ';');
                            spanText.setAttribute('class', 'text-flow-legend-chart');
                            spanText.appendChild(text);
                            div.appendChild(square);
                            div.appendChild(spanText);
                            parent.appendChild(div);
                        }
                    }
                }
                element.append(parent);
            };
        }
    };
});
/*jshint node: true */
'use strict';

/*
* Name :  MapChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.2         2015-06-22  Maria Giovanna Chinellato   Fix legendOnPoint
*
* 1.0.1         2015-06-21  Maria Giovanna Chinellato   Fix legend function
*
* 1.0.0         2015-06-14  Maria Giovanna Chinellato   Tested
*
* 0.1.0         2015-06-06  Francesco Rossetto          Add utility function    
*
* 0.0.3         2015-06-04  Maria Giovanna Chinellato   Add init, render and legend function
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('mapChart', function(){
    return {
        restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: { // attributo della direttiva
            url: '@'
        },
        template: '<div>{{title}}</div><div></div><div></div>', // template HTML inserito dalla direttiva
        //bindToController: true,
        link: function (scope, element, attrs) {

            attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.title = scope.$parent.mapChart.getTitle(); // inserisce il titolo
                    scope.init(); // crea la mappa

                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    var parent = element.children()[2];
                    while(parent.firstChild) {
                      parent.removeChild(parent.firstChild);
                    }
                    if (scope.$parent.mapChart.getLegend() !== null){
                        scope.legend();  // richiama la funzione che crea la legenda relativa al grafico
                    }
                    scope.render(); // inserisce i dati sulla mappa
                }
            }, true);

            var map;
            var markers = [];
            var polylines = [];

            function getBoundsZoomLevel(bounds, mapDim) {
                var WORLD_DIM = { height: 256, width: 256 };
                var ZOOM_MAX = 21;

                function latRad(lat) {
                    var sin = Math.sin(lat * Math.PI / 180);
                    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
                }

                function zoom(mapPx, worldPx, fraction) {
                    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
                }

                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();

                var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

                var lngDiff = ne.lng() - sw.lng();
                var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

                var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
                var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

                return Math.min(latZoom, lngZoom, ZOOM_MAX);
            }

            // imposta lo zoom dinamicamente (in base all'altezza e larghezza che si desidera visualizzare)
            function setZoom(width,height){
                var latLng = new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude());
                var mapDim = { height: height, width: width };
                
                var spherical = google.maps.geometry.spherical; 
                var west  = spherical.computeOffset(latLng, width/2, -90);
                var east  = spherical.computeOffset(latLng, width/2, 90);

                var bounds = new google.maps.LatLngBounds();
                bounds.extend(west);
                bounds.extend(east);

                return getBoundsZoomLevel(bounds,mapDim);
            }

            // crea la mappa da visualizzare
            scope.init = function(){

                var mapCanvas = element.children()[1];

                //var width = scope.$parent.mapChart.getWidth();
                //var height = scope.$parent.mapChart.getHeight();
                var width=430;
                var widthDIM='100%';
                var height=430;
                if (scope.$parent.mapChart.getWidth() !== 0){
                    mapCanvas.setAttribute('class', 'mapChartCanvas');
                    width = scope.$parent.mapChart.getWidth();
                    widthDIM = scope.$parent.mapChart.getWidth()+'px';
                }
                else{
                    mapCanvas.setAttribute('class', 'mapChartAuto');
                    //width = '430';
                }
                if (scope.$parent.mapChart.getHeight() !== 0){
                    mapCanvas.setAttribute('class', 'mapChartCanvas');
                    height = scope.$parent.mapChart.getHeight();
                }
                else{
                    mapCanvas.setAttribute('class', 'mapChartAuto');
                    //height = '430';
                }

                mapCanvas.setAttribute('style', 'height:'+height+'px; width:'+widthDIM+'; position: relative;');

                var zoom = setZoom(width,height);

                // opzioni iniziali della mappa
                var mapOptions = {
                    center: new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude()),
                    zoom: zoom,
                    mapTypeId: scope.$parent.mapChart.getMapType(),
                    scrollwheel: scope.$parent.mapChart.getZoomable(),
                    draggable: scope.$parent.mapChart.getDraggable(),
                    panControl: scope.$parent.mapChart.getDraggable(),
                    zoomControl: scope.$parent.mapChart.getZoomable(),
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false
                };

                map = new google.maps.Map(element.children()[1], mapOptions);

                // impostazione del tipo di mappa da visualizzare
                /*switch (scope.$parent.mapChart.getMapType()) {
                    case 'roadmap':
                        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                        break;
                    case 'satellite':
                        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                        break;
                    case 'hybrid':
                        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                        break;
                    case 'terrain':
                        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                        break;
                }*/
                // inserimento del tracciato (se presente)
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    if (scope.$parent.mapChart.getFlowList()[i].flow.getTrace().type === 'poly'){
                        var polyline = [];

                        for (var y=0; y<scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates.length; y++){
                            polyline.push(new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][0],scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][1]));
                        }
                        polylines.push(new google.maps.Polyline({
                            path: polyline,
                            geodesic: true,
                            strokeColor: scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor,
                            strokeOpacity: 0.8,
                            strokeWeight: 3
                        }));
                        polylines[i].setMap(map);
                    }
                }
              
                
     
            };

            // inizializza i dati sulla mappa
            scope.render = function(){

                for (var z = 0; z < markers.length; z++) {
                    markers[z].setMap(null);
                }
                markers = [];

                var stepDisplay = new google.maps.InfoWindow();
                
                // inserisce i marker per ogni flusso di dati presente nel grafico
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.$parent.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        var marker;
                        switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                var type;
                                switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond, bus
                                    case 'circle':
                                        type = attrs.url + '/img/circle.png';
                                        break;
                                    case 'square':
                                        type = attrs.url + '/img/square.png';
                                        break;
                                    case 'diamond':
                                        type = attrs.url + '/img/diamond.png';
                                        break;
                                    case 'triangle':
                                        type = attrs.url + '/img/triangle.png';
                                        break;
                                    case 'bus':
                                        type = attrs.url + '/img/bus.png';
                                        break;
                                    case 'car':
                                        type = attrs.url + '/img/car.png';
                                        break;
                                    case 'plane':
                                        type = attrs.url + '/img/plane.png';
                                        break;
                                    case 'man':
                                        type = attrs.url + '/img/man.png';
                                        break;
                                    case 'woman':
                                        type = attrs.url + '/img/woman.png';
                                        break;
                                    case 'chuck':
                                        type = attrs.url + '/img/chuck.png';
                                        break;
                                    case 'ship':
                                        type = attrs.url + '/img/ship.png';
                                        break;
                                    case 'flag':
                                        type = attrs.url + '/img/flag.png';
                                        break;
                                    case 'truck':
                                        type = attrs.url + '/img/truck.png';
                                        break;
                                    case 'house':
                                        type = attrs.url + '/img/house.png';
                                        break;
                                }
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    icon: type
                                });
                                break;
                            case 'icon':
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    icon: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().icon
                                });
                                break;
                            case 'text':
                                marker = new MapLabel({
                                    text: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().text,
                                    position: coordinates,
                                    map: map,
                                    fontColor: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().color,
                                    fontSize: 20,
                                    align: 'right'
                                });
                                break;
                        }
                        if (scope.$parent.mapChart.getLegendOnPoint() === true){
                            addLegendOnPoint(marker, scope.$parent.mapChart.getFlowList()[i].flow.getName() + ' ' + scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].markerID);
                        }
                        markers.push(marker);

                    }
                    
                }



                // aggiunge la legenda sui marker
                function addLegendOnPoint(marker,text) {

                    google.maps.event.addListener(marker, 'click', function() {
                        // Open an info window when the marker is clicked on,
                        // containing the text of the step.
                        stepDisplay.setContent(text);
                        stepDisplay.open(map, marker);
                    });
                }            
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nosrd-ovest, sud-est o sud-ovest del grafico
            function changePosition(map,parent){

                //var width = scope.$parent.mapChart.getWidth() + 'px';
                //var height = scope.$parent.mapChart.getHeight() + 'px';
                var width='100%';
                var height='430px';

                var widthUNIT='430';
                var heightUNIT='430';
                if (scope.$parent.mapChart.getWidth() !== 0){
                    map.setAttribute('class', 'mapChartCanvas');
                    width = scope.$parent.mapChart.getWidth()+'px';
                    widthUNIT = scope.$parent.mapChart.getWidth();
                }
                else{
                    map.setAttribute('class', 'mapChartAuto');
                    //width = '430';
                }
                if (scope.$parent.mapChart.getHeight() !== 0){
                    map.setAttribute('class', 'mapChartCanvas');
                    height = scope.$parent.mapChart.getHeight()+'px';
                    heightUNIT = scope.$parent.mapChart.getHeight();
                }
                else{
                    map.setAttribute('class', 'mapChartAuto');
                    //height = '430';
                }
                //width = '430px';
                //height = '430px';
                switch (scope.$parent.mapChart.getLegend().getPosition()) {
                    case 'N':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + heightUNIT + 'px; right: -' + (widthUNIT/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; right: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (heightUNIT/2) + 'px; right: -' + (widthUNIT+25) + 'px;  background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (widthUNIT/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; right: -100px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (heightUNIT/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; bottom: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + heightUNIT + 'px; right: -' + (widthUNIT+25) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + heightUNIT + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (widthUNIT+25) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        map.setAttribute('style', 'height:'+ height +'; width:'+ width +'; position: relative; bottom: 0;');
                        parent.setAttribute('style', 'background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {
                var map = element.children()[1];
                var parent = element.children()[2];
                
                changePosition(map,parent);

                
                if (scope.$parent.mapChart.getLegend() !== null) {
                    var div = document.createElement('div');
                        div.setAttribute('class','legend-chart');
                    for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++) {
                        if (scope.$parent.mapChart.getFlowList()[i].flow.getData().length){
                          var square = document.createElement('div');
                          if (scope.$parent.mapChart.getFlowList()[i].flow.getTrace() !== undefined && scope.$parent.mapChart.getFlowList()[i].flow.getTrace() !== null && scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor !== undefined ){
                              square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor);
                          }
                          else{
                            var type;
                            switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().type) {
                              case 'shape':
                                switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond, bus
                                    case 'circle':
                                        type = attrs.url + '/img/circleI.png';
                                        break;
                                    case 'square':
                                        type = attrs.url + '/img/squareI.png';
                                        break;
                                    case 'diamond':
                                        type = attrs.url + '/img/diamondI.png';
                                        break;
                                    case 'triangle':
                                        type = attrs.url + '/img/triangleI.png';
                                        break;
                                    case 'bus':
                                        type = attrs.url + '/img/busI.png';
                                        break;
                                    case 'car':
                                        type = attrs.url + '/img/carI.png';
                                        break;
                                    case 'plane':
                                        type = attrs.url + '/img/planeI.png';
                                        break;
                                    case 'man':
                                        type = attrs.url + '/img/manI.png';
                                        break;
                                    case 'woman':
                                        type = attrs.url + '/img/womanI.png';
                                        break;
                                    case 'chuck':
                                        type = attrs.url + '/img/chuckI.png';
                                        break;
                                    case 'ship':
                                        type = attrs.url + '/img/shipI.png';
                                        break;
                                    case 'flag':
                                        type = attrs.url + '/img/flagI.png';
                                        break;
                                    case 'truck':
                                        type = attrs.url + '/img/truckI.png';
                                        break;
                                    case 'house':
                                        type = attrs.url + '/img/houseI.png';
                                        break;
                                }
                                break;
                              case 'icon':
                                type = scope.$parent.mapChart.getFlowList()[i].flow.getMarker().icon;
                                break;
                            }
                              square.setAttribute('style', 'float: left; height: 18px; width: 18px; background: url("' + type + '") no-repeat;');
                              square.setAttribute('class', 'square-flow-legend-chart');
                          }
                          var spanText = document.createElement('div');
                          var text = document.createTextNode(scope.$parent.mapChart.getFlowList()[i].flow.getName());
                          spanText.setAttribute('style', 'color: '+ scope.$parent.mapChart.getLegend().getFontColor() + ';');
                          spanText.setAttribute('class', 'text-flow-legend-chart');
                          spanText.appendChild(text);
                          div.appendChild(square);
                          div.appendChild(spanText);
                          parent.appendChild(div);
                        }
                    }
                }
            };
        }
    };
});
/*jshint node: true */
'use strict';

/*
* Name :  TableView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.3         2015-06-24  Maria Giovanna Chinellato   Fix table sorting
*
* 1.0.2         2015-06-22  Maria Giovanna Chinellato   Fix appearance of table
*
* 1.0.1         2015-06-22  Maria Giovanna Chinellato   Fix update of data
*
* 1.0.0         2015-06-13  Francesco Rossetto          Tested
*
* 0.1.0         2015-06-05  Maria Giovanna Chinellato   Add function: init and setData, fix code   
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('tableChart', function($compile){
    return { // attributo della direttiva
        restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: {
            url: '@'
        },
        //bindToController: true,
        link: function(scope, element, attrs){

            attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changed', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.setData(); // chiama la funzione che organizza i dati da visualizzare
                    if (scope.$parent.changedP === true) {
                        scope.init(); // chiama la funzione init che crea la tabella
                        scope.$parent.changedP = false;
                    }
                }
            }, true);

            // crea il codice HTML da inserire nella pagina per creare la tabella
            scope.init = function(){
                element.empty();
                var border;
                var noBorder = 'class="table-condensed table-striped"';
                var headers = 'color: #000; background-color: #FFF;';

                var width;
                var height;
                if (scope.$parent.table.getWidth() !== 0){
                    width = ' ' + scope.$parent.table.getWidth() + 'px';
                }
                else{
                    width = '100%';
                }
                if (scope.$parent.table.getHeight() !== 0){
                    height = ' ' + scope.$parent.table.getHeight() + 'px';
                }
                else{
                    height = '100%';
                }
                
                if (scope.$parent.table.getAppearance().horizontalGrid !== undefined && scope.$parent.table.getAppearance().horizontalGrid !== null) {
                    border = 'border-top:' + scope.$parent.table.getAppearance().horizontalGrid.width + 'px solid ' + scope.$parent.table.getAppearance().horizontalGrid.color + ';';
                    border = border + 'border-bottom:' + scope.$parent.table.getAppearance().horizontalGrid.width + 'px solid ' + scope.$parent.table.getAppearance().horizontalGrid.color + ';';
                }
                if (scope.$parent.table.getAppearance().verticalGrid !== undefined && scope.$parent.table.getAppearance().verticalGrid !== null) {
                    border = border + 'border-left:' + scope.$parent.table.getAppearance().verticalGrid.width + 'px solid ' + scope.$parent.table.getAppearance().verticalGrid.color + ';';
                    border = border + 'border-right:' + scope.$parent.table.getAppearance().verticalGrid.width + 'px solid ' + scope.$parent.table.getAppearance().verticalGrid.color + ';';
                }
                var tableStyle = 'style="' + border + ' ';
                //var dim;
                var dim = 'style="width:' + width + '; height:' + height + ';"';
                var str = scope.url.split('/');
                var id = str[str.length-1];
                var table = '<style>';

                // mette l'aspetto delle celle di riga pari e di riga dispari
                if(scope.$parent.table.getAppearance().rowOdd !== undefined && scope.$parent.table.getAppearance().rowEven !== undefined){
                    for (var td=0;td<scope.$parent.table.getHeaders().length;td++){
                        table = table + 'table #' + id +  ' tr:nth-child(odd) td:nth-child(' + (td+1) + '){ color: ' + scope.$parent.table.getAppearance().rowOdd.textColor[0] + '; ';
                        table = table + 'background-color: ' + scope.$parent.table.getAppearance().rowOdd.backgroundColor[td] + ';} ';
                        table = table + 'table #' + id +  ' tr:nth-child(even) td:nth-child(' + (td+1) + '){ color: ' + scope.$parent.table.getAppearance().rowEven.textColor[0] + '; ';
                        table = table + 'background-color: ' + scope.$parent.table.getAppearance().rowEven.backgroundColor[td] + ';}';  
                    }
                }

                table = table + '</style><div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div><table id="' + id + '" ' + dim + ' st-table="displayed" st-safe-src="rowCollection" ';

                table = table + '<thead><tr>';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++) {
                    table = table + '<th ';
                    if (scope.$parent.table.getAppearance().headers !== undefined) {
                        headers = 'color:' + scope.$parent.table.getAppearance().headers.textColor[i] + '; background-color:' + scope.$parent.table.getAppearance().headers.backgroundColor[i] + '; ';
                    }
                    if ((scope.$parent.table.getAppearance().horizontalGrid !== undefined && scope.$parent.table.getAppearance().horizontalGrid !== null) || (scope.$parent.table.getAppearance().verticalGrid !== undefined && scope.$parent.table.getAppearance().verticalGrid !== null)) {
                        table = table + tableStyle + headers + ' " ';
                    } else {
                        table = table + noBorder + 'style="' + headers + ' " ';
                    }
                    if (scope.$parent.table.getSortable() === true && scope.$parent.table.getSort().column.length === 0) {
                        table = table + 'st-sort="record.'+ scope.$parent.table.getHeaders()[i] +'"';
                        table = table + '><a href="">'+ scope.$parent.table.getHeaders()[i] +'</a></th>';
                    }
                    else{
                        table = table + '>'+ scope.$parent.table.getHeaders()[i] +'</th>';
                    }
                }
                table = table + '</tr></thead>';

                // controlla se è abilitato qualche ordinamento da parte dello sviluppatore e ordina i record
                if (scope.$parent.table.getSort() !== null){
                    if (scope.$parent.table.getSort().column.length === 1){
                        table = table + '<tbody><tr ng-repeat="line in displayed | orderBy:\''+ scope.$parent.table.getSort().column[0] +'\'">';
                    }
                    else{
                        var order = ' | orderBy:[';
                        for (var s=0; s<scope.$parent.table.getSort().column.length; s++){
                            if (scope.$parent.table.getSort().ordering[s] === 'ASC'){
                                if (s === scope.$parent.table.getSort().column.length-1){
                                    order = order + '\'record.'+ scope.$parent.table.getSort().column[s] +'\'';
                                }
                                else{
                                    order = order + '\'record.'+ scope.$parent.table.getSort().column[s] +'\',';
                                }
                            }
                            else{
                                if (s === scope.$parent.table.getSort().column.length-1){
                                    order = order + '\'-record.'+ scope.$parent.table.getSort().column[s] +'\'';
                                }
                                else{
                                    order = order + '\'-record.'+ scope.$parent.table.getSort().column[s] +'\',';
                                }
                            }
                        }
                        table = table + '<tbody><tr ng-repeat="line in displayed' + order + ']">';
                    }
                }
                else{
                    table = table + '<tbody><tr ng-repeat="line in displayed">';
                }
                //i = 0;
                for (var j=0; j<scope.$parent.table.getHeaders().length; j++){
                  var cellBG;
                  var cellText;
                  if(isNaN(scope.$parent.table.getHeaders()[j])){
                    cellBG = 'background-color: {{line.appearance.' + scope.$parent.table.getHeaders()[j] + '.bg}};';
                    cellText = 'color: {{line.appearance.' + scope.$parent.table.getHeaders()[j] + '.text}};';
                  }
                  else{
                    cellBG = 'background-color: {{line.appearance[' + scope.$parent.table.getHeaders()[j] + '].bg}};';
                    cellText = 'color: {{line.appearance[' + scope.$parent.table.getHeaders()[j] + '].text}};';
                  }
                    var cellStyle = 'style="' + border + cellBG + cellText + '"';
                    table = table + '<td ';
                    if ((scope.$parent.table.getAppearance().horizontalGrid !== undefined && scope.$parent.table.getAppearance().horizontalGrid !== null) || (scope.$parent.table.getAppearance().verticalGrid !== undefined && scope.$parent.table.getAppearance().verticalGrid !== undefined)) {
                        table = table + cellStyle;
                    } else {
                        table = table + noBorder + cellStyle;
                    }
                    if(isNaN(scope.$parent.table.getHeaders()[j])){
                      table = table + '>{{line.record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                    }
                    else{
                      table = table + '>{{line.record['+ scope.$parent.table.getHeaders()[j] +']}}</td>';
                    }
                }
                table = table + '</tr></tbody>';

                table = table + '<tfoot><tr>' +
                                    '<td  style="background-color: #FFF;" colspan="5" class="text-center">' +
                                        '<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5"></div>' +
                                    '</td>' +
                                '</tr></tfoot>';

                table = table + '</table>';
                
                var compiled = $compile(table)(scope);
                element.append(compiled);
            };

            scope.displayed = [].concat(scope.rowCollection);
            scope.rowCollection = [];
            //scope.appearance;

            // imposta i dati da visualizzare
            scope.setData = function(){
                scope.rowCollection = []; // array che contiene una copia dei dati per permettere paginazione e ordinamento con dati dinamici
                //scope.appearance = [];
                //var appearance = ;
                for (var k=0; k<scope.$parent.table.getFlowList().length; k++) {
                    for (var i=0; i<scope.$parent.table.getFlowList()[k].flow.getData().length; i++) {
                        var appearance = {};
                        var record = {};
                        for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                            if (scope.$parent.table.getFlowList()[k].flow.getData()[i].appearance !== undefined){
                                appearance[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[k].flow.getData()[i].appearance[j];
                            }
                            record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[k].flow.getData()[i].value[j];
                        }
                        scope.rowCollection.push({'appearance': appearance, 'record': record});
                    }
                }
                scope.itemsByPage = scope.$parent.table.getMaxItemsPage();
            };
        }
    };
});
/*jshint node: true */
'use strict';

/*
* Name :  PageView.js
* Module : FrontEnd::View::PagesView
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-14  Maria Giovanna Chinellato   Fix page size     
*
* 1.0.0         2015-06-14  Francesco Rossetto		    Tested     
*
* 0.1.1         2015-06-04  Maria Giovanna Chinellato   Fix link function      
*
* 0.1.0			2015-05-30	Francesco Rossetto			Add all attributes and all methods	
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*/
angular.module('norris-nrti')
.directive('page', function($compile, $routeParams){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
		controller : 'PageController',
		replace: false,
		scope: {},
		template: '<div id="page"></div>', // template HTML inserito dalla direttiva
		link: function (scope, element, attrs) {
			scope.socketConnection(); // richiama la funzione del controller che permette di connettersi al server

			scope.render = function() {
				parent = element.children()[0];
				element.empty();

				var commands = document.createElement('div');
				commands.setAttribute('class', 'commands');
				/*if (scope.previous) { // controlla se è presente una pagina precedente
					var previous = document.createElement('div');
					//previous.setAttribute('style', 'float:left;');
					var pIndex = parseInt($routeParams.pageId) - 1;
					previous.innerHTML = '<a ng-click="previous('+pIndex+')" target="_self">PREVIOUS PAGE</a>'; // inserisce il link alla pagina precedente
					commands.appendChild(previous);
				}
				var list = document.createElement('div');
				list.innerHTML = '<a ng-href="/" target="_self">RETURN TO PAGES LIST</a>';
				//list.setAttribute('style', 'float:left;');
				commands.appendChild(list);
				if (scope.next) { // controlla se è presente una pagina successiva
					var next = document.createElement('div');
					//next.setAttribute('style', 'float:left;');
					var nIndex = parseInt($routeParams.pageId) + 1;
					next.innerHTML = '<a ng-click="next('+nIndex+')" target="_self">NEXT PAGE</a>'; // inserisce il link alla pagina successiva
					commands.appendChild(next);
				}*/
				var list = document.createElement('div');
				list.innerHTML = '<a class="btn btn-info" ng-href="/norris" target="_self"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>&nbsp;Return to page list</a>';
				commands.appendChild(list);
				parent.appendChild(commands);

				var table = document.createElement('table');
				table.className = 'graphstable';
				//table.setAttribute('style', 'width: 100%;');
				parent.appendChild(table);

				// crea la tabella con i grafici
				for(var i=0; i<scope.graphs.length; i++) {
					var line = scope.graphs[i];
					var row = table.insertRow(i);
					for(var j=0; j<line.length; j++) {
						var div = document.createElement('div');
						div.className = 'graph';
						var graph = line[j];
						switch (graph.type) {
							case 'BarChart' : 
								div.setAttribute('ng-controller', 'BarChartController');
								div.setAttribute('class', 'bar-chart-graph');
								div.innerHTML = '<bar-chart url="'+ graph.url +'"></bar-chart>';
								break;
							case 'LineChart' : 
								div.setAttribute('ng-controller', 'LineChartController');
								div.setAttribute('class', 'line-chart-graph');
								div.innerHTML = '<line-chart url="'+ graph.url +'"></line-chart>';
								break;
							case 'MapChart' : 
								div.setAttribute('ng-controller', 'MapChartController');
								div.setAttribute('class', 'map-chart-graph');
								div.innerHTML = '<map-chart url="'+ graph.url +'"></map-chart>';
								break;
							case 'Table' :
								div.setAttribute('ng-controller', 'TableController');
								div.setAttribute('class', 'table-chart-graph');
								div.innerHTML = '<table-chart url="'+ graph.url +'"></table-chart>';
								break;
						}
						var cell = row.insertCell(j);
						cell.setAttribute('align', 'center');
						cell.appendChild(div);
					}
				}

				//parent.setAttribute('style', 'height:'+ 1000*scope.graphs.length +'px; width:'+ 1500*scope.graphs[0].length +'px;');

				var el = $compile(parent)(scope);
				element.parent().append( el );
       		};

       		scope.$watch('graphs', function(){ // ad ogni inserimento o modifica della lista dei grafici viene chiamata la funzione render che ne aggiorna la visualizzazione
       			if (scope.graphs.length > 0) {
	          		scope.render();
	          	}
        	}, true);

		}

	};
});
/*jshint node: true */
'use strict';

/*
* Name :  PagesListView.js
* Module : FrontEnd::View::PagesView
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-25  Maria Giovanna Chinellato   Fix test
*
* 1.0.0         2015-06-14  Maria Giovanna Chinellato   Tested
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-05-30  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('pagesList', function(){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
		replace: false,
		controller: 'PagesListController', // controller associato
		scope: {},
		template: 
				'<div id="pagesListTitle"><h1 id="page-list-title" class="page-header">{{name}}</h1></div>' +
				'<div id="pagesList">' + 
					'<ul>' +
					'<li class="page-li" ng-repeat="page in pagesList">' +
						'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
						'<a class="page-link" ng-href="#/page/{{$index}}"> {{ page.page.getName() }} </a>' +
						'<p class="page-link-desc"> {{ page.page.getDescription() }} </p>' +
					'</li>' +
					'</ul>' +
			'</div>', // template HTML inserito dalla direttiva
		link: function (scope, element, attrs) {
			scope.socketConnection(); // richiama la funzione del controller che permette di connettersi al server
		}

	};
});

/*! angularjs-nvd3-directives - v0.0.2-beta - 2013-11-09
* http://cmaurer.github.io/angularjs-nvd3-directives
* Copyright (c) 2013 Christian Maurer; Licensed Apache License, v2.0 */
(function () {
    angular.module('legendDirectives', [])
        .directive('simpleSvgLegend', function () {
            return {
                restrict: 'EA',
                scope: {
                    id: '@',
                    width: '@',
                    height: '@',
                    margin: '@',
                    x: '@',
                    y: '@',
                    labels: '@',
                    styles: '@',
                    classes: '@',
                    shapes: '@',  //rect, circle, ellipse
                    padding: '@',
                    columns: '@'
                },
                compile: function () {
                    return function link(scope, element, attrs) {
                        "use strict";
                        var id,
                            width,
                            height,
                            margin,
                            widthTracker = 0,
                            heightTracker = 0,
                            columns = 1,
                            columnTracker = 0,
                            padding = 10,
                            paddingStr,
                            svgNamespace = 'http://www.w3.org/2000/svg',
                            svg,
                            g,
                            labels,
                            styles,
                            classes,
                            shapes,
                            x = 0,
                            y = 0,
                            container;

                        margin = (scope.$eval(attrs.margin) || { left: 5, top: 5, bottom: 5, right: 5 });
                        width = (attrs.width === "undefined" ? ((element[0].parentElement.offsetWidth) - (margin.left + margin.right)) : (+attrs.width - (margin.left + margin.right)));
                        height = (attrs.height === "undefined" ? ((element[0].parentElement.offsetHeight) - (margin.top + margin.bottom)) : (+attrs.height - (margin.top + margin.bottom)));

                        if (!attrs.id) {
                            //if an id is not supplied, create a random id.
                            id = 'legend-' + Math.random();
                        } else {
                            id = attrs.id;
                        }
                        container = d3.select(this).classed('legend-' + id, true);

                        if (attrs.columns) {
                            columns = (+attrs.columns);
                        }

                        if (attrs.padding) {
                            padding = (+attrs.padding);
                        }
                        paddingStr = padding + '';

                        svg = document.createElementNS(svgNamespace, 'svg');
                        if (attrs.width) {
                            svg.setAttribute('width', width + '');
                        }

                        if (attrs.height) {
                            svg.setAttribute('height', height + '');
                        }
                        svg.setAttribute('id', id);

                        if (attrs.x) {
                            x = (+attrs.x);
                        }

                        if (attrs.y) {
                            y = (+attrs.y);
                        }

                        element.append(svg);

                        g = document.createElementNS(svgNamespace, 'g');
                        g.setAttribute('transform', 'translate(' + x + ',' + y + ')');

                        svg.appendChild(g);

                        if (attrs.labels) {
                            labels = scope.$eval(attrs.labels);
                        }

                        if (attrs.styles) {
                            styles = scope.$eval(attrs.styles);
                        }

                        if (attrs.classes) {
                            classes = scope.$eval(attrs.classes);
                        }

                        if (attrs.shapes) {
                            shapes = scope.$eval(attrs.shapes);
                        }

                        for (var i in labels) {

                            var shpe = shapes[i], shape, text, textSize, g1;

                            if ((columnTracker % columns) === 0) {
                                widthTracker = 0;
                                heightTracker = heightTracker + (padding + (padding * 1.5));
                            }
                            g1 = document.createElementNS(svgNamespace, 'g');
                            g1.setAttribute('transform', 'translate(' + widthTracker + ', ' + heightTracker + ')');

                            if (shpe === 'rect') {
                                shape = document.createElementNS(svgNamespace, 'rect');
                                //x, y, rx, ry
                                shape.setAttribute('y', (0 - (padding / 2)) + '');
                                shape.setAttribute('width', paddingStr);
                                shape.setAttribute('height', paddingStr);
                            } else if (shpe === 'ellipse') {
                                shape = document.createElementNS(svgNamespace, 'ellipse');
                                shape.setAttribute('rx', paddingStr);
                                shape.setAttribute('ry', (padding + (padding / 2)) + '');
                            } else {
                                shape = document.createElementNS(svgNamespace, 'circle');
                                shape.setAttribute('r', (padding / 2) + '');
                            }

                            if (styles && styles[i]) {
                                shape.setAttribute('style', styles[i]);
                            }

                            if (classes && classes[i]) {
                                shape.setAttribute('class', classes[i]);
                            }

                            g1.appendChild(shape);

                            widthTracker = widthTracker + shape.clientWidth + (padding + (padding / 2));

                            text = document.createElementNS(svgNamespace, 'text');
                            text.setAttribute('transform', 'translate(10, 5)');
                            text.appendChild(document.createTextNode(labels[i]));

                            g1.appendChild(text);
                            g.appendChild(g1);

                            textSize = text.clientWidth;
                            widthTracker = widthTracker + textSize + (padding + (padding * 0.75));

                            columnTracker++;
                        }
                    };
                }
            };
        });
    function processEvents(chart, scope) {

        if (chart.dispatch) {
            if (chart.dispatch.tooltipShow) {
                chart.dispatch.on('tooltipShow.directive', function (event) {
                    scope.$emit('tooltipShow.directive', event);
                });
            }

            if (chart.dispatch.tooltipHide) {
                chart.dispatch.on('tooltipHide.directive', function (event) {
                    scope.$emit('tooltipHide.directive', event);
                });
            }

            if (chart.dispatch.beforeUpdate) {
                chart.dispatch.on('beforeUpdate.directive', function (event) {
                    scope.$emit('beforeUpdate.directive', event);
                });
            }

            if (chart.dispatch.stateChange) {
                chart.dispatch.on('stateChange.directive', function (event) {
                    scope.$emit('stateChange.directive', event);
                });
            }

            if (chart.dispatch.changeState) {
                chart.dispatch.on('changeState.directive', function (event) {
                    scope.$emit('changeState.directive', event);
                });
            }
        }

        if (chart.lines) {
            chart.lines.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.lines.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseout.tooltip.directive', event);
            });

            chart.lines.dispatch.on('elementClick.directive', function (event) {
                scope.$emit('elementClick.directive', event);
            });
        }

        if (chart.stacked && chart.stacked.dispatch) {
            chart.stacked.dispatch.on('areaClick.toggle.directive', function (event) {
                scope.$emit('areaClick.toggle.directive', event);
            });

            chart.stacked.dispatch.on('tooltipShow.directive', function (event) {
                scope.$emit('tooltipShow.directive', event);
            });


            chart.stacked.dispatch.on('tooltipHide.directive', function (event) {
                scope.$emit('tooltipHide.directive', event);
            });

        }

        if (chart.interactiveLayer) {
            if (chart.interactiveLayer.elementMouseout) {
                chart.interactiveLayer.dispatch.on('elementMouseout.directive', function (event) {
                    scope.$emit('elementMouseout.directive', event);
                });
            }

            if (chart.interactiveLayer.elementMousemove) {
                chart.interactiveLayer.dispatch.on('elementMousemove.directive', function (event) {
                    scope.$emit('elementMousemove.directive', event);
                });
            }
        }

        if (chart.discretebar) {
            chart.discretebar.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.discretebar.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if (chart.multibar) {
            chart.multibar.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.multibar.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.multibar.dispatch.on('elementClick.directive', function (event) {
                scope.$emit('elementClick.directive', event);
            });

        }

        if (chart.pie) {
            chart.pie.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.pie.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if (chart.scatter) {
            chart.scatter.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.scatter.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if (chart.bullet) {
            chart.bullet.dispatch.on('elementMouseover.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.bullet.dispatch.on('elementMouseout.tooltip.directive', function (event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if (chart.legend) {
            //stateChange
            chart.legend.dispatch.on('stateChange.legend.directive', function (event) {
                scope.$emit('stateChange.legend.directive', event);
            });

            chart.legend.dispatch.on('legendClick.directive', function (d, i) {
                scope.$emit('legendClick.directive', d, i);
            });

        }

        if (chart.controls) {
            if (chart.controls.legendClick) {
                chart.controls.dispatch.on('legendClick.directive', function (d, i) {
                    scope.$emit('legendClick.directive', d, i);
                });
            }
        }

    }

    function configureXaxis(chart, scope, attrs) {
        "use strict";
        if (attrs.xaxisorient) {
            chart.xAxis.orient(attrs.xaxisorient);
        }
        if (attrs.xaxisticks) {
            chart.xAxis.scale().ticks(attrs.xaxisticks);
        }
        if (attrs.xaxistickvalues) {
            if (Array.isArray(scope.$eval(attrs.xaxistickvalues))) {
                chart.xAxis.tickValues(scope.$eval(attrs.xaxistickvalues));
            } else if (typeof scope.xaxistickvalues() === 'function') {
                chart.xAxis.tickValues(scope.xaxistickvalues());
            }
        }
        if (attrs.xaxisticksubdivide) {
            chart.xAxis.tickSubdivide(scope.xaxisticksubdivide());
        }
        if (attrs.xaxisticksize) {
            chart.xAxis.tickSize(scope.xaxisticksize());
        }
        if (attrs.xaxistickpadding) {
            chart.xAxis.tickPadding(scope.xaxistickpadding());
        }
        if (attrs.xaxistickformat) {
            chart.xAxis.tickFormat(scope.xaxistickformat());
        }
        if (attrs.xaxislabel) {
            chart.xAxis.axisLabel(attrs.xaxislabel);
        }
        if (attrs.xaxisscale) {
            chart.xAxis.scale(scope.xaxisscale());
        }
        if (attrs.xaxisdomain) {
            chart.xAxis.domain(scope.xaxisdomain());
        }
        if (attrs.xaxisrange) {
            chart.xAxis.range(scope.xaxisrange());
        }
        if (attrs.xaxisrangeband) {
            chart.xAxis.rangeBand(scope.xaxisrangeband());
        }
        if (attrs.xaxisrangebands) {
            chart.xAxis.rangeBands(scope.xaxisrangebands());
        }
        if (attrs.xaxisshowmaxmin) {
            chart.xAxis.showMaxMin((attrs.xaxisshowmaxmin === "true"));
        }
        if (attrs.xaxishighlightzero) {
            chart.xAxis.highlightZero((attrs.xaxishighlightzero === "true"));
        }
        if (attrs.xaxisrotatelabels) {
            chart.xAxis.rotateLabels((+attrs.xaxisrotatelabels));
        }
        //    if(attrs.xaxisrotateylabel){
        //        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
        //    }
        if (attrs.xaxisstaggerlabels) {
            chart.xAxis.staggerLabels((attrs.xaxisstaggerlabels === "true"));
        }
    }

    function configureX2axis(chart, scope, attrs) {
        "use strict";
        if (attrs.x2axisorient) {
            chart.x2Axis.orient(attrs.x2axisorient);
        }
        if (attrs.x2axisticks) {
            chart.x2Axis.scale().ticks(attrs.x2axisticks);
        }
        if (attrs.x2axistickvalues) {
            if (Array.isArray(scope.$eval(attrs.x2axistickvalues))) {
                chart.x2Axis.tickValues(scope.$eval(attrs.x2axistickvalues));
            } else if (typeof scope.xaxistickvalues() === 'function') {
                chart.x2Axis.tickValues(scope.x2axistickvalues());
            }
        }
        if (attrs.x2axisticksubdivide) {
            chart.x2Axis.tickSubdivide(scope.x2axisticksubdivide());
        }
        if (attrs.x2axisticksize) {
            chart.x2Axis.tickSize(scope.x2axisticksize());
        }
        if (attrs.x2axistickpadding) {
            chart.x2Axis.tickPadding(scope.x2axistickpadding());
        }
        if (attrs.x2axistickformat) {
            chart.x2Axis.tickFormat(scope.x2axistickformat());
        }
        if (attrs.x2axislabel) {
            chart.x2Axis.axisLabel(attrs.x2axislabel);
        }
        if (attrs.x2axisscale) {
            chart.x2Axis.scale(scope.x2axisscale());
        }
        if (attrs.x2axisdomain) {
            chart.x2Axis.domain(scope.x2axisdomain());
        }
        if (attrs.x2axisrange) {
            chart.x2Axis.range(scope.x2axisrange());
        }
        if (attrs.x2axisrangeband) {
            chart.x2Axis.rangeBand(scope.x2axisrangeband());
        }
        if (attrs.x2axisrangebands) {
            chart.x2Axis.rangeBands(scope.x2axisrangebands());
        }
        if (attrs.x2axisshowmaxmin) {
            chart.x2Axis.showMaxMin((attrs.x2axisshowmaxmin === "true"));
        }
        if (attrs.x2axishighlightzero) {
            chart.x2Axis.highlightZero((attrs.x2axishighlightzero === "true"));
        }
        if (attrs.x2axisrotatelables) {
            chart.x2Axis.rotateLabels((+attrs.x2axisrotatelables));
        }
        //    if(attrs.xaxisrotateylabel){
        //        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
        //    }
        if (attrs.x2axisstaggerlabels) {
            chart.x2Axis.staggerLabels((attrs.x2axisstaggerlabels === "true"));
        }
    }

    function configureYaxis(chart, scope, attrs) {
        "use strict";
        if (attrs.yaxisorient) {
            chart.yAxis.orient(attrs.yaxisorient);
        }
        if (attrs.yaxisticks) {
            chart.yAxis.scale().ticks(attrs.yaxisticks);
        }
        if (attrs.yaxistickvalues) {
            if (Array.isArray(scope.$eval(attrs.yaxistickvalues))) {
                chart.yAxis.tickValues(scope.$eval(attrs.yaxistickvalues));
            } else if (typeof scope.yaxistickvalues() === 'function') {
                chart.yAxis.tickValues(scope.yaxistickvalues());
            }
        }
        if (attrs.yaxisticksubdivide) {
            chart.yAxis.tickSubdivide(scope.yaxisticksubdivide());
        }
        if (attrs.yaxisticksize) {
            chart.yAxis.tickSize(scope.yaxisticksize());
        }
        if (attrs.yaxistickpadding) {
            chart.yAxis.tickPadding(scope.yaxistickpadding());
        }
        if (attrs.yaxistickformat) {
            chart.yAxis.tickFormat(scope.yaxistickformat());
        }
        if (attrs.yaxislabel) {
            chart.yAxis.axisLabel(attrs.yaxislabel);
        }
        if (attrs.yaxisscale) {
            chart.yAxis.scale(scope.yaxisscale());
        }
        if (attrs.yaxisdomain) {
            chart.yAxis.domain(scope.yaxisdomain());
        }
        if (attrs.yaxisrange) {
            chart.yAxis.range(scope.yaxisrange());
        }
        if (attrs.yaxisrangeband) {
            chart.yAxis.rangeBand(scope.yaxisrangeband());
        }
        if (attrs.yaxisrangebands) {
            chart.yAxis.rangeBands(scope.yaxisrangebands());
        }
        if (attrs.yaxisshowmaxmin) {
            chart.yAxis.showMaxMin((attrs.yaxisshowmaxmin === "true"));
        }
        if (attrs.yaxishighlightzero) {
            chart.yAxis.highlightZero((attrs.yaxishighlightzero === "true"));
        }
        if (attrs.yaxisrotatelabels) {
            chart.yAxis.rotateLabels(attrs.yaxisrotatelabels);
        }
        if (attrs.yaxisrotateylabel) {
            chart.yAxis.rotateYLabel((attrs.yaxisrotateylabel === "true"));
        }
        if (attrs.yaxisstaggerlabels) {
            chart.yAxis.staggerLabels((attrs.yaxisstaggerlabels === "true"));
        }
    }


    function configureY1axis(chart, scope, attrs) {
        "use strict";
        if (attrs.y1axisticks) {
            chart.y1Axis.scale().ticks(attrs.y1axisticks);
        }
        if (attrs.y1axistickvalues) {
            chart.y1Axis.tickValues(attrs.y1axistickvalues);
        }
        if (attrs.y1axisticksubdivide) {
            chart.y1Axis.tickSubdivide(scope.y1axisticksubdivide());
        }
        if (attrs.y1axisticksize) {
            chart.y1Axis.tickSize(scope.y1axisticksize());
        }
        if (attrs.y1axistickpadding) {
            chart.y1Axis.tickPadding(scope.y1axistickpadding());
        }
        if (attrs.y1axistickformat) {
            chart.y1Axis.tickFormat(scope.y1axistickformat());
        }
        if (attrs.y1axislabel) {
            chart.y1Axis.axisLabel(attrs.y1axislabel);
        }
        if (attrs.y1axisscale) {
            chart.y1Axis.yScale(scope.y1axisscale());
        }
        if (attrs.y1axisdomain) {
            chart.y1Axis.domain(scope.y1axisdomain());
        }
        if (attrs.y1axisrange) {
            chart.y1Axis.range(scope.y1axisrange());
        }
        if (attrs.y1axisrangeband) {
            chart.y1Axis.rangeBand(scope.y1axisrangeband());
        }
        if (attrs.y1axisrangebands) {
            chart.y1Axis.rangeBands(scope.y1axisrangebands());
        }
        if (attrs.y1axisshowmaxmin) {
            chart.y1Axis.showMaxMin((attrs.y1axisshowmaxmin === "true"));
        }
        if (attrs.y1axishighlightzero) {
            chart.y1Axis.highlightZero((attrs.y1axishighlightzero === "true"));
        }
        if (attrs.y1axisrotatelabels) {
            chart.y1Axis.rotateLabels(scope.y1axisrotatelabels);
        }
        if (attrs.y1axisrotateylabel) {
            chart.y1Axis.rotateYLabel((attrs.y1axisrotateylabel === "true"));
        }
        if (attrs.y1axisstaggerlabels) {
            chart.y1Axis.staggerlabels((attrs.y1axisstaggerlabels === "true"));
        }
    }


    function configureY2axis(chart, scope, attrs) {
        "use strict";
        if (attrs.y2axisticks) {
            chart.y2Axis.scale().ticks(attrs.y2axisticks);
        }
        if (attrs.y2axistickvalues) {
            chart.y2Axis.tickValues(scope.$eval(attrs.y2axistickvalues));
        }
        if (attrs.y2axisticksubdivide) {
            chart.y2Axis.tickSubdivide(scope.y2axisticksubdivide());
        }
        if (attrs.y2axisticksize) {
            chart.y2Axis.tickSize(scope.y2axisticksize());
        }
        if (attrs.y2axistickpadding) {
            chart.y2Axis.tickPadding(scope.y2axistickpadding());
        }
        if (attrs.y2axistickformat) {
            chart.y2Axis.tickFormat(scope.y2axistickformat());
        }
        if (attrs.y2axislabel) {
            chart.y2Axis.axisLabel(attrs.y2axislabel);
        }
        if (attrs.y2axisscale) {
            chart.y2Axis.yScale(scope.y2axisscale());
        }
        if (attrs.y2axisdomain) {
            chart.y2Axis.domain(scope.y2axisdomain());
        }
        if (attrs.y2axisrange) {
            chart.y2Axis.range(scope.y2axisrange());
        }
        if (attrs.y2axisrangeband) {
            chart.y2Axis.rangeBand(scope.y2axisrangeband());
        }
        if (attrs.y2axisrangebands) {
            chart.y2Axis.rangeBands(scope.y2axisrangebands());
        }
        if (attrs.y2axisshowmaxmin) {
            chart.y2Axis.showMaxMin((attrs.y2axisshowmaxmin === "true"));
        }
        if (attrs.y2axishighlightzero) {
            chart.y2Axis.highlightZero((attrs.y2axishighlightzero === "true"));
        }
        if (attrs.y2axisrotatelabels) {
            chart.y2Axis.rotateLabels(scope.y2axisrotatelabels);
        }
        if (attrs.y2axisrotateylabel) {
            chart.y2Axis.rotateYLabel((attrs.y2axisrotateylabel === "true"));
        }
        if (attrs.y2axisstaggerlabels) {
            chart.y2Axis.staggerlabels((attrs.y2axisstaggerlabels === "true"));
        }
    }
    function initializeMargin(scope, attrs) {
        'use strict';
        var margin = (scope.$eval(attrs.margin) || { left: 50, top: 50, bottom: 50, right: 50 });
        if (typeof (margin) !== "object") {
            // we were passed a vanilla int, convert to full margin object
            margin = { left: margin, top: margin, bottom: margin, right: margin };
        }
        scope.margin = margin;
    }

    function initializeWidth(scope, attrs, element) {
        'use strict';
        var marginAdjustment = 0;
        if (attrs.width === "undefined") {
            scope.width = element[0].parentElement.offsetWidth;
        } else {
            scope.width = (+attrs.width);
        }
        if (!scope.margin.left || !scope.margin.right) {
            initializeMargin(scope, attrs, element);
        }
        marginAdjustment = (scope.margin.left + scope.margin.right);
        scope.width = (((scope.width - marginAdjustment) > 0) ? (scope.width - marginAdjustment) : 0);
    }

    function initializeHeight(scope, attrs, element) {
        'use strict';
        var marginAdjustment = 0;
        if (attrs.height === "undefined") {
            scope.height = element[0].parentElement.offsetHeight;
        } else {
            scope.height = (+attrs.height);
        }
        if (!scope.margin.top || !scope.margin.bottom) {
            initializeMargin(scope, attrs, element);
        }
        marginAdjustment = (scope.margin.top + scope.margin.bottom);
        scope.height = (((scope.height - marginAdjustment) > 0) ? (scope.height - marginAdjustment) : 0);
    }

    function setupDimensions(scope, attrs, element) {
        'use strict';
        initializeWidth(scope, attrs, element);
        initializeHeight(scope, attrs, element);
    }

    function checkElementID(scope, attrs, element, chart, data) {
        'use strict';
        var dataAttributeChartID; //randomly generated if id attribute doesn't exist
        if (!attrs.id) {
            dataAttributeChartID = "chartid" + Math.floor(Math.random() * 1000000001);
            angular.element(element).attr('data-chartid', dataAttributeChartID);
            //if an id is not supplied, create a random id.
            if (d3.select('[data-chartid=' + dataAttributeChartID + '] svg').empty()) {
                d3.select('[data-chartid=' + dataAttributeChartID + ']').append('svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);
            } else {
                d3.select('[data-chartid=' + dataAttributeChartID + '] svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);
            }
        } else {
            if (d3.select('#' + attrs.id + ' svg').empty()) {
                d3.select('#' + attrs.id)
                    .append('svg');
            }
            d3.select('#' + attrs.id + ' svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);
        }
    }

    angular.module('nvd3ChartDirectives', [])
        .directive('nvd3LineChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@',
                    forcey: '@',
                    isArea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    interpolate: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '@',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.lineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis === "true"))
                                        .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                        .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .isArea(attrs.isarea === undefined ? function () { return false; } : function () { return (attrs.isarea === "true"); });

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                    
                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }])
        .directive('nvd3CumulativeLineChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@',
                    forcey: '@',
                    isArea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    usevoronoi: '@',
                    average: '&',
                    rescaley: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.cumulativeLineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis === "true"))
                                        .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                        .useVoronoi(attrs.usevoronoi === undefined ? false : (attrs.usevoronoi === "true"))
                                        .average(attrs.average === undefined ? function (d) { return d.average; } : scope.average())
                                        .color(attrs.color === undefined ? d3.scale.category10().range() : scope.color())
                                        .isArea(attrs.isarea === undefined ? false : (attrs.isarea === "true"));
                                    //.rescaleY(attrs.rescaley === undefined ? false : (attrs.rescaley === "true"));

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3StackedAreaChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showcontrols: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@', //List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                    forcey: '@', // List of numbers to Force into the Y scale
                    forcesize: '@', // List of numbers to Force into the Size scale

                    interactive: '@',
                    usevoronoi: '@',
                    clipedge: '@',
                    interpolate: '@',
                    style: '@',     //stack, stream, stream-center, expand
                    order: '@',     //default, inside-out
                    offset: '@',    //zero, wiggle, silhouette, expand
                    size: '&',      //accessor to get the point size
                    xScale: '&',
                    yScale: '&',
                    xDomain: '&',
                    yDomain: '&',
                    xRange: '&',
                    yRange: '&',
                    sizeDomain: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.stackedAreaChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .size(attrs.size === undefined ? function (d) { return d.size || 1; } : scope.size())
                                        .forceSize(attrs.forcesize === undefined ? [] : scope.$eval(attrs.forcesize)) // List of numbers to Force into the Size scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color());

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if (attrs.usevoronoi) {
                                        chart.useVoronoi((attrs.usevoronoi === "true"));
                                    }

                                    if (attrs.style) {
                                        chart.style(attrs.style);
                                    }

                                    if (attrs.order) {
                                        chart.order(attrs.order);
                                    }

                                    if (attrs.offset) {
                                        chart.offset(attrs.offset);
                                    }

                                    if (attrs.interpolate) {
                                        chart.interpolate(attrs.interpolate);
                                    }

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if (attrs.xscale) {
                                        chart.xScale(scope.xscale());
                                    }

                                    if (attrs.yscale) {
                                        chart.yScale(scope.yscale());
                                    }

                                    if (attrs.xdomain) {
                                        chart.xDomain(scope.xdomain());
                                    }

                                    if (attrs.ydomain) {
                                        chart.yDomain(scope.ydomain());
                                    }

                                    if (attrs.sizedomain) {
                                        chart.sizeDomain(scope.sizedomain());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3MultiBarChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    showcontrols: '@',
                    nodata: '@',
                    reducexticks: '@',
                    staggerlabels: '@',
                    rotatelabels: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                    forcey: '@',
                    delay: '@',
                    stacked: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.multiBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .reduceXTicks(attrs.reducexticks === undefined ? false : (attrs.reducexticks === "true"))
                                        .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .rotateLabels(attrs.rotatelabels === undefined ? 0 : attrs.rotatelabels)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .delay(attrs.delay === undefined ? 1200 : attrs.delay)
                                        .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                    
                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }])
        .directive('nvd3DiscreteBarChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    tooltipcontent: '&',
                    staggerlabels: '@',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                    forcey: '@',
                    showvalues: '@',
                    valueformat: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.discreteBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color());

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if (attrs.valueformat) {
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    //events
                                    //https://github.com/mbostock/d3/wiki/Internals#wiki-dispatch
                                    //dispatch: 'tooltipShow', 'tooltipHide', 'beforeUpdate',
                                    //discretebar.dispatch: 'elementMouseout.tooltip', 'elementMouseover.tooltip'

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3HistoricalBarChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    //                forcex: '@',
                    forcey: '@',
                    isarea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    interpolate: '@',
                    highlightPoint: '@',
                    clearHighlights: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.historicalBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color());

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if (attrs.valueformat) {
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3MultiBarHorizontalChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    showcontrols: '@',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    //forcex: '@',  //forcex is rebound from multibarhorizontalchart, but is not on multibar
                    forcey: '@',
                    stacked: '@',
                    showvalues: '@',
                    valueformat: '&',
                    //'xDomain', 'yDomain',
                    //state: '@', //stacked, grouped: same as stacked === true, or stacked === false

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.multiBarHorizontalChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                        .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if (attrs.valueformat) {
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                    
                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }])
        .directive('nvd3PieChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlabels: '@',
                    showlegend: '@',
                    donutLabelsOutside: '@',
                    pieLabelsOutside: '@',
                    labelType: '@',
                    nodata: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    donut: '@',
                    donutRatio: '@',
                    labelThreshold: '@',
                    description: '&',
                    tooltips: '@',
                    tooltipcontent: '&',
                    valueFormat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.pieChart()
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .showLabels(attrs.showlabels === undefined ? false : (attrs.showlabels === "true"))
                                        .labelThreshold(attrs.labelThreshold === undefined ? 0.02 : attrs.labelthreshold)
                                        .labelType(attrs.labeltype === undefined ? 'key' : attrs.labeltype)
                                        .pieLabelsOutside(attrs.pielabelsoutside === undefined ? true : (attrs.pielabelsoutside === "true"))
                                        .valueFormat(attrs.valueformat === undefined ? d3.format(',.2f') : attrs.valueformat)
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .description(attrs.description === undefined ? function (d) { return d.description; } : scope.description())
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .donutLabelsOutside(attrs.donutlabelsoutside === undefined ? false : (attrs.donutlabelsoutside === "true"))
                                        .donut(attrs.donut === undefined ? false : (attrs.donut === "true"))
                                        .donutRatio(attrs.donutratio === undefined ? 0.5 : (attrs.donutratio));

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3ScatterChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showcontrols: '@',
                    showDistX: '@',
                    showDistY: '@',
                    rightAlignYAxis: '@',
                    fisheye: '@',
                    xPadding: '@',
                    yPadding: '@',
                    tooltipContent: '&',
                    tooltipXContent: '&',
                    tooltipYContent: '&',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    transitionDuration: '@',
                    shape: '&',
                    onlyCircles: '@',
                    interactive: '@',
                    x: '&',
                    y: '&',
                    size: '&',
                    forceX: '@',
                    forceY: '@',
                    forceSize: '@',
                    xrange: '&',
                    xdomain: '&',
                    xscale: '&',
                    yrange: '&',
                    ydomain: '&',
                    yscale: '&',
                    sizerange: '&',
                    sizedomain: '&',
                    zscale: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.scatterChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d.y; } : scope.y())
                                        .size(attrs.size === undefined ? function (d) { return d.size; } : scope.size())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex))
                                        .forceY(attrs.forcey === undefined ? [] : scope.$eval(attrs.forcey))
                                        .forceSize(attrs.forcesize === undefined ? [] : scope.$eval(attrs.forcesize))
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .tooltipContent(attrs.tooltipContent === undefined ? null : scope.tooltipContent())
                                        .tooltipXContent(attrs.tooltipxcontent === undefined ? function (key, x) { return '<strong>' + x + '</strong>'; } : scope.tooltipXContent())
                                        .tooltipYContent(attrs.tooltipycontent === undefined ? function (key, x, y) { return '<strong>' + y + '</strong>'; } : scope.tooltipYContent())
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showDistX(attrs.showdistx === undefined ? false : (attrs.showdistx === "true"))
                                        .showDistY(attrs.showdisty === undefined ? false : (attrs.showdisty === "true"))
                                        .xPadding(attrs.xpadding === undefined ? 0 : (+attrs.xpadding))
                                        .yPadding(attrs.ypadding === undefined ? 0 : (+attrs.ypadding))
                                        .fisheye(attrs.fisheye === undefined ? 0 : (+attrs.fisheye))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .transitionDuration(attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration));

                                    if (attrs.shape) {
                                        chart.scatter.onlyCircles(false);
                                        chart.scatter.shape(attrs.shape === undefined ? function (d) { return d.shape || 'circle'; } : scope.shape());
                                    }

                                    //'pointActive', 'clipVoronoi', 'clipRadius', 'useVoronoi'

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if (attrs.xscale) {
                                        chart.xDomain(scope.xdomain());
                                        chart.xRange(scope.xrange());
                                        chart.xScale(scope.xscale());
                                    }

                                    if (attrs.yscale) {
                                        chart.yDomain(scope.ydomain());
                                        chart.yRange(scope.yrange());
                                        chart.yScale(scope.yscale());
                                    }

                                    if (attrs.zscale) {
                                        chart.sizeDomain(scope.sizedomain());
                                        chart.sizeRange(scope.sizerange());
                                        chart.zScale(scope.zscale());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3ScatterPlusLineChart', [function () {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@'
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {

                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.scatterPlusLineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d.y; } : scope.y())
                                        .size(attrs.size === undefined ? function (d) { return d.size; } : scope.size())
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .tooltipContent(attrs.tooltipContent === undefined ? null : scope.tooltipContent())
                                        .tooltipXContent(attrs.tooltipxcontent === undefined ? function (key, x) { return '<strong>' + x + '</strong>'; } : scope.tooltipXContent())
                                        .tooltipYContent(attrs.tooltipycontent === undefined ? function (key, x, y) { return '<strong>' + y + '</strong>'; } : scope.tooltipYContent())
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showDistX(attrs.showdistx === undefined ? false : (attrs.showdistx === "true"))
                                        .showDistY(attrs.showdisty === undefined ? false : (attrs.showdisty === "true"))
                                        .xPadding(attrs.xpadding === undefined ? 0 : (+attrs.xpadding))
                                        .yPadding(attrs.ypadding === undefined ? 0 : (+attrs.ypadding))
                                        .fisheye(attrs.fisheye === undefined ? 0 : (+attrs.fisheye))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .transitionDuration(attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration));

                                    if (attrs.shape) {
                                        chart.scatter.onlyCircles(false);
                                        chart.scatter.shape(attrs.shape === undefined ? function (d) { return d.shape || 'circle'; } : scope.shape());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    });
                }
            };
        }])
        .directive('nvd3LinePlusBarChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    clipvoronoi: '@',
                    interpolate: '@',
                    //                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //yaxis
                    y2axisorient: '&',
                    y2axisticks: '&',
                    y2axistickvalues: '&',
                    y2axisticksubdivide: '&',
                    y2axisticksize: '&',
                    y2axistickpadding: '&',
                    y2axistickformat: '&',
                    y2axislabel: '&',
                    y2axisscale: '&',
                    y2axisdomain: '&',
                    y2axisrange: '&',
                    y2axisrangeband: '&',
                    y2axisrangebands: '&',
                    y2axisshowmaxmin: '@',
                    y2axishighlightzero: '@',
                    y2axisrotatelabels: '@',
                    y2axisrotateylabel: '@',
                    y2axisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.linePlusBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color());

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureY1axis(chart, scope, attrs);
                                    configureY2axis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3LineWithFocusChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    height2: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '@',
                    margin2: '@',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    clipvoronoi: '@',
                    interpolate: '@',
                    isArea: '@',
                    //                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelabels: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //x2axis
                    x2axisorient: '&',
                    x2axisticks: '&',
                    x2axistickvalues: '&xaxistickvalues',
                    x2axisticksubdivide: '&',
                    x2axisticksize: '&',
                    x2axistickpadding: '&',
                    x2axistickformat: '&',
                    x2axislabel: '@',
                    x2axisscale: '&',
                    x2axisdomain: '&',
                    x2axisrange: '&',
                    x2axisrangeband: '&',
                    x2axisrangebands: '&',
                    x2axisshowmaxmin: '@',
                    x2axishighlightzero: '@',
                    x2axisrotatelables: '@',
                    x2axisrotateylabel: '@',
                    x2axisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelabels: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //yaxis
                    y2axisorient: '&',
                    y2axisticks: '&',
                    y2axistickvalues: '&',
                    y2axisticksubdivide: '&',
                    y2axisticksize: '&',
                    y2axistickpadding: '&',
                    y2axistickformat: '&',
                    y2axislabel: '&',
                    y2axisscale: '&',
                    y2axisdomain: '&',
                    y2axisrange: '&',
                    y2axisrangeband: '&',
                    y2axisrangebands: '&',
                    y2axisshowmaxmin: '@',
                    y2axishighlightzero: '@',
                    y2axisrotatelabels: '@',
                    y2axisrotateylabel: '@',
                    y2axisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);

                                    //setup height 2
                                    //height 2 is 100

                                    //margin
                                    //nvd3 default is {top: 30, right: 30, bottom: 30, left: 60}

                                    //setup margin 2
                                    //nvd3 default is {top: 0, right: 30, bottom: 20, left: 60}

                                    var chart = nv.models.lineWithFocusChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .height2((attrs.height2 === undefined ? 100 : (+attrs.height2)))
                                        .margin(scope.margin)
                                        .margin2(scope.margin2)
                                        .x(attrs.x === undefined ? function (d) { return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d[1]; } : scope.y())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color())
                                        .isArea(attrs.isarea === undefined ? function () { return false; } : function () { return (attrs.isarea === "true"); })
                                        .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate);

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureX2axis(chart, scope, attrs);
                                    configureY1axis(chart, scope, attrs);
                                    configureY2axis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                    
                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }])
        .directive('nvd3BulletChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    tooltips: '@',
                    tooltipcontent: '&',
                    orient: '@',  // left, right, top, bottom
                    ranges: '&', //ranges (bad, satisfactory, good)
                    markers: '&', // markers (previous, goal)
                    measures: '&', // measures (actual, forecast)
                    tickformat: '&',
                    nodata: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.bulletChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .orient(attrs.orient === undefined ? 'left' : attrs.orient)
    //                                    .ranges(attrs.ranges === undefined ? function(d){ return d.ranges; } : scope.ranges())
    //                                    .markers(attrs.markers === undefined ? function(d){ return d.markers; } : scope.markers())
    //                                    .measures(attrs.measures === undefined ? function(d){ return d.measures; } : scope.measures())
                                        .tickFormat(attrs.tickformat === undefined ? null : scope.tickformat())
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                    if (attrs.tooltipcontent) {
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3SparklineChart', [function () {
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    xscale: '&',
                    yscale: '&',
                    showvalue: '@',
                    alignvalue: '@',
                    rightalignvalue: '@',
                    nodata: '@',

                    xaxistickformat: '&',
                    yaxistickformat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.d3Call = function (data, chart) {
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.sparklinePlus()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function (d) { return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d.y; } : scope.y())
                                        .color(attrs.color === undefined ? nv.utils.getColor(['#000']) : scope.color())
                                        .showValue(attrs.showvalue === undefined ? true : (attrs.showvalue === "true"))
                                        .alignValue(attrs.alignvalue === undefined ? true : (attrs.alignvalue === "true"))
                                        .rightAlignValue(attrs.rightalignvalue === undefined ? false : (attrs.rightalignvalue === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                    if (attrs.xScale) {
                                        chart.xScale(scope.xScale());
                                    }

                                    if (attrs.yScale) {
                                        chart.yScale(scope.yScale());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3SparklineWithBandlinesChart', [function () {
            'use strict';
            /**
             * http://www.perceptualedge.com/articles/visual_business_intelligence/introducing_bandlines.pdf
             * You need five primary facts about a set of time-series values to construct a bandline:
             * 1) the lowest value,
             * 2) the 25th percentile (i.e., the point at and below which the lowest 25% of the values reside),
             * 3) the median (a.k.a., the 50th percentile, the point at and below which 50% of the values reside),
             * 4) the 75th percentile (i.e., the point at and below which 75% of the values reside), and
             * 5) the highest value.
             */
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    xscale: '&',
                    yscale: '&',
                    showvalue: '@',
                    alignvalue: '@',
                    rightalignvalue: '@',
                    nodata: '@',

                    xaxistickformat: '&',
                    yaxistickformat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    //expect scope to contain bandlineProperties
                    $scope.d3Call = function (data, chart) {

                        var dataAttributeChartID; //randomly generated if id attribute doesn't exist
                        var selectedChart;
                        var sLineSelection;
                        var bandlineData;
                        var bandLines;


                        if (!$attrs.id) {

                            dataAttributeChartID = "chartid" + Math.floor(Math.random() * 1000000001);
                            angular.element($element).attr('data-chartid', dataAttributeChartID);

                            selectedChart = d3.select('[data-iem-chartid=' + dataAttributeChartID + '] svg')
                                .attr('height', $scope.height)
                                .attr('width', $scope.width)
                                .datum(data);

                            //chart.yScale()($scope.bandlineProperties.median)
                            //var sLineSelection = d3.select('svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline');
                            sLineSelection = d3.select('[data-iem-chartid=' + dataAttributeChartID + '] svg' + ' g.nvd3.nv-wrap.nv-sparkline');
                            bandlineData = [
                                $scope.bandlineProperties.min,
                                $scope.bandlineProperties.twentyFithPercentile,
                                $scope.bandlineProperties.median,
                                $scope.bandlineProperties.seventyFithPercentile,
                                $scope.bandlineProperties.max
                            ];
                            bandLines = sLineSelection.selectAll('.nv-bandline').data([bandlineData]);
                            bandLines.enter().append('g')
                                .attr('class', 'nv-bandline');

                            selectedChart.transition().duration(($attrs.transitionduration === undefined ? 250 : (+$attrs.transitionduration)))
                                .call(chart);
                        }

                        else {
                            if (!d3.select('#' + $attrs.id + ' svg')) {
                                d3.select('#' + $attrs.id)
                                    .append('svg');
                            }

                            selectedChart = d3.select('#' + $attrs.id + ' svg')
                                .attr('height', $scope.height)
                                .attr('width', $scope.width)
                                .datum(data);

                            //chart.yScale()($scope.bandlineProperties.median)
                            sLineSelection = d3.select('svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline');
                            bandlineData = [
                                $scope.bandlineProperties.min,
                                $scope.bandlineProperties.twentyFithPercentile,
                                $scope.bandlineProperties.median,
                                $scope.bandlineProperties.seventyFithPercentile,
                                $scope.bandlineProperties.max
                            ];
                            bandLines = sLineSelection.selectAll('.nv-bandline').data([bandlineData]);
                            bandLines.enter().append('g')
                                .attr('class', 'nv-bandline');

                            selectedChart.transition().duration(($attrs.transitionduration === undefined ? 250 : (+$attrs.transitionduration)))
                                .call(chart);
                        }
                    };
                }],
                link: function (scope, element, attrs) {
                    scope.$watch('data', function (data) {
                        if (data) {
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if (scope.chart) {
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function () {
                                    scope.bandlineProperties = {};
                                    var sortedValues, margin = setupDimensions(scope, attrs, element);
                                    var chart = nv.models.sparklinePlus()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(margin)
                                        .x(attrs.x === undefined ? function (d) { return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function (d) { return d.y; } : scope.y())
                                        .color(attrs.color === undefined ? nv.utils.getColor(['#000']) : scope.color())
                                        .showValue(attrs.showvalue === undefined ? true : (attrs.showvalue === "true"))
                                        .alignValue(attrs.alignvalue === undefined ? true : (attrs.alignvalue === "true"))
                                        .rightAlignValue(attrs.rightalignvalue === undefined ? false : (attrs.rightalignvalue === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                    //calc bandline data
                                    scope.bandlineProperties.min = d3.min(data, function (d) { return d[1]; });
                                    scope.bandlineProperties.max = d3.max(data, function (d) { return d[1]; });
                                    sortedValues = data.map(function (d) {
                                        return d[1];
                                    }).sort(function (a, b) {
                                        if (a[0] < b[0]) {
                                            return -1;
                                        } else if (a[0] === b[0]) {
                                            return 0;
                                        } else {
                                            return 1;
                                        }
                                    });

                                    scope.bandlineProperties.twentyFithPercentile = d3.quantile(sortedValues, 0.25);
                                    scope.bandlineProperties.median = d3.median(sortedValues);
                                    scope.bandlineProperties.seventyFithPercentile = d3.quantile(sortedValues, 0.75);

                                    if (attrs.xScale) {
                                        chart.xScale(scope.xScale());
                                    }

                                    if (attrs.yScale) {
                                        chart.yScale(scope.yScale());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);

                                    scope.d3Call(data, chart);

                                    nv.utils.windowResize(chart.update);

                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }]);

    //still need to implement
    //sparkbars??
    //nv.models.multiBarTimeSeriesChart
    //nv.models.multiChart
    //nv.models.scatterPlusLineChart
    //nv.models.linePlusBarWithFocusChart
    //dual y-axis chart

    //crossfilter using $services?
}());
(function(){/*


 Copyright 2011 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var d="prototype";function e(a){this.set("fontFamily","sans-serif");this.set("fontSize",12);this.set("fontColor","#000000");this.set("strokeWeight",4);this.set("strokeColor","#ffffff");this.set("align","center");this.set("zIndex",1E3);this.setValues(a)}e.prototype=new google.maps.OverlayView;window.MapLabel=e;e[d].changed=function(a){switch(a){case "fontFamily":case "fontSize":case "fontColor":case "strokeWeight":case "strokeColor":case "align":case "text":return h(this);case "maxZoom":case "minZoom":case "position":return this.draw()}};
function h(a){var b=a.a;if(b){var f=b.style;f.zIndex=a.get("zIndex");var c=b.getContext("2d");c.clearRect(0,0,b.width,b.height);c.strokeStyle=a.get("strokeColor");c.fillStyle=a.get("fontColor");c.font=a.get("fontSize")+"px "+a.get("fontFamily");var b=Number(a.get("strokeWeight")),g=a.get("text");if(g){if(b)c.lineWidth=b,c.strokeText(g,b,b);c.fillText(g,b,b);a:{c=c.measureText(g).width+b;switch(a.get("align")){case "left":a=0;break a;case "right":a=-c;break a}a=c/-2}f.marginLeft=a+"px";f.marginTop=
"-0.4em"}}}e[d].onAdd=function(){var a=this.a=document.createElement("canvas");a.style.position="absolute";var b=a.getContext("2d");b.lineJoin="round";b.textBaseline="top";h(this);(b=this.getPanes())&&b.mapPane.appendChild(a)};e[d].onAdd=e[d].onAdd;
e[d].draw=function(){var a=this.getProjection();if(a&&this.a){var b=this.get("position");if(b){b=a.fromLatLngToDivPixel(b);a=this.a.style;a.top=b.y+"px";a.left=b.x+"px";var b=this.get("minZoom"),f=this.get("maxZoom");if(b===void 0&&f===void 0)b="";else{var c=this.getMap();c?(c=c.getZoom(),b=c<b||c>f?"hidden":""):b=""}a.visibility=b}}};e[d].draw=e[d].draw;e[d].onRemove=function(){var a=this.a;a&&a.parentNode&&a.parentNode.removeChild(a)};e[d].onRemove=e[d].onRemove;})();

(function(){

var nv = window.nv || {};


nv.version = '1.1.15b';
nv.dev = true; //set false when in production

window.nv = nv;

nv.tooltip = nv.tooltip || {}; // For the tooltip system
nv.utils = nv.utils || {}; // Utility subsystem
nv.models = nv.models || {}; //stores all the possible models/components
nv.charts = {}; //stores all the ready to use charts
nv.graphs = []; //stores all the graphs currently on the page
nv.logs = {}; //stores some statistics and potential error messages

nv.dispatch = d3.dispatch('render_start', 'render_end');

// *************************************************************************
//  Development render timers - disabled if dev = false

if (nv.dev) {
  nv.dispatch.on('render_start', function(e) {
    nv.logs.startTime = +new Date();
  });

  nv.dispatch.on('render_end', function(e) {
    nv.logs.endTime = +new Date();
    nv.logs.totalTime = nv.logs.endTime - nv.logs.startTime;
    nv.log('total', nv.logs.totalTime); // used for development, to keep track of graph generation times
  });
}

// ********************************************
//  Public Core NV functions

// Logs all arguments, and returns the last so you can test things in place
// Note: in IE8 console.log is an object not a function, and if modernizr is used
// then calling Function.prototype.bind with with anything other than a function
// causes a TypeError to be thrown.
nv.log = function() {
  if (nv.dev && console.log && console.log.apply)
    console.log.apply(console, arguments)
  else if (nv.dev && typeof console.log == "function" && Function.prototype.bind) {
    var log = Function.prototype.bind.call(console.log, console);
    log.apply(console, arguments);
  }
  return arguments[arguments.length - 1];
};


nv.render = function render(step) {
  step = step || 1; // number of graphs to generate in each timeout loop

  nv.render.active = true;
  nv.dispatch.render_start();

  setTimeout(function() {
    var chart, graph;

    for (var i = 0; i < step && (graph = nv.render.queue[i]); i++) {
      chart = graph.generate();
      if (typeof graph.callback == typeof(Function)) graph.callback(chart);
      nv.graphs.push(chart);
    }

    nv.render.queue.splice(0, i);

    if (nv.render.queue.length) setTimeout(arguments.callee, 0);
    else {
      nv.dispatch.render_end();
      nv.render.active = false;
    }
  }, 0);
};

nv.render.active = false;
nv.render.queue = [];

nv.addGraph = function(obj) {
  if (typeof arguments[0] === typeof(Function))
    obj = {generate: arguments[0], callback: arguments[1]};

  nv.render.queue.push(obj);

  if (!nv.render.active) nv.render();
};

nv.identity = function(d) { return d; };

nv.strip = function(s) { return s.replace(/(\s|&)/g,''); };

function daysInMonth(month,year) {
  return (new Date(year, month+1, 0)).getDate();
}

function d3_time_range(floor, step, number) {
  return function(t0, t1, dt) {
    var time = floor(t0), times = [];
    if (time < t0) step(time);
    if (dt > 1) {
      while (time < t1) {
        var date = new Date(+time);
        if ((number(date) % dt === 0)) times.push(date);
        step(time);
      }
    } else {
      while (time < t1) { times.push(new Date(+time)); step(time); }
    }
    return times;
  };
}

d3.time.monthEnd = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0);
};

d3.time.monthEnds = d3_time_range(d3.time.monthEnd, function(date) {
    date.setUTCDate(date.getUTCDate() + 1);
    date.setDate(daysInMonth(date.getMonth() + 1, date.getFullYear()));
  }, function(date) {
    return date.getMonth();
  }
);

/* Utility class to handle creation of an interactive layer.
This places a rectangle on top of the chart. When you mouse move over it, it sends a dispatch
containing the X-coordinate. It can also render a vertical line where the mouse is located.

dispatch.elementMousemove is the important event to latch onto.  It is fired whenever the mouse moves over
the rectangle. The dispatch is given one object which contains the mouseX/Y location.
It also has 'pointXValue', which is the conversion of mouseX to the x-axis scale.
*/
nv.interactiveGuideline = function() {
	"use strict";
	var tooltip = nv.models.tooltip();
	//Public settings
	var width = null
	, height = null
    //Please pass in the bounding chart's top and left margins
    //This is important for calculating the correct mouseX/Y positions.
	, margin = {left: 0, top: 0}
	, xScale = d3.scale.linear()
	, yScale = d3.scale.linear()
	, dispatch = d3.dispatch('elementMousemove', 'elementMouseout','elementDblclick')
	, showGuideLine = true
	, svgContainer = null  
    //Must pass in the bounding chart's <svg> container.
    //The mousemove event is attached to this container.
	;

	//Private variables
	var isMSIE = navigator.userAgent.indexOf("MSIE") !== -1  //Check user-agent for Microsoft Internet Explorer.
	;


	function layer(selection) {
		selection.each(function(data) {
				var container = d3.select(this);
				
				var availableWidth = (width || 960), availableHeight = (height || 400);

				var wrap = container.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([data]);
				var wrapEnter = wrap.enter()
								.append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
								
				
				wrapEnter.append("g").attr("class","nv-interactiveGuideLine");
				
				if (!svgContainer) {
					return;
				}

                function mouseHandler() {
                      var d3mouse = d3.mouse(this);
                      var mouseX = d3mouse[0];
                      var mouseY = d3mouse[1];
                      var subtractMargin = true;
                      var mouseOutAnyReason = false;
                      if (isMSIE) {
                         /*
                            D3.js (or maybe SVG.getScreenCTM) has a nasty bug in Internet Explorer 10.
                            d3.mouse() returns incorrect X,Y mouse coordinates when mouse moving
                            over a rect in IE 10.
                            However, d3.event.offsetX/Y also returns the mouse coordinates
                            relative to the triggering <rect>. So we use offsetX/Y on IE.  
                         */
                         mouseX = d3.event.offsetX;
                         mouseY = d3.event.offsetY;

                         /*
                            On IE, if you attach a mouse event listener to the <svg> container,
                            it will actually trigger it for all the child elements (like <path>, <circle>, etc).
                            When this happens on IE, the offsetX/Y is set to where ever the child element
                            is located.
                            As a result, we do NOT need to subtract margins to figure out the mouse X/Y
                            position under this scenario. Removing the line below *will* cause 
                            the interactive layer to not work right on IE.
                         */
                         if(d3.event.target.tagName !== "svg")
                            subtractMargin = false;

                         if (d3.event.target.className.baseVal.match("nv-legend"))
                         	mouseOutAnyReason = true;
                          
                      }

                      if(subtractMargin) {
                         mouseX -= margin.left;
                         mouseY -= margin.top;
                      }

                      /* If mouseX/Y is outside of the chart's bounds,
                      trigger a mouseOut event.
                      */
                      if (mouseX < 0 || mouseY < 0 
                        || mouseX > availableWidth || mouseY > availableHeight
                        || (d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined)
                        || mouseOutAnyReason
                        ) 
                      {
                      		if (isMSIE) {
                      			if (d3.event.relatedTarget 
                      				&& d3.event.relatedTarget.ownerSVGElement === undefined
                      				&& d3.event.relatedTarget.className.match(tooltip.nvPointerEventsClass)) {
                      				return;
                      			}
                      		}
                            dispatch.elementMouseout({
                               mouseX: mouseX,
                               mouseY: mouseY
                            });
                            layer.renderGuideLine(null); //hide the guideline
                            return;
                      }
                      
                      var pointXValue = xScale.invert(mouseX);
                      dispatch.elementMousemove({
                            mouseX: mouseX,
                            mouseY: mouseY,
                            pointXValue: pointXValue
                      });

                      //If user double clicks the layer, fire a elementDblclick dispatch.
                      if (d3.event.type === "dblclick") {
                        dispatch.elementDblclick({
                            mouseX: mouseX,
                            mouseY: mouseY,
                            pointXValue: pointXValue
                        });
                      }
                }

				svgContainer
				      .on("mousemove",mouseHandler, true)
				      .on("mouseout" ,mouseHandler,true)
                      .on("dblclick" ,mouseHandler)
				      ;

				 //Draws a vertical guideline at the given X postion.
				layer.renderGuideLine = function(x) {
				 	if (!showGuideLine) return;
				 	var line = wrap.select(".nv-interactiveGuideLine")
				 	      .selectAll("line")
				 	      .data((x != null) ? [nv.utils.NaNtoZero(x)] : [], String);

				 	line.enter()
				 		.append("line")
				 		.attr("class", "nv-guideline")
				 		.attr("x1", function(d) { return d;})
				 		.attr("x2", function(d) { return d;})
				 		.attr("y1", availableHeight)
				 		.attr("y2",0)
				 		;
				 	line.exit().remove();

				}
		});
	}

	layer.dispatch = dispatch;
	layer.tooltip = tooltip;

	layer.margin = function(_) {
	    if (!arguments.length) return margin;
	    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
	    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
	    return layer;
    };

	layer.width = function(_) {
		if (!arguments.length) return width;
		width = _;
		return layer;
	};

	layer.height = function(_) {
		if (!arguments.length) return height;
		height = _;
		return layer;
	};

	layer.xScale = function(_) {
		if (!arguments.length) return xScale;
		xScale = _;
		return layer;
	};

	layer.showGuideLine = function(_) {
		if (!arguments.length) return showGuideLine;
		showGuideLine = _;
		return layer;
	};

	layer.svgContainer = function(_) {
		if (!arguments.length) return svgContainer;
		svgContainer = _;
		return layer;
	};


	return layer;
};

/* Utility class that uses d3.bisect to find the index in a given array, where a search value can be inserted.
This is different from normal bisectLeft; this function finds the nearest index to insert the search value.

For instance, lets say your array is [1,2,3,5,10,30], and you search for 28. 
Normal d3.bisectLeft will return 4, because 28 is inserted after the number 10.  But interactiveBisect will return 5
because 28 is closer to 30 than 10.

Unit tests can be found in: interactiveBisectTest.html

Has the following known issues:
   * Will not work if the data points move backwards (ie, 10,9,8,7, etc) or if the data points are in random order.
   * Won't work if there are duplicate x coordinate values.
*/
nv.interactiveBisect = function (values, searchVal, xAccessor) {
	  "use strict";
      if (! values instanceof Array) return null;
      if (typeof xAccessor !== 'function') xAccessor = function(d,i) { return d.x;}

      var bisect = d3.bisector(xAccessor).left;
      var index = d3.max([0, bisect(values,searchVal) - 1]);
      var currentValue = xAccessor(values[index], index);
      if (typeof currentValue === 'undefined') currentValue = index;

      if (currentValue === searchVal) return index;  //found exact match

      var nextIndex = d3.min([index+1, values.length - 1]);
      var nextValue = xAccessor(values[nextIndex], nextIndex);
      if (typeof nextValue === 'undefined') nextValue = nextIndex;

      if (Math.abs(nextValue - searchVal) >= Math.abs(currentValue - searchVal))
          return index;
      else
          return nextIndex
};

/*
Returns the index in the array "values" that is closest to searchVal.
Only returns an index if searchVal is within some "threshold".
Otherwise, returns null.
*/
nv.nearestValueIndex = function (values, searchVal, threshold) {
      "use strict";
      var yDistMax = Infinity, indexToHighlight = null;
      values.forEach(function(d,i) {
         var delta = Math.abs(searchVal - d);
         if ( delta <= yDistMax && delta < threshold) {
            yDistMax = delta;
            indexToHighlight = i;
         }
      });
      return indexToHighlight;
};/* Tooltip rendering model for nvd3 charts.
window.nv.models.tooltip is the updated,new way to render tooltips.

window.nv.tooltip.show is the old tooltip code.
window.nv.tooltip.* also has various helper methods.
*/
(function() {
  "use strict";
  window.nv.tooltip = {};

  /* Model which can be instantiated to handle tooltip rendering.
    Example usage: 
    var tip = nv.models.tooltip().gravity('w').distance(23)
                .data(myDataObject);

        tip();    //just invoke the returned function to render tooltip.
  */
  window.nv.models.tooltip = function() {
        var content = null    //HTML contents of the tooltip.  If null, the content is generated via the data variable.
        ,   data = null     /* Tooltip data. If data is given in the proper format, a consistent tooltip is generated.
        Format of data:
        {
            key: "Date",
            value: "August 2009", 
            series: [
                    {
                        key: "Series 1",
                        value: "Value 1",
                        color: "#000"
                    },
                    {
                        key: "Series 2",
                        value: "Value 2",
                        color: "#00f"
                    }
            ]

        }

        */
        ,   gravity = 'w'   //Can be 'n','s','e','w'. Determines how tooltip is positioned.
        ,   distance = 50   //Distance to offset tooltip from the mouse location.
        ,   snapDistance = 25   //Tolerance allowed before tooltip is moved from its current position (creates 'snapping' effect)
        ,   fixedTop = null //If not null, this fixes the top position of the tooltip.
        ,   classes = null  //Attaches additional CSS classes to the tooltip DIV that is created.
        ,   chartContainer = null   //Parent DIV, of the SVG Container that holds the chart.
        ,   tooltipElem = null  //actual DOM element representing the tooltip.
        ,   position = {left: null, top: null}      //Relative position of the tooltip inside chartContainer.
        ,   enabled = true  //True -> tooltips are rendered. False -> don't render tooltips.
        //Generates a unique id when you create a new tooltip() object
        ,   id = "nvtooltip-" + Math.floor(Math.random() * 100000)
        ;

        //CSS class to specify whether element should not have mouse events.
        var  nvPointerEventsClass = "nv-pointer-events-none";

        //Format function for the tooltip values column
        var valueFormatter = function(d,i) {
            return d;
        };

        //Format function for the tooltip header value.
        var headerFormatter = function(d) {
            return d;
        };

        //By default, the tooltip model renders a beautiful table inside a DIV.
        //You can override this function if a custom tooltip is desired.
        var contentGenerator = function(d) {
            if (content != null) return content;

            if (d == null) return '';

            var table = d3.select(document.createElement("table"));
            var theadEnter = table.selectAll("thead")
                .data([d])
                .enter().append("thead");
            theadEnter.append("tr")
                .append("td")
                .attr("colspan",3)
                .append("strong")
                    .classed("x-value",true)
                    .html(headerFormatter(d.value));

            var tbodyEnter = table.selectAll("tbody")
                .data([d])
                .enter().append("tbody");
            var trowEnter = tbodyEnter.selectAll("tr")
                .data(function(p) { return p.series})
                .enter()
                .append("tr")
                .classed("highlight", function(p) { return p.highlight})
                ;

            trowEnter.append("td")
                .classed("legend-color-guide",true)
                .append("div")
                    .style("background-color", function(p) { return p.color});
            trowEnter.append("td")
                .classed("key",true)
                .html(function(p) {return p.key});
            trowEnter.append("td")
                .classed("value",true)
                .html(function(p,i) { return valueFormatter(p.value,i) });


            trowEnter.selectAll("td").each(function(p) {
                if (p.highlight) {
                    var opacityScale = d3.scale.linear().domain([0,1]).range(["#fff",p.color]);
                    var opacity = 0.6;
                    d3.select(this)
                        .style("border-bottom-color", opacityScale(opacity))
                        .style("border-top-color", opacityScale(opacity))
                        ;
                }
            });

            var html = table.node().outerHTML;
            if (d.footer !== undefined)
                html += "<div class='footer'>" + d.footer + "</div>";
            return html;

        };

        var dataSeriesExists = function(d) {
            if (d && d.series && d.series.length > 0) return true;

            return false;
        };

        //In situations where the chart is in a 'viewBox', re-position the tooltip based on how far chart is zoomed.
        function convertViewBoxRatio() {
            if (chartContainer) {
              var svg = d3.select(chartContainer);
              if (svg.node().tagName !== "svg") {
                 svg = svg.select("svg");
              }
              var viewBox = (svg.node()) ? svg.attr('viewBox') : null;
              if (viewBox) {
                viewBox = viewBox.split(' ');
                var ratio = parseInt(svg.style('width')) / viewBox[2];
                
                position.left = position.left * ratio;
                position.top  = position.top * ratio;
              }
            }
        }

        //Creates new tooltip container, or uses existing one on DOM.
        function getTooltipContainer(newContent) {
            var body;
            if (chartContainer)
                body = d3.select(chartContainer);
            else
                body = d3.select("body");

            var container = body.select(".nvtooltip");
            if (container.node() === null) {
                //Create new tooltip div if it doesn't exist on DOM.
                container = body.append("div")
                    .attr("class", "nvtooltip " + (classes? classes: "xy-tooltip"))
                    .attr("id",id)
                    ;
            }
        

            container.node().innerHTML = newContent;
            container.style("top",0).style("left",0).style("opacity",0);
            container.selectAll("div, table, td, tr").classed(nvPointerEventsClass,true)
            container.classed(nvPointerEventsClass,true);
            return container.node();
        }

        

        //Draw the tooltip onto the DOM.
        function nvtooltip() {
            if (!enabled) return;
            if (!dataSeriesExists(data)) return;

            convertViewBoxRatio();

            var left = position.left;
            var top = (fixedTop != null) ? fixedTop : position.top;
            var container = getTooltipContainer(contentGenerator(data));
            tooltipElem = container;
            if (chartContainer) {
                var svgComp = chartContainer.getElementsByTagName("svg")[0];
                var boundRect = (svgComp) ? svgComp.getBoundingClientRect() : chartContainer.getBoundingClientRect();
                var svgOffset = {left:0,top:0};
                if (svgComp) {
                    var svgBound = svgComp.getBoundingClientRect();
                    var chartBound = chartContainer.getBoundingClientRect();
                    var svgBoundTop = svgBound.top;
                    
                    //Defensive code. Sometimes, svgBoundTop can be a really negative
                    //  number, like -134254. That's a bug. 
                    //  If such a number is found, use zero instead. FireFox bug only
                    if (svgBoundTop < 0) {
                        var containerBound = chartContainer.getBoundingClientRect();
                        svgBoundTop = (Math.abs(svgBoundTop) > containerBound.height) ? 0 : svgBoundTop;
                    } 
                    svgOffset.top = Math.abs(svgBoundTop - chartBound.top);
                    svgOffset.left = Math.abs(svgBound.left - chartBound.left);
                }
                //If the parent container is an overflow <div> with scrollbars, subtract the scroll offsets.
                //You need to also add any offset between the <svg> element and its containing <div>
                //Finally, add any offset of the containing <div> on the whole page.
                left += chartContainer.offsetLeft + svgOffset.left - 2*chartContainer.scrollLeft;
                top += chartContainer.offsetTop + svgOffset.top - 2*chartContainer.scrollTop;
                console.log(left + ', ' + top);
            }

            if (snapDistance && snapDistance > 0) {
                top = Math.floor(top/snapDistance) * snapDistance;
            }

            nv.tooltip.calcTooltipPosition([left,top], gravity, distance, container);
            return nvtooltip;
        };

        nvtooltip.nvPointerEventsClass = nvPointerEventsClass;
        
        nvtooltip.content = function(_) {
            if (!arguments.length) return content;
            content = _;
            return nvtooltip;
        };

        //Returns tooltipElem...not able to set it.
        nvtooltip.tooltipElem = function() {
            return tooltipElem;
        };

        nvtooltip.contentGenerator = function(_) {
            if (!arguments.length) return contentGenerator;
            if (typeof _ === 'function') {
                contentGenerator = _;
            }
            return nvtooltip;
        };

        nvtooltip.data = function(_) {
            if (!arguments.length) return data;
            data = _;
            return nvtooltip;
        };

        nvtooltip.gravity = function(_) {
            if (!arguments.length) return gravity;
            gravity = _;
            return nvtooltip;
        };

        nvtooltip.distance = function(_) {
            if (!arguments.length) return distance;
            distance = _;
            return nvtooltip;
        };

        nvtooltip.snapDistance = function(_) {
            if (!arguments.length) return snapDistance;
            snapDistance = _;
            return nvtooltip;
        };

        nvtooltip.classes = function(_) {
            if (!arguments.length) return classes;
            classes = _;
            return nvtooltip;
        };

        nvtooltip.chartContainer = function(_) {
            if (!arguments.length) return chartContainer;
            chartContainer = _;
            return nvtooltip;
        };

        nvtooltip.position = function(_) {
            if (!arguments.length) return position;
            position.left = (typeof _.left !== 'undefined') ? _.left : position.left;
            position.top = (typeof _.top !== 'undefined') ? _.top : position.top;
            return nvtooltip;
        };

        nvtooltip.fixedTop = function(_) {
            if (!arguments.length) return fixedTop;
            fixedTop = _;
            return nvtooltip;
        };

        nvtooltip.enabled = function(_) {
            if (!arguments.length) return enabled;
            enabled = _;
            return nvtooltip;
        };

        nvtooltip.valueFormatter = function(_) {
            if (!arguments.length) return valueFormatter;
            if (typeof _ === 'function') {
                valueFormatter = _;
            }
            return nvtooltip;
        };

        nvtooltip.headerFormatter = function(_) {
            if (!arguments.length) return headerFormatter;
            if (typeof _ === 'function') {
                headerFormatter = _;
            }
            return nvtooltip;
        };

        //id() is a read-only function. You can't use it to set the id.
        nvtooltip.id = function() {
            return id;
        };


        return nvtooltip;
  };


  //Original tooltip.show function. Kept for backward compatibility.
  // pos = [left,top]
  nv.tooltip.show = function(pos, content, gravity, dist, parentContainer, classes) {
      
        //Create new tooltip div if it doesn't exist on DOM.
        var   container = document.createElement('div');
        container.className = 'nvtooltip ' + (classes ? classes : 'xy-tooltip');

        var body = parentContainer;
        if ( !parentContainer || parentContainer.tagName.match(/g|svg/i)) {
            //If the parent element is an SVG element, place tooltip in the <body> element.
            body = document.getElementsByTagName('body')[0];
        }
   
        container.style.left = 0;
        container.style.top = 0;
        container.style.opacity = 0;
        container.innerHTML = content;
        body.appendChild(container);
        
        //If the parent container is an overflow <div> with scrollbars, subtract the scroll offsets.
        if (parentContainer) {
           pos[0] = pos[0] - parentContainer.scrollLeft;
           pos[1] = pos[1] - parentContainer.scrollTop;
        }
        nv.tooltip.calcTooltipPosition(pos, gravity, dist, container);
  };

  //Looks up the ancestry of a DOM element, and returns the first NON-svg node.
  nv.tooltip.findFirstNonSVGParent = function(Elem) {
            while(Elem.tagName.match(/^g|svg$/i) !== null) {
                Elem = Elem.parentNode;
            }
            return Elem;
  };

  //Finds the total offsetTop of a given DOM element.
  //Looks up the entire ancestry of an element, up to the first relatively positioned element.
  nv.tooltip.findTotalOffsetTop = function ( Elem, initialTop ) {
                var offsetTop = initialTop;
                
                do {
                    if( !isNaN( Elem.offsetTop ) ) {
                        offsetTop += (Elem.offsetTop);
                    }
                } while( Elem = Elem.offsetParent );
                return offsetTop;
  };

  //Finds the total offsetLeft of a given DOM element.
  //Looks up the entire ancestry of an element, up to the first relatively positioned element.
  nv.tooltip.findTotalOffsetLeft = function ( Elem, initialLeft) {
                var offsetLeft = initialLeft;
                
                do {
                    if( !isNaN( Elem.offsetLeft ) ) {
                        offsetLeft += (Elem.offsetLeft);
                    }
                } while( Elem = Elem.offsetParent );
                return offsetLeft;
  };

  //Global utility function to render a tooltip on the DOM.
  //pos = [left,top] coordinates of where to place the tooltip, relative to the SVG chart container.
  //gravity = how to orient the tooltip
  //dist = how far away from the mouse to place tooltip
  //container = tooltip DIV
  nv.tooltip.calcTooltipPosition = function(pos, gravity, dist, container) {

            var height = parseInt(container.offsetHeight),
                width = parseInt(container.offsetWidth),
                windowWidth = nv.utils.windowSize().width,
                windowHeight = nv.utils.windowSize().height,
                scrollTop = window.pageYOffset,
                scrollLeft = window.pageXOffset,
                left, top;

            windowHeight = window.innerWidth >= document.body.scrollWidth ? windowHeight : windowHeight - 16;
            windowWidth = window.innerHeight >= document.body.scrollHeight ? windowWidth : windowWidth - 16;

            gravity = gravity || 's';
            dist = dist || 20;

            var tooltipTop = function ( Elem ) {
                return nv.tooltip.findTotalOffsetTop(Elem, top);
            };

            var tooltipLeft = function ( Elem ) {
                return nv.tooltip.findTotalOffsetLeft(Elem,left);
            };

            switch (gravity) {
              case 'e':
                left = pos[0] - width - dist;
                top = pos[1] - (height / 2);
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = pos[0] + dist > scrollLeft ? pos[0] + dist : scrollLeft - tLeft + left;
                if (tTop < scrollTop) top = scrollTop - tTop + top;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 'w':
                left = pos[0] + dist;
                top = pos[1] - (height / 2);
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft + width > windowWidth) left = pos[0] - width - dist;
                if (tTop < scrollTop) top = scrollTop + 5;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 'n':
                left = pos[0] - (width / 2) - 5;
                top = pos[1] + dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = scrollLeft + 5;
                if (tLeft + width > windowWidth) left = left - width/2 + 5;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 's':
                left = pos[0] - (width / 2);
                top = pos[1] - height - dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = scrollLeft + 5;
                if (tLeft + width > windowWidth) left = left - width/2 + 5;
                if (scrollTop > tTop) top = scrollTop;
                break;
              case 'none':
                left = pos[0];
                top = pos[1] - dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                break;
            }


            container.style.left = left+'px';
            container.style.top = top+'px';
            container.style.opacity = 1;
            container.style.position = 'absolute'; 

            return container;
    };

    //Global utility function to remove tooltips from the DOM.
    nv.tooltip.cleanup = function() {

              // Find the tooltips, mark them for removal by this class (so others cleanups won't find it)
              var tooltips = document.getElementsByClassName('nvtooltip');
              var purging = [];
              while(tooltips.length) {
                purging.push(tooltips[0]);
                tooltips[0].style.transitionDelay = '0 !important';
                tooltips[0].style.opacity = 0;
                tooltips[0].className = 'nvtooltip-pending-removal';
              }

              setTimeout(function() {

                  while (purging.length) {
                     var removeMe = purging.pop();
                      removeMe.parentNode.removeChild(removeMe);
                  }
            }, 500);
    };

})();

nv.utils.windowSize = function() {
    // Sane defaults
    var size = {width: 640, height: 480};

    // Earlier IE uses Doc.body
    if (document.body && document.body.offsetWidth) {
        size.width = document.body.offsetWidth;
        size.height = document.body.offsetHeight;
    }

    // IE can use depending on mode it is in
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
        size.width = document.documentElement.offsetWidth;
        size.height = document.documentElement.offsetHeight;
    }

    // Most recent browsers use
    if (window.innerWidth && window.innerHeight) {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
    }
    return (size);
};



// Easy way to bind multiple functions to window.onresize
// TODO: give a way to remove a function after its bound, other than removing all of them
nv.utils.windowResize = function(fun){
  if (fun === undefined) return;
  var oldresize = window.onresize;

  window.onresize = function(e) {
    if (typeof oldresize == 'function') oldresize(e);
    fun(e);
  }
}

// Backwards compatible way to implement more d3-like coloring of graphs.
// If passed an array, wrap it in a function which implements the old default
// behavior
nv.utils.getColor = function(color) {
    if (!arguments.length) return nv.utils.defaultColor(); //if you pass in nothing, get default colors back

    if( Object.prototype.toString.call( color ) === '[object Array]' )
        return function(d, i) { return d.color || color[i % color.length]; };
    else
        return color;
        //can't really help it if someone passes rubbish as color
}

// Default color chooser uses the index of an object as before.
nv.utils.defaultColor = function() {
    var colors = d3.scale.category20().range();
    return function(d, i) { return d.color || colors[i % colors.length] };
}


// Returns a color function that takes the result of 'getKey' for each series and
// looks for a corresponding color from the dictionary,
nv.utils.customTheme = function(dictionary, getKey, defaultColors) {
  getKey = getKey || function(series) { return series.key }; // use default series.key if getKey is undefined
  defaultColors = defaultColors || d3.scale.category20().range(); //default color function

  var defIndex = defaultColors.length; //current default color (going in reverse)

  return function(series, index) {
    var key = getKey(series);

    if (!defIndex) defIndex = defaultColors.length; //used all the default colors, start over

    if (typeof dictionary[key] !== "undefined")
      return (typeof dictionary[key] === "function") ? dictionary[key]() : dictionary[key];
    else
      return defaultColors[--defIndex]; // no match in dictionary, use default color
  }
}



// From the PJAX example on d3js.org, while this is not really directly needed
// it's a very cool method for doing pjax, I may expand upon it a little bit,
// open to suggestions on anything that may be useful
nv.utils.pjax = function(links, content) {
  d3.selectAll(links).on("click", function() {
    history.pushState(this.href, this.textContent, this.href);
    load(this.href);
    d3.event.preventDefault();
  });

  function load(href) {
    d3.html(href, function(fragment) {
      var target = d3.select(content).node();
      target.parentNode.replaceChild(d3.select(fragment).select(content).node(), target);
      nv.utils.pjax(links, content);
    });
  }

  d3.select(window).on("popstate", function() {
    if (d3.event.state) load(d3.event.state);
  });
}

/* For situations where we want to approximate the width in pixels for an SVG:text element.
Most common instance is when the element is in a display:none; container.
Forumla is : text.length * font-size * constant_factor
*/
nv.utils.calcApproxTextWidth = function (svgTextElem) {
    if (typeof svgTextElem.style === 'function'
        && typeof svgTextElem.text === 'function') {
        var fontSize = parseInt(svgTextElem.style("font-size").replace("px",""));
        var textLength = svgTextElem.text().length;

        return textLength * fontSize * 0.5;
    }
    return 0;
};

/* Numbers that are undefined, null or NaN, convert them to zeros.
*/
nv.utils.NaNtoZero = function(n) {
    if (typeof n !== 'number'
        || isNaN(n)
        || n === null
        || n === Infinity) return 0;

    return n;
};

/*
Snippet of code you can insert into each nv.models.* to give you the ability to
do things like:
chart.options({
  showXAxis: true,
  tooltips: true
});

To enable in the chart:
chart.options = nv.utils.optionsFunc.bind(chart);
*/
nv.utils.optionsFunc = function(args) {
    if (args) {
      d3.map(args).forEach((function(key,value) {
        if (typeof this[key] === "function") {
           this[key](value);
        }
      }).bind(this));
    }
    return this;
};

nv.models.axis = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var axis = d3.svg.axis()
    ;

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 75 //only used for tickLabel currently
    , height = 60 //only used for tickLabel currently
    , scale = d3.scale.linear()
    , axisLabelText = null
    , showMaxMin = true //TODO: showMaxMin should be disabled on all ordinal scaled axes
    , highlightZero = true
    , rotateLabels = 0
    , rotateYLabel = true
    , staggerLabels = false
    , isOrdinal = false
    , ticks = null
    , axisLabelDistance = 12 //The larger this number is, the closer the axis label is to the axis.
    ;

  axis
    .scale(scale)
    .orient('bottom')
    .tickFormat(function(d) { return d })
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var scale0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-axis').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-axis');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      //------------------------------------------------------------


      if (ticks !== null)
        axis.ticks(ticks);
      else if (axis.orient() == 'top' || axis.orient() == 'bottom')
        axis.ticks(Math.abs(scale.range()[1] - scale.range()[0]) / 100);


      //TODO: consider calculating width/height based on whether or not label is added, for reference in charts using this component


      g.transition().call(axis);

      scale0 = scale0 || axis.scale();

      var fmt = axis.tickFormat();
      if (fmt == null) {
        fmt = scale0.tickFormat();
      }

      var axisLabel = g.selectAll('text.nv-axislabel')
          .data([axisLabelText || null]);
      axisLabel.exit().remove();
      switch (axis.orient()) {
        case 'top':
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
          axisLabel
              .attr('text-anchor', 'middle')
              .attr('y', 0)
              .attr('x', w/2);
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(' + scale(d) + ',0)'
                })
              .select('text')
                .attr('dy', '-0.5em')
                .attr('y', -axis.tickPadding())
                .attr('text-anchor', 'middle')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(' + scale.range()[i] + ',0)'
                });
          }
          break;
        case 'bottom':
          var xLabelMargin = 36;
          var maxTextWidth = 30;
          var xTicks = g.selectAll('g').select("text");
          if (rotateLabels%360) {
            //Calculate the longest xTick width
            xTicks.each(function(d,i){
              var width = this.getBBox().width;
              if(width > maxTextWidth) maxTextWidth = width;
            });
            //Convert to radians before calculating sin. Add 30 to margin for healthy padding.
            var sin = Math.abs(Math.sin(rotateLabels*Math.PI/180));
            var xLabelMargin = (sin ? sin*maxTextWidth : maxTextWidth)+30;
            //Rotate all xTicks
            xTicks
              .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
              .style('text-anchor', rotateLabels%360 > 0 ? 'start' : 'end');
          }
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
          axisLabel
              .attr('text-anchor', 'middle')
              .attr('y', xLabelMargin)
              .attr('x', w/2);
          if (showMaxMin) {
          //if (showMaxMin && !isOrdinal) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           //.data(scale.domain())
                           .data([scale.domain()[0], scale.domain()[scale.domain().length - 1]]);
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(' + (scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0)) + ',0)'
                })
              .select('text')
                .attr('dy', '.71em')
                .attr('y', axis.tickPadding())
                .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
                .style('text-anchor', rotateLabels ? (rotateLabels%360 > 0 ? 'start' : 'end') : 'middle')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  //return 'translate(' + scale.range()[i] + ',0)'
                  //return 'translate(' + scale(d) + ',0)'
                  return 'translate(' + (scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0)) + ',0)'
                });
          }
          if (staggerLabels)
            xTicks
                .attr('transform', function(d,i) { return 'translate(0,' + (i % 2 == 0 ? '0' : '12') + ')' });

          break;
        case 'right':
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          axisLabel
              .style('text-anchor', rotateYLabel ? 'middle' : 'begin')
              .attr('transform', rotateYLabel ? 'rotate(90)' : '')
              .attr('y', rotateYLabel ? (-Math.max(margin.right,width) + 12) : -10) //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
              .attr('x', rotateYLabel ? (scale.range()[0] / 2) : axis.tickPadding());
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
                .style('opacity', 0);
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale(d) + ')'
                })
              .select('text')
                .attr('dy', '.32em')
                .attr('y', 0)
                .attr('x', axis.tickPadding())
                .style('text-anchor', 'start')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale.range()[i] + ')'
                })
              .select('text')
                .style('opacity', 1);
          }
          break;
        case 'left':
          /*
          //For dynamically placing the label. Can be used with dynamically-sized chart axis margins
          var yTicks = g.selectAll('g').select("text");
          yTicks.each(function(d,i){
            var labelPadding = this.getBBox().width + axis.tickPadding() + 16;
            if(labelPadding > width) width = labelPadding;
          });
          */
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          axisLabel
              .style('text-anchor', rotateYLabel ? 'middle' : 'end')
              .attr('transform', rotateYLabel ? 'rotate(-90)' : '')
              .attr('y', -30) //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
              .attr('x', rotateYLabel ? (-scale.range()[0] / 2) : -axis.tickPadding());
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
                .style('opacity', 0);
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale0(d) + ')'
                })
              .select('text')
                .attr('dy', '.32em')
                .attr('y', 0)
                .attr('x', -axis.tickPadding())
                .attr('text-anchor', 'end')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale.range()[i] + ')'
                })
              .select('text')
                .style('opacity', 1);
          }
          break;
      }
      axisLabel
          .text(function(d) { return d });


      if (showMaxMin && (axis.orient() === 'left' || axis.orient() === 'right')) {
        //check if max and min overlap other values, if so, hide the values that overlap
        g.selectAll('g') // the g's wrapping each tick
            .each(function(d,i) {
              d3.select(this).select('text').attr('opacity', 1);
              if (scale(d) < scale.range()[1] + 10 || scale(d) > scale.range()[0] - 10) { // 10 is assuming text height is 16... if d is 0, leave it!
                if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                  d3.select(this).attr('opacity', 0);

                d3.select(this).select('text').attr('opacity', 0); // Don't remove the ZERO line!!
              }
            });

        //if Max and Min = 0 only show min, Issue #281
        if (scale.domain()[0] == scale.domain()[1] && scale.domain()[0] == 0)
          wrap.selectAll('g.nv-axisMaxMin')
            .style('opacity', function(d,i) { return !i ? 1 : 0 });

      }

      if (showMaxMin && (axis.orient() === 'top' || axis.orient() === 'bottom')) {
        var maxMinRange = [];
        wrap.selectAll('g.nv-axisMaxMin')
            .each(function(d,i) {
              try {
                  if (i) // i== 1, max position
                      maxMinRange.push(scale(d) - this.getBBox().width - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                  else // i==0, min position
                      maxMinRange.push(scale(d) + this.getBBox().width + 4)
              }catch (err) {
                  if (i) // i== 1, max position
                      maxMinRange.push(scale(d) - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                  else // i==0, min position
                      maxMinRange.push(scale(d) + 4)
              }
            });
        g.selectAll('g') // the g's wrapping each tick
            .each(function(d,i) {
              if (scale(d) < maxMinRange[0] || scale(d) > maxMinRange[1]) {
                if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                  d3.select(this).remove();
                else
                  d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
              }
            });
      }


      //highlight zero line ... Maybe should not be an option and should just be in CSS?
      /*if (highlightZero)
        g.selectAll('.tick')
          .filter(function(d) { return !parseFloat(Math.round(d.__data__*100000)/1000000) && (d.__data__ !== undefined) }) //this is because sometimes the 0 tick is a very small fraction, TODO: think of cleaner technique
            .classed('zero', true);
      */
    //store old scales for use in transitions on update
      scale0 = scale.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.axis = axis;

  d3.rebind(chart, axis, 'orient', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat');
  d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands'); //these are also accessible by chart.scale(), but added common ones directly for ease of use

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if(!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.ticks = function(_) {
    if (!arguments.length) return ticks;
    ticks = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.axisLabel = function(_) {
    if (!arguments.length) return axisLabelText;
    axisLabelText = _;
    return chart;
  }

  chart.showMaxMin = function(_) {
    if (!arguments.length) return showMaxMin;
    showMaxMin = _;
    return chart;
  }

  chart.highlightZero = function(_) {
    if (!arguments.length) return highlightZero;
    highlightZero = _;
    return chart;
  }

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    axis.scale(scale);
    isOrdinal = typeof scale.rangeBands === 'function';
    d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands');
    return chart;
  }

  chart.rotateYLabel = function(_) {
    if(!arguments.length) return rotateYLabel;
    rotateYLabel = _;
    return chart;
  }

  chart.rotateLabels = function(_) {
    if(!arguments.length) return rotateLabels;
    rotateLabels = _;
    return chart;
  }

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.axisLabelDistance = function(_) {
    if (!arguments.length) return axisLabelDistance;
    axisLabelDistance = _;
    return chart;
  };

  //============================================================


  return chart;
}
//TODO: consider deprecating and using multibar with single series for this
nv.models.historicalBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceX = []
    , forceY = [0]
    , padData = false
    , clipEdge = true
    , color = nv.utils.defaultColor()
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    , interactive = true
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ))

      if (padData)
        x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(data[0].values.map(getY).concat(forceY) ))
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point

      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-historicalBar-' + id).data([data[0].values]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBar-' + id);
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-bars');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
            dispatch.chartClick({
                data: d,
                index: i,
                pos: d3.event,
                id: id
            });
          });


      defsEnter.append('clipPath')
          .attr('id', 'nv-chart-clip-path-' + id)
        .append('rect');

      wrap.select('#nv-chart-clip-path-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');



      var bars = wrap.select('.nv-bars').selectAll('.nv-bar')
          .data(function(d) { return d }, function(d,i) {return getX(d,i)});

      bars.exit().remove();


      var barsEnter = bars.enter().append('rect')
          //.attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
          .attr('x', 0 )
          .attr('y', function(d,i) {  return nv.utils.NaNtoZero(y(Math.max(0, getY(d,i)))) })
          .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.abs(y(getY(d,i)) - y(0))) })
          .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; }) 
          .on('mouseover', function(d,i) {
            if (!interactive) return;
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
                point: d,
                series: data[0],
                pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
                pointIndex: i,
                seriesIndex: 0,
                e: d3.event
            });

          })
          .on('mouseout', function(d,i) {
                if (!interactive) return;
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    point: d,
                    series: data[0],
                    pointIndex: i,
                    seriesIndex: 0,
                    e: d3.event
                });
          })
          .on('click', function(d,i) {
                if (!interactive) return;
                dispatch.elementClick({
                    //label: d[label],
                    value: getY(d,i),
                    data: d,
                    index: i,
                    pos: [x(getX(d,i)), y(getY(d,i))],
                    e: d3.event,
                    id: id
                });
              d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
              if (!interactive) return;
              dispatch.elementDblClick({
                  //label: d[label],
                  value: getY(d,i),
                  data: d,
                  index: i,
                  pos: [x(getX(d,i)), y(getY(d,i))],
                  e: d3.event,
                  id: id
              });
              d3.event.stopPropagation();
          });

      bars
          .attr('fill', function(d,i) { return color(d, i); })
          .attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
          .transition()
          .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; }) 
           //TODO: better width calculations that don't assume always uniform data spacing;w
          .attr('width', (availableWidth / data[0].values.length) * .9 );


      bars.transition()
          .attr('y', function(d,i) {
            var rval = getY(d,i) < 0 ?
                    y(0) :
                    y(0) - y(getY(d,i)) < 1 ?
                      y(0) - 1 :
                      y(getY(d,i));
            return nv.utils.NaNtoZero(rval);
          })
          .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.max(Math.abs(y(getY(d,i)) - y(0)),1)) });

    });

    return chart;
  }

  //Create methods to allow outside functions to highlight a specific bar.
  chart.highlightPoint = function(pointIndex, isHoverOver) {
      d3.select(".nv-historicalBar-" + id)
        .select(".nv-bars .nv-bar-0-" + pointIndex)
              .classed("hover", isHoverOver)
               ;
  };

  chart.clearHighlights = function() {
      d3.select(".nv-historicalBar-" + id)
        .select(".nv-bars .nv-bar.hover")
              .classed("hover", false)
               ;
  };
  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.interactive = function(_) {
    if(!arguments.length) return interactive;
    interactive = false;
    return chart;
  };

  //============================================================


  return chart;
}

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/

nv.models.bullet = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , orient = 'left' // TODO top & bottom
    , reverse = false
    , ranges = function(d) { return d.ranges }
    , markers = function(d) { return d.markers }
    , measures = function(d) { return d.measures }
    , rangeLabels = function(d) { return d.rangeLabels ? d.rangeLabels : [] }
    , markerLabels = function(d) { return d.markerLabels ? d.markerLabels : []  }
    , measureLabels = function(d) { return d.measureLabels ? d.measureLabels : []  }
    , forceX = [0] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
    , width = 380
    , height = 30
    , tickFormat = null
    , color = nv.utils.getColor(['#1f77b4'])
    , dispatch = d3.dispatch('elementMouseover', 'elementMouseout')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(d, i) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          rangeLabelz = rangeLabels.call(this, d, i).slice(),
          markerLabelz = markerLabels.call(this, d, i).slice(),
          measureLabelz = measureLabels.call(this, d, i).slice();


      //------------------------------------------------------------
      // Setup Scales

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain( d3.extent(d3.merge([forceX, rangez])) )
          .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;


      var rangeMin = d3.min(rangez), //rangez[2]
          rangeMax = d3.max(rangez), //rangez[0]
          rangeAvg = rangez[1];

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-bullet').data([d]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bullet');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('rect').attr('class', 'nv-range nv-rangeMax');
      gEnter.append('rect').attr('class', 'nv-range nv-rangeAvg');
      gEnter.append('rect').attr('class', 'nv-range nv-rangeMin');
      gEnter.append('rect').attr('class', 'nv-measure');
      gEnter.append('path').attr('class', 'nv-markerTriangle');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
          w1 = function(d) { return Math.abs(x1(d) - x1(0)) };
      var xp0 = function(d) { return d < 0 ? x0(d) : x0(0) },
          xp1 = function(d) { return d < 0 ? x1(d) : x1(0) };


      g.select('rect.nv-rangeMax')
          .attr('height', availableHeight)
          .attr('width', w1(rangeMax > 0 ? rangeMax : rangeMin))
          .attr('x', xp1(rangeMax > 0 ? rangeMax : rangeMin))
          .datum(rangeMax > 0 ? rangeMax : rangeMin)
          /*
          .attr('x', rangeMin < 0 ?
                         rangeMax > 0 ?
                             x1(rangeMin)
                           : x1(rangeMax)
                       : x1(0))
                      */

      g.select('rect.nv-rangeAvg')
          .attr('height', availableHeight)
          .attr('width', w1(rangeAvg))
          .attr('x', xp1(rangeAvg))
          .datum(rangeAvg)
          /*
          .attr('width', rangeMax <= 0 ?
                             x1(rangeMax) - x1(rangeAvg)
                           : x1(rangeAvg) - x1(rangeMin))
          .attr('x', rangeMax <= 0 ?
                         x1(rangeAvg)
                       : x1(rangeMin))
                      */

      g.select('rect.nv-rangeMin')
          .attr('height', availableHeight)
          .attr('width', w1(rangeMax))
          .attr('x', xp1(rangeMax))
          .attr('width', w1(rangeMax > 0 ? rangeMin : rangeMax))
          .attr('x', xp1(rangeMax > 0 ? rangeMin : rangeMax))
          .datum(rangeMax > 0 ? rangeMin : rangeMax)
          /*
          .attr('width', rangeMax <= 0 ?
                             x1(rangeAvg) - x1(rangeMin)
                           : x1(rangeMax) - x1(rangeAvg))
          .attr('x', rangeMax <= 0 ?
                         x1(rangeMin)
                       : x1(rangeAvg))
                      */

      g.select('rect.nv-measure')
          .style('fill', color)
          .attr('height', availableHeight / 3)
          .attr('y', availableHeight / 3)
          .attr('width', measurez < 0 ?
                             x1(0) - x1(measurez[0])
                           : x1(measurez[0]) - x1(0))
          .attr('x', xp1(measurez))
          .on('mouseover', function() {
              dispatch.elementMouseover({
                value: measurez[0],
                label: measureLabelz[0] || 'Current',
                pos: [x1(measurez[0]), availableHeight/2]
              })
          })
          .on('mouseout', function() {
              dispatch.elementMouseout({
                value: measurez[0],
                label: measureLabelz[0] || 'Current'
              })
          })

      var h3 =  availableHeight / 6;
      if (markerz[0]) {
        g.selectAll('path.nv-markerTriangle')
            .attr('transform', function(d) { return 'translate(' + x1(markerz[0]) + ',' + (availableHeight / 2) + ')' })
            .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
            .on('mouseover', function() {
              dispatch.elementMouseover({
                value: markerz[0],
                label: markerLabelz[0] || 'Previous',
                pos: [x1(markerz[0]), availableHeight/2]
              })
            })
            .on('mouseout', function() {
              dispatch.elementMouseout({
                value: markerz[0],
                label: markerLabelz[0] || 'Previous'
              })
            });
      } else {
        g.selectAll('path.nv-markerTriangle').remove();
      }


      wrap.selectAll('.nv-range')
          .on('mouseover', function(d,i) {
            var label = rangeLabelz[i] || (!i ? "Maximum" : i == 1 ? "Mean" : "Minimum");

            dispatch.elementMouseover({
              value: d,
              label: label,
              pos: [x1(d), availableHeight/2]
            })
          })
          .on('mouseout', function(d,i) {
            var label = rangeLabelz[i] || (!i ? "Maximum" : i == 1 ? "Mean" : "Minimum");

            dispatch.elementMouseout({
              value: d,
              label: label
            })
          })

/* // THIS IS THE PREVIOUS BULLET IMPLEMENTATION, WILL REMOVE SHORTLY
      // Update the range rects.
      var range = g.selectAll('rect.nv-range')
          .data(rangez);

      range.enter().append('rect')
          .attr('class', function(d, i) { return 'nv-range nv-s' + i; })
          .attr('width', w0)
          .attr('height', availableHeight)
          .attr('x', reverse ? x0 : 0)
          .on('mouseover', function(d,i) { 
              dispatch.elementMouseover({
                value: d,
                label: (i <= 0) ? 'Maximum' : (i > 1) ? 'Minimum' : 'Mean', //TODO: make these labels a variable
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d,i) { 
              dispatch.elementMouseout({
                value: d,
                label: (i <= 0) ? 'Minimum' : (i >=1) ? 'Maximum' : 'Mean' //TODO: make these labels a variable
              })
          })

      d3.transition(range)
          .attr('x', reverse ? x1 : 0)
          .attr('width', w1)
          .attr('height', availableHeight);


      // Update the measure rects.
      var measure = g.selectAll('rect.nv-measure')
          .data(measurez);

      measure.enter().append('rect')
          .attr('class', function(d, i) { return 'nv-measure nv-s' + i; })
          .style('fill', function(d,i) { return color(d,i ) })
          .attr('width', w0)
          .attr('height', availableHeight / 3)
          .attr('x', reverse ? x0 : 0)
          .attr('y', availableHeight / 3)
          .on('mouseover', function(d) { 
              dispatch.elementMouseover({
                value: d,
                label: 'Current', //TODO: make these labels a variable
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d) { 
              dispatch.elementMouseout({
                value: d,
                label: 'Current' //TODO: make these labels a variable
              })
          })

      d3.transition(measure)
          .attr('width', w1)
          .attr('height', availableHeight / 3)
          .attr('x', reverse ? x1 : 0)
          .attr('y', availableHeight / 3);



      // Update the marker lines.
      var marker = g.selectAll('path.nv-markerTriangle')
          .data(markerz);

      var h3 =  availableHeight / 6;
      marker.enter().append('path')
          .attr('class', 'nv-markerTriangle')
          .attr('transform', function(d) { return 'translate(' + x0(d) + ',' + (availableHeight / 2) + ')' })
          .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
          .on('mouseover', function(d,i) {
              dispatch.elementMouseover({
                value: d,
                label: 'Previous',
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d,i) {
              dispatch.elementMouseout({
                value: d,
                label: 'Previous'
              })
          });

      d3.transition(marker)
          .attr('transform', function(d) { return 'translate(' + (x1(d) - x1(0)) + ',' + (availableHeight / 2) + ')' });

      marker.exit().remove();
*/

    });

    // d3.timer.flush();  // Not needed?

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  // left, right, top, bottom
  chart.orient = function(_) {
    if (!arguments.length) return orient;
    orient = _;
    reverse = orient == 'right' || orient == 'bottom';
    return chart;
  };

  // ranges (bad, satisfactory, good)
  chart.ranges = function(_) {
    if (!arguments.length) return ranges;
    ranges = _;
    return chart;
  };

  // markers (previous, goal)
  chart.markers = function(_) {
    if (!arguments.length) return markers;
    markers = _;
    return chart;
  };

  // measures (actual, forecast)
  chart.measures = function(_) {
    if (!arguments.length) return measures;
    measures = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  //============================================================


  return chart;
};



// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
nv.models.bulletChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var bullet = nv.models.bullet()
    ;

  var orient = 'left' // TODO top & bottom
    , reverse = false
    , margin = {top: 5, right: 40, bottom: 20, left: 120}
    , ranges = function(d) { return d.ranges }
    , markers = function(d) { return d.markers }
    , measures = function(d) { return d.measures }
    , width = null
    , height = 55
    , tickFormat = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + x + '</h3>' +
               '<p>' + y + '</p>'
      }
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ) + margin.left,
        top = e.pos[1] + ( offsetElement.offsetTop || 0) + margin.top,
        content = tooltip(e.key, e.label, e.value, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(d, i) {
      var container = d3.select(this);

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          that = this;


      chart.update = function() { chart(selection) };
      chart.container = this;

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!d || !ranges.call(this, d, i)) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', 18 + margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------



      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-bulletChart').data([d]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bulletChart');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-bulletWrap');
      gEnter.append('g').attr('class', 'nv-titles');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])  // TODO: need to allow forceX and forceY, and xDomain, yDomain
          .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      /*
      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

      function bulletWidth(x) {
        var x0 = x(0);
        return function(d) {
          return Math.abs(x(d) - x(0));
        };
      }

      function bulletTranslate(x) {
        return function(d) {
          return 'translate(' + x(d) + ',0)';
        };
      }
      */

      var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
          w1 = function(d) { return Math.abs(x1(d) - x1(0)) };


      var title = gEnter.select('.nv-titles').append('g')
          .attr('text-anchor', 'end')
          .attr('transform', 'translate(-6,' + (height - margin.top - margin.bottom) / 2 + ')');
      title.append('text')
          .attr('class', 'nv-title')
          .text(function(d) { return d.title; });

      title.append('text')
          .attr('class', 'nv-subtitle')
          .attr('dy', '1em')
          .text(function(d) { return d.subtitle; });



      bullet
        .width(availableWidth)
        .height(availableHeight)

      var bulletWrap = g.select('.nv-bulletWrap');

      d3.transition(bulletWrap).call(bullet);



      // Compute the tick format.
      var format = tickFormat || x1.tickFormat( availableWidth / 100 );

      // Update the tick groups.
      var tick = g.selectAll('g.nv-tick')
          .data(x1.ticks( availableWidth / 50 ), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append('g')
          .attr('class', 'nv-tick')
          .attr('transform', function(d) { return 'translate(' + x0(d) + ',0)' })
          .style('opacity', 1e-6);

      tickEnter.append('line')
          .attr('y1', availableHeight)
          .attr('y2', availableHeight * 7 / 6);

      tickEnter.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '1em')
          .attr('y', availableHeight * 7 / 6)
          .text(format);


      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = d3.transition(tick)
          .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
          .style('opacity', 1);

      tickUpdate.select('line')
          .attr('y1', availableHeight)
          .attr('y2', availableHeight * 7 / 6);

      tickUpdate.select('text')
          .attr('y', availableHeight * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      d3.transition(tick.exit())
          .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
          .style('opacity', 1e-6)
          .remove();


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      dispatch.on('tooltipShow', function(e) {
        e.key = d.title;
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================

    });

    d3.timer.flush();

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  bullet.dispatch.on('elementMouseover.tooltip', function(e) {
    dispatch.tooltipShow(e);
  });

  bullet.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.bullet = bullet;

  d3.rebind(chart, bullet, 'color');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  // left, right, top, bottom
  chart.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == 'right' || orient == 'bottom';
    return chart;
  };

  // ranges (bad, satisfactory, good)
  chart.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return chart;
  };

  // markers (previous, goal)
  chart.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return chart;
  };

  // measures (actual, forecast)
  chart.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return chart;
  };

  chart.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return chart;
  };

  chart.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
};



nv.models.cumulativeLineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 30, bottom: 50, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , tooltips = true
    , showControls = true
    , useInteractiveGuideline = false
    , rescaleY = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , id = lines.id()
    , state = { index: 0, rescaleY: rescaleY }
    , defaultState = null
    , noData = 'No Data Available.'
    , average = function(d) { return d.average }
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    , noErrorCheck = false  //if set to TRUE, will bypass an error check in the indexify function.
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================
  controls.updateState(false);

  //============================================================
  // Private Variables
  //------------------------------------------------------------

   var dx = d3.scale.linear()
     , index = {i: 0, x: 0}
     ;

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this).classed('nv-chart-' + id, true),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      var indexDrag = d3.behavior.drag()
                        .on('dragstart', dragStart)
                        .on('drag', dragMove)
                        .on('dragend', dragEnd);


      function dragStart(d,i) {
        d3.select(chart.container)
            .style('cursor', 'ew-resize');
      }

      function dragMove(d,i) {
        index.x = d3.event.x;
        index.i = Math.round(dx.invert(index.x));
        updateZero();
      }

      function dragEnd(d,i) {
        d3.select(chart.container)
            .style('cursor', 'auto');

        // update state and send stateChange with new index
        state.index = index.i;
        dispatch.stateChange(state);
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();


      if (!rescaleY) {
        var seriesDomains = data
          .filter(function(series) { return !series.disabled })
          .map(function(series,i) {
            var initialDomain = d3.extent(series.values, lines.y());

            //account for series being disabled when losing 95% or more
            if (initialDomain[0] < -.95) initialDomain[0] = -.95;

            return [
              (initialDomain[0] - initialDomain[1]) / (1 + initialDomain[1]),
              (initialDomain[1] - initialDomain[0]) / (1 + initialDomain[0])
            ];
          });

        var completeDomain = [
          d3.min(seriesDomains, function(d) { return d[0] }),
          d3.max(seriesDomains, function(d) { return d[1] })
        ]

        lines.yDomain(completeDomain);
      } else {
        lines.yDomain(null);
      }


      dx  .domain([0, data[0].values.length - 1]) //Assumes all series have same length
          .range([0, availableWidth])
          .clamp(true);

      //------------------------------------------------------------


      var data = indexify(index.i, data);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart
      var interactivePointerEvents = (useInteractiveGuideline) ? "none" : "all";
      var wrap = container.selectAll('g.nv-wrap.nv-cumulativeLine').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-cumulativeLine').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-interactive');
      gEnter.append('g').attr('class', 'nv-x nv-axis').style("pointer-events","none");
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-background');
      gEnter.append('g').attr('class', 'nv-linesWrap').style("pointer-events",interactivePointerEvents);
      gEnter.append('g').attr('class', 'nv-avgLinesWrap').style("pointer-events","none");
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Re-scale y-axis', disabled: !rescaleY }
        ];

        controls
            .width(140)
            .color(['#444', '#444', '#444'])
            .rightAlign(false)
            .margin({top: 5, right: 0, bottom: 5, left: 20})
            ;

        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      // Show error if series goes below 100%
      var tempDisabled = data.filter(function(d) { return d.tempDisabled });

      wrap.select('.tempDisabled').remove(); //clean-up and prevent duplicates
      if (tempDisabled.length) {
        wrap.append('text').attr('class', 'tempDisabled')
            .attr('x', availableWidth / 2)
            .attr('y', '-.71em')
            .style('text-anchor', 'end')
            .text(tempDisabled.map(function(d) { return d.key }).join(', ') + ' values cannot be calculated for this time period.');
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
          .width(availableWidth)
          .height(availableHeight)
          .margin({left:margin.left,top:margin.top})
          .svgContainer(container)
          .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }

      gEnter.select('.nv-background')
        .append('rect');

      g.select('.nv-background rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      lines
        //.x(function(d) { return d.x })
        .y(function(d) { return d.display.y })
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].tempDisabled; }));



      var linesWrap = g.select('.nv-linesWrap')
          .datum(data.filter(function(d) { return  !d.disabled && !d.tempDisabled }));

      //d3.transition(linesWrap).call(lines);
      linesWrap.call(lines);

      /*Handle average lines [AN-612] ----------------------------*/

      //Store a series index number in the data array.
      data.forEach(function(d,i) {
            d.seriesIndex = i;
      });

      var avgLineData = data.filter(function(d) {
          return !d.disabled && !!average(d);
      });

      var avgLines = g.select(".nv-avgLinesWrap").selectAll("line")
              .data(avgLineData, function(d) { return d.key; });

      var getAvgLineY = function(d) {
          //If average lines go off the svg element, clamp them to the svg bounds.
          var yVal = y(average(d));
          if (yVal < 0) return 0;
          if (yVal > availableHeight) return availableHeight;
          return yVal;
      };

      avgLines.enter()
              .append('line')
              .style('stroke-width',2)
              .style('stroke-dasharray','10,10')
              .style('stroke',function (d,i) {
                  return lines.color()(d,d.seriesIndex);
              })
              .attr('x1',0)
              .attr('x2',availableWidth)
              .attr('y1', getAvgLineY)
              .attr('y2', getAvgLineY);

      avgLines
              .style('stroke-opacity',function(d){
                  //If average lines go offscreen, make them transparent
                  var yVal = y(average(d));
                  if (yVal < 0 || yVal > availableHeight) return 0;
                  return 1;
              })
              .attr('x1',0)
              .attr('x2',availableWidth)
              .attr('y1', getAvgLineY)
              .attr('y2', getAvgLineY);

      avgLines.exit().remove();

      //Create index line -----------------------------------------

      var indexLine = linesWrap.selectAll('.nv-indexLine')
          .data([index]);
      indexLine.enter().append('rect').attr('class', 'nv-indexLine')
          .attr('width', 3)
          .attr('x', -2)
          .attr('fill', 'red')
          .attr('fill-opacity', .5)
          .style("pointer-events","all")
          .call(indexDrag)

      indexLine
          .attr('transform', function(d) { return 'translate(' + dx(d.i) + ',0)' })
          .attr('height', availableHeight)

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          //Suggest how many ticks based on the chart width and D3 should listen (70 is the optimal number for MM/DD/YY dates)
          .ticks( Math.min(data[0].values.length,availableWidth/70) )
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        d3.transition(g.select('.nv-x.nv-axis'))
            .call(xAxis);
      }


      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        d3.transition(g.select('.nv-y.nv-axis'))
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------


      function updateZero() {
        indexLine
          .data([index]);

        //When dragging the index line, turn off line transitions.
        // Then turn them back on when done dragging.
        var oldDuration = chart.transitionDuration();
        chart.transitionDuration(0);
        chart.update();
        chart.transitionDuration(oldDuration);
      }

      g.select('.nv-background rect')
          .on('click', function() {
            index.x = d3.mouse(this)[0];
            index.i = Math.round(dx.invert(index.x));

            // update state and send stateChange with new index
            state.index = index.i;
            dispatch.stateChange(state);

            updateZero();
          });

      lines.dispatch.on('elementClick', function(e) {
        index.i = e.pointIndex;
        index.x = dx(index.i);

        // update state and send stateChange with new index
        state.index = index.i;
        dispatch.stateChange(state);

        updateZero();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;
        rescaleY = !d.disabled;

        state.rescaleY = rescaleY;
        dispatch.stateChange(state);
        chart.update();
      });


      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          lines.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];


          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              lines.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
              allData.push({
                  key: series.key,
                  value: chart.y()(point, pointIndex),
                  color: color(series,series.seriesIndex)
              });
          });

          //Highlight the tooltip entry based on which point the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
            var threshold = 0.03 * domainExtent;
            var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value}),yValue,threshold);
            if (indexToHighlight !== null)
              allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex), pointIndex);
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(function(d,i) {
                     return yAxis.tickFormat()(d);
                  })
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          lines.clearHighlights();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }


        if (typeof e.index !== 'undefined') {
          index.i = e.index;
          index.x = dx(index.i);

          state.index = e.index;

          indexLine
            .data([index]);
        }


        if (typeof e.rescaleY !== 'undefined') {
          rescaleY = e.rescaleY;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.lines = lines;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'xScale','yScale', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi','useVoronoi',  'id');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.rescaleY = function(_) {
    if (!arguments.length) return rescaleY;
    rescaleY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.average = function(_) {
     if(!arguments.length) return average;
     average = _;
     return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  chart.noErrorCheck = function(_) {
    if (!arguments.length) return noErrorCheck;
    noErrorCheck = _;
    return chart;
  };

  //============================================================


  //============================================================
  // Functions
  //------------------------------------------------------------

  /* Normalize the data according to an index point. */
  function indexify(idx, data) {
    return data.map(function(line, i) {
      if (!line.values) {
         return line;
      }
      var v = lines.y()(line.values[idx], idx);

      //TODO: implement check below, and disable series if series loses 100% or more cause divide by 0 issue
      if (v < -.95 && !noErrorCheck) {
        //if a series loses more than 100%, calculations fail.. anything close can cause major distortion (but is mathematically correct till it hits 100)

        line.tempDisabled = true;
        return line;
      }

      line.tempDisabled = false;

      line.values = line.values.map(function(point, pointIndex) {
        point.display = {'y': (lines.y()(point, pointIndex) - v) / (1 + v) };
        return point;
      })

      return line;
    })
  }

  //============================================================


  return chart;
}
//TODO: consider deprecating by adding necessary features to multiBar model
nv.models.discreteBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , color = nv.utils.defaultColor()
    , showValues = false
    , valueFormat = d3.format(',.2f')
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    , rectClass = 'discreteBar'
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });


      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableWidth], .1);

      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y }).concat(forceY)));


      // If showValues, pad the Y axis range to account for label height
      if (showValues) y.range(yRange || [availableHeight - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] > 0 ? 12 : 0]);
      else y.range(yRange || [availableHeight, 0]);

      //store old scales if they exist
      x0 = x0 || x;
      y0 = y0 || y.copy().range([y(0),y(0)]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-discretebar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discretebar');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      //TODO: by definition, the discrete bar should not have multiple groups, will modify/remove later
      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
          .transition()
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover });
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('g.nv-bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('g')
          .attr('transform', function(d,i,j) {
              return 'translate(' + (x(getX(d,i)) + x.rangeBand() * .05 ) + ', ' + y(0) + ')'
          })
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });

      barsEnter.append('rect')
          .attr('height', 0)
          .attr('width', x.rangeBand() * .9 / data.length )

      if (showValues) {
        barsEnter.append('text')
          .attr('text-anchor', 'middle')
          ;

        bars.select('text')
          .text(function(d,i) { return valueFormat(getY(d,i)) })
          .transition()
          .attr('x', x.rangeBand() * .9 / 2)
          .attr('y', function(d,i) { return getY(d,i) < 0 ? y(getY(d,i)) - y(0) + 12 : -4 })

          ;
      } else {
        bars.selectAll('text').remove();
      }

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive' })
          .style('fill', function(d,i) { return d.color || color(d,i) })
          .style('stroke', function(d,i) { return d.color || color(d,i) })
        .select('rect')
          .attr('class', rectClass)
          .transition()
          .attr('width', x.rangeBand() * .9 / data.length);
      bars.transition()
        //.delay(function(d,i) { return i * 1200 / data[0].values.length })
          .attr('transform', function(d,i) {
            var left = x(getX(d,i)) + x.rangeBand() * .05,
                top = getY(d,i) < 0 ?
                        y(0) :
                        y(0) - y(getY(d,i)) < 1 ?
                          y(0) - 1 : //make 1 px positive bars show up above y=0
                          y(getY(d,i));

              return 'translate(' + left + ', ' + top + ')'
          })
        .select('rect')
          .attr('height', function(d,i) {
            return  Math.max(Math.abs(y(getY(d,i)) - y((yDomain && yDomain[0]) || 0)) || 1)
          });


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.showValues = function(_) {
    if (!arguments.length) return showValues;
    showValues = _;
    return chart;
  };

  chart.valueFormat= function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.rectClass= function(_) {
    if (!arguments.length) return rectClass;
    rectClass = _;
    return chart;
  };
  //============================================================


  return chart;
}

nv.models.discreteBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var discretebar = nv.models.discreteBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    ;

  var margin = {top: 15, right: 10, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.getColor()
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , staggerLabels = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + x + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , x
    , y
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'beforeUpdate')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .highlightZero(false)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickFormat(d3.format(',.1f'))
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(discretebar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(discretebar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { 
        dispatch.beforeUpdate(); 
        container.transition().duration(transitionDuration).call(chart); 
      };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = discretebar.xScale();
      y = discretebar.yScale().clamp(true);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-discreteBarWithAxes').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discreteBarWithAxes').append('g');
      var defsEnter = gEnter.append('defs');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis')
            .append('g').attr('class', 'nv-zeroLine')
            .append('line');
        
      gEnter.append('g').attr('class', 'nv-barsWrap');

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      discretebar
        .width(availableWidth)
        .height(availableHeight);


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(discretebar);

      //------------------------------------------------------------



      defsEnter.append('clipPath')
          .attr('id', 'nv-x-label-clip-' + discretebar.id())
        .append('rect');

      g.select('#nv-x-label-clip-' + discretebar.id() + ' rect')
          .attr('width', x.rangeBand() * (staggerLabels ? 2 : 1))
          .attr('height', 16)
          .attr('x', -x.rangeBand() / (staggerLabels ? 1 : 2 ));


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableWidth / 100 )
            .tickSize(-availableHeight, 0);

          g.select('.nv-x.nv-axis')
              .attr('transform', 'translate(0,' + (y.range()[0] + ((discretebar.showValues() && y.domain()[0] < 0) ? 16 : 0)) + ')');
          //d3.transition(g.select('.nv-x.nv-axis'))
          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);


          var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

          if (staggerLabels) {
            xTicks
                .selectAll('text')
                .attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 == 0 ? '5' : '17') + ')' })
          }
      }

      if (showYAxis) {
          yAxis
            .scale(y)
            .ticks( availableHeight / 36 )
            .tickSize( -availableWidth, 0);

          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }

      // Zero line
      g.select(".nv-zeroLine line")
        .attr("x1",0)
        .attr("x2",availableWidth)
        .attr("y1", y(0))
        .attr("y2", y(0))
        ;

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


    });

    return chart;
  }

  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  discretebar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  discretebar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.discretebar = discretebar;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, discretebar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'id', 'showValues', 'valueFormat');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    discretebar.color(color);
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.distribution = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 400 //technically width or height depending on x or y....
    , size = 8
    , axis = 'x' // 'x' or 'y'... horizontal or vertical
    , getData = function(d) { return d[axis] }  // defaults d.x or d.y
    , color = nv.utils.defaultColor()
    , scale = d3.scale.linear()
    , domain
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var scale0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableLength = width - (axis === 'x' ? margin.left + margin.right : margin.top + margin.bottom),
          naxis = axis == 'x' ? 'y' : 'x',
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      scale0 = scale0 || scale;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-distribution').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-distribution');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      //------------------------------------------------------------


      var distWrap = g.selectAll('g.nv-dist')
          .data(function(d) { return d }, function(d) { return d.key });

      distWrap.enter().append('g');
      distWrap
          .attr('class', function(d,i) { return 'nv-dist nv-series-' + i })
          .style('stroke', function(d,i) { return color(d, i) });

      var dist = distWrap.selectAll('line.nv-dist' + axis)
          .data(function(d) { return d.values })
      dist.enter().append('line')
          .attr(axis + '1', function(d,i) { return scale0(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale0(getData(d,i)) })
      distWrap.exit().selectAll('line.nv-dist' + axis)
          .transition()
          .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })
          .style('stroke-opacity', 0)
          .remove();
      dist
          .attr('class', function(d,i) { return 'nv-dist' + axis + ' nv-dist' + axis + '-' + i })
          .attr(naxis + '1', 0)
          .attr(naxis + '2', size);
      dist
          .transition()
          .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })


      scale0 = scale.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.axis = function(_) {
    if (!arguments.length) return axis;
    axis = _;
    return chart;
  };

  chart.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return chart;
  };

  chart.getData = function(_) {
    if (!arguments.length) return getData;
    getData = d3.functor(_);
    return chart;
  };

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };
  //============================================================


  return chart;
}

nv.models.historicalBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var bars = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    ;


  var margin = {top: 30, right: 90, bottom: 50, left: 90}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = false
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x
    , y
    , state = {}
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient( (rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {

    // New addition to calculate position if SVG is scaled with viewBox, may move TODO: consider implementing everywhere else
    if (offsetElement) {
      var svg = d3.select(offsetElement).select('svg');
      var viewBox = (svg.node()) ? svg.attr('viewBox') : null;
      if (viewBox) {
        viewBox = viewBox.split(' ');
        var ratio = parseInt(svg.style('width')) / viewBox[2];
        e.pos[0] = e.pos[0] * ratio;
        e.pos[1] = e.pos[1] * ratio;
      }
    }

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(bars.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(bars.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = bars.xScale();
      y = bars.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-historicalBarChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBarChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
        g.select(".nv-y.nv-axis")
            .attr("transform", "translate(" + availableWidth + ",0)");
      }


      //------------------------------------------------------------
      // Main Chart Component(s)

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }));


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(bars);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        g.select('.nv-x.nv-axis')
            .transition()
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
          .transition()
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.map(function(d) {
            d.disabled = false;
            wrap.selectAll('.nv-series').classed('disabled', false);
            return d;
          });
        }

        state.disabled = data.map(function(d) { return !!d.disabled });
        dispatch.stateChange(state);

        selection.transition().call(chart);
      });

      legend.dispatch.on('legendDblclick', function(d) {
          //Double clicking should always enable current series, and disabled all others.
          data.forEach(function(d) {
             d.disabled = true;
          });
          d.disabled = false;

          state.disabled = data.map(function(d) { return !!d.disabled });
          dispatch.stateChange(state);
          chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.bars = bars;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, bars, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale',
    'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id', 'interpolate','highlightPoint','clearHighlights', 'interactive');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.indentedTree = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0} //TODO: implement, maybe as margin on the containing div
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor()
    , id = Math.floor(Math.random() * 10000)
    , header = true
    , filterZero = false
    , noData = "No Data Available."
    , childIndent = 20
    , columns = [{key:'key', label: 'Name', type:'text'}] //TODO: consider functions like chart.addColumn, chart.removeColumn, instead of a block like this
    , tableClass = null
    , iconOpen = 'images/grey-plus.png' //TODO: consider removing this and replacing with a '+' or '-' unless user defines images
    , iconClose = 'images/grey-minus.png'
    , dispatch = d3.dispatch('elementClick', 'elementDblclick', 'elementMouseover', 'elementMouseout')
    , getUrl = function(d) { return d.url }
    ;

  //============================================================

  var idx = 0;

  function chart(selection) {
    selection.each(function(data) {
      var depth = 1,
          container = d3.select(this);

      var tree = d3.layout.tree()
          .children(function(d) { return d.values })
          .size([height, childIndent]); //Not sure if this is needed now that the result is HTML

      chart.update = function() { container.transition().duration(600).call(chart) };


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.
      if (!data[0]) data[0] = {key: noData};

      //------------------------------------------------------------


      var nodes = tree.nodes(data[0]);

      // nodes.map(function(d) {
      //   d.id = i++;
      // })

      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('div').data([[nodes]]);
      var wrapEnter = wrap.enter().append('div').attr('class', 'nvd3 nv-wrap nv-indentedtree');
      var tableEnter = wrapEnter.append('table');
      var table = wrap.select('table').attr('width', '100%').attr('class', tableClass);

      //------------------------------------------------------------


      if (header) {
        var thead = tableEnter.append('thead');

        var theadRow1 = thead.append('tr');

        columns.forEach(function(column) {
          theadRow1
            .append('th')
              .attr('width', column.width ? column.width : '10%')
              .style('text-align', column.type == 'numeric' ? 'right' : 'left')
            .append('span')
              .text(column.label);
        });
      }


      var tbody = table.selectAll('tbody')
                    .data(function(d) { return d });
      tbody.enter().append('tbody');



      //compute max generations
      depth = d3.max(nodes, function(node) { return node.depth });
      tree.size([height, depth * childIndent]); //TODO: see if this is necessary at all


      // Update the nodes…
      var node = tbody.selectAll('tr')
          // .data(function(d) { return d; }, function(d) { return d.id || (d.id == ++i)});
          .data(function(d) { return d.filter(function(d) { return (filterZero && !d.children) ? filterZero(d) :  true; } )}, function(d,i) { return d.id || (d.id || ++idx)});
          //.style('display', 'table-row'); //TODO: see if this does anything

      node.exit().remove();

      node.select('img.nv-treeicon')
          .attr('src', icon)
          .classed('folded', folded);

      var nodeEnter = node.enter().append('tr');


      columns.forEach(function(column, index) {

        var nodeName = nodeEnter.append('td')
            .style('padding-left', function(d) { return (index ? 0 : d.depth * childIndent + 12 + (icon(d) ? 0 : 16)) + 'px' }, 'important') //TODO: check why I did the ternary here
            .style('text-align', column.type == 'numeric' ? 'right' : 'left');


        if (index == 0) {
          nodeName.append('img')
              .classed('nv-treeicon', true)
              .classed('nv-folded', folded)
              .attr('src', icon)
              .style('width', '14px')
              .style('height', '14px')
              .style('padding', '0 1px')
              .style('display', function(d) { return icon(d) ? 'inline-block' : 'none'; })
              .on('click', click);
        }


        nodeName.each(function(d) {
          if (!index && getUrl(d))
            d3.select(this)
              .append('a')
              .attr('href',getUrl)
              .attr('class', d3.functor(column.classes))
              .append('span')
          else
            d3.select(this)
              .append('span')

            d3.select(this).select('span')
              .attr('class', d3.functor(column.classes) )
              .text(function(d) { return column.format ? column.format(d) :
                                        (d[column.key] || '-') });
          });

        if  (column.showCount) {
          nodeName.append('span')
              .attr('class', 'nv-childrenCount');

          node.selectAll('span.nv-childrenCount').text(function(d) {
                return ((d.values && d.values.length) || (d._values && d._values.length)) ?                                   //If this is a parent
                    '(' + ((d.values && (d.values.filter(function(d) { return filterZero ? filterZero(d) :  true; }).length)) //If children are in values check its children and filter
                    || (d._values && d._values.filter(function(d) { return filterZero ? filterZero(d) :  true; }).length)     //Otherwise, do the same, but with the other name, _values...
                    || 0) + ')'                                                                                               //This is the catch-all in case there are no children after a filter
                    : ''                                                                                                     //If this is not a parent, just give an empty string
            });
        }

        // if (column.click)
        //   nodeName.select('span').on('click', column.click);

      });

      node
        .order()
        .on('click', function(d) { 
          dispatch.elementClick({
            row: this, //TODO: decide whether or not this should be consistent with scatter/line events or should be an html link (a href)
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('dblclick', function(d) { 
          dispatch.elementDblclick({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('mouseover', function(d) { 
          dispatch.elementMouseover({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('mouseout', function(d) { 
          dispatch.elementMouseout({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        });




      // Toggle children on click.
      function click(d, _, unshift) {
        d3.event.stopPropagation();

        if(d3.event.shiftKey && !unshift) {
          //If you shift-click, it'll toggle fold all the children, instead of itself
          d3.event.shiftKey = false;
          d.values && d.values.forEach(function(node){
            if (node.values || node._values) {
              click(node, 0, true);
            }
          });
          return true;
        }
        if(!hasChildren(d)) {
          //download file
          //window.location.href = d.url;
          return true;
        }
        if (d.values) {
          d._values = d.values;
          d.values = null;
        } else {
          d.values = d._values;
          d._values = null;
        }
        chart.update();
      }


      function icon(d) {
        return (d._values && d._values.length) ? iconOpen : (d.values && d.values.length) ? iconClose : '';
      }

      function folded(d) {
        return (d._values && d._values.length);
      }

      function hasChildren(d) {
        var values = d.values || d._values;

        return (values && values.length);
      }


    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    scatter.color(color);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.header = function(_) {
    if (!arguments.length) return header;
    header = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.filterZero = function(_) {
    if (!arguments.length) return filterZero;
    filterZero = _;
    return chart;
  };

  chart.columns = function(_) {
    if (!arguments.length) return columns;
    columns = _;
    return chart;
  };

  chart.tableClass = function(_) {
    if (!arguments.length) return tableClass;
    tableClass = _;
    return chart;
  };

  chart.iconOpen = function(_){
     if (!arguments.length) return iconOpen;
    iconOpen = _;
    return chart;
  }

  chart.iconClose = function(_){
     if (!arguments.length) return iconClose;
    iconClose = _;
    return chart;
  }

  chart.getUrl = function(_){
     if (!arguments.length) return getUrl;
    getUrl = _;
    return chart;
  }

  //============================================================


  return chart;
};

nv.models.legend = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 5, right: 0, bottom: 5, left: 0}
    , width = 400
    , height = 20
    , getKey = function(d) { return d.key }
    , color = nv.utils.defaultColor()
    , align = true
    , rightAlign = true
    , updateState = true   //If true, legend will update data.disabled and trigger a 'stateChange' dispatch.
    , radioButtonMode = false   //If true, clicking legend items will cause it to behave like a radio button. (only one can be selected at a time)
    , dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout', 'stateChange')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-legend').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-legend').append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      var series = g.selectAll('.nv-series')
          .data(function(d) { return d });
      var seriesEnter = series.enter().append('g').attr('class', 'nv-series')
          .on('mouseover', function(d,i) {
            dispatch.legendMouseover(d,i);  //TODO: Make consistent with other event objects
          })
          .on('mouseout', function(d,i) {
            dispatch.legendMouseout(d,i);
          })
          .on('click', function(d,i) {
            dispatch.legendClick(d,i);
            if (updateState) {
               if (radioButtonMode) {
                   //Radio button mode: set every series to disabled,
                   //  and enable the clicked series.
                   data.forEach(function(series) { series.disabled = true});
                   d.disabled = false;
               }
               else {
                   d.disabled = !d.disabled;
                   if (data.every(function(series) { return series.disabled})) {
                       //the default behavior of NVD3 legends is, if every single series
                       // is disabled, turn all series' back on.
                       data.forEach(function(series) { series.disabled = false});
                   }
               }
               dispatch.stateChange({
                  disabled: data.map(function(d) { return !!d.disabled })
               });
            }
          })
          .on('dblclick', function(d,i) {
            dispatch.legendDblclick(d,i);
            if (updateState) {
                //the default behavior of NVD3 legends, when double clicking one,
                // is to set all other series' to false, and make the double clicked series enabled.
                data.forEach(function(series) {
                   series.disabled = true;
                });
                d.disabled = false;
                dispatch.stateChange({
                    disabled: data.map(function(d) { return !!d.disabled })
                });
            }
          });
      seriesEnter.append('circle')
          .style('stroke-width', 2)
          .attr('class','nv-legend-symbol')
          .attr('r', 5);
      seriesEnter.append('text')
          .attr('text-anchor', 'start')
          .attr('class','nv-legend-text')
          .attr('dy', '.32em')
          .attr('dx', '8');
      series.classed('disabled', function(d) { return d.disabled });
      series.exit().remove();
      series.select('circle')
          .style('fill', function(d,i) { return d.color || color(d,i)})
          .style('stroke', function(d,i) { return d.color || color(d, i) });
      series.select('text').text(getKey);


      //TODO: implement fixed-width and max-width options (max-width is especially useful with the align option)

      // NEW ALIGNING CODE, TODO: clean up
      if (align) {

        var seriesWidths = [];
        series.each(function(d,i) {
              var legendText = d3.select(this).select('text');
              var nodeTextLength;
              try {
                nodeTextLength = legendText.getComputedTextLength();
                // If the legendText is display:none'd (nodeTextLength == 0), simulate an error so we approximate, instead
                if(nodeTextLength <= 0) throw Error();
              }
              catch(e) {
                nodeTextLength = nv.utils.calcApproxTextWidth(legendText);
              }

              seriesWidths.push(nodeTextLength + 28); // 28 is ~ the width of the circle plus some padding
            });

        var seriesPerRow = 0;
        var legendWidth = 0;
        var columnWidths = [];

        while ( legendWidth < availableWidth && seriesPerRow < seriesWidths.length) {
          columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
          legendWidth += seriesWidths[seriesPerRow++];
        }
        if (seriesPerRow === 0) seriesPerRow = 1; //minimum of one series per row


        while ( legendWidth > availableWidth && seriesPerRow > 1 ) {
          columnWidths = [];
          seriesPerRow--;

          for (var k = 0; k < seriesWidths.length; k++) {
            if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
              columnWidths[k % seriesPerRow] = seriesWidths[k];
          }

          legendWidth = columnWidths.reduce(function(prev, cur, index, array) {
                          return prev + cur;
                        });
        }

        var xPositions = [];
        for (var i = 0, curX = 0; i < seriesPerRow; i++) {
            xPositions[i] = curX;
            curX += columnWidths[i];
        }

        series
            .attr('transform', function(d, i) {
              return 'translate(' + xPositions[i % seriesPerRow] + ',' + (5 + Math.floor(i / seriesPerRow) * 20) + ')';
            });

        //position legend as far right as possible within the total width
        if (rightAlign) {
           g.attr('transform', 'translate(' + (width - margin.right - legendWidth) + ',' + margin.top + ')');
        }
        else {
           g.attr('transform', 'translate(0' + ',' + margin.top + ')');
        }

        height = margin.top + margin.bottom + (Math.ceil(seriesWidths.length / seriesPerRow) * 20);

      } else {

        var ypos = 5,
            newxpos = 5,
            maxwidth = 0,
            xpos;
        series
            .attr('transform', function(d, i) {
              var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
              xpos = newxpos;

              if (width < margin.left + margin.right + xpos + length) {
                newxpos = xpos = 5;
                ypos += 20;
              }

              newxpos += length;
              if (newxpos > maxwidth) maxwidth = newxpos;

              return 'translate(' + xpos + ',' + ypos + ')';
            });

        //position legend as far right as possible within the total width
        g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

        height = margin.top + margin.bottom + ypos + 15;

      }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.key = function(_) {
    if (!arguments.length) return getKey;
    getKey = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.align = function(_) {
    if (!arguments.length) return align;
    align = _;
    return chart;
  };

  chart.rightAlign = function(_) {
    if (!arguments.length) return rightAlign;
    rightAlign = _;
    return chart;
  };

  chart.updateState = function(_) {
    if (!arguments.length) return updateState;
    updateState = _;
    return chart;
  };

  chart.radioButtonMode = function(_) {
    if (!arguments.length) return radioButtonMode;
    radioButtonMode = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.line = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var  scatter = nv.models.scatter()
    ;

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor() // a function that returns a color
    , getX = function(d) { return d.x } // accessor to get the x value from a data point
    , getY = function(d) { return d.y } // accessor to get the y value from a data point
    , defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null } // allows a line to be not continuous when it is not defined
    , isArea = function(d) { return d.area } // decides if a line is an area or just a line
    , clipEdge = false // if true, masks lines within x and y scale
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , interpolate = "linear" // controls the line interpolation
    ;

  scatter
    .size(16) // default size
    .sizeDomain([16,256]) //set to speed up calculation, needs to be unset if there is a custom size accessor
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-line').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-line');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'nv-groups');
      gEnter.append('g').attr('class', 'nv-scatterWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------




      scatter
        .width(availableWidth)
        .height(availableHeight)

      var scatterWrap = wrap.select('.nv-scatterWrap');
          //.datum(data); // Data automatically trickles down from the wrap

      scatterWrap.transition().call(scatter);



      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + scatter.id())
        .append('rect');

      wrap.select('#nv-edge-clip-' + scatter.id() + ' rect')
          .attr('width', availableWidth)
          .attr('height', (availableHeight > 0) ? availableHeight : 0);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');
      scatterWrap
          .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');




      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);

      groups.exit().remove();

      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i)});
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);



      var areaPaths = groups.selectAll('path.nv-area')
          .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
      areaPaths.enter().append('path')
          .attr('class', 'nv-area')
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
                .y0(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
                .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      groups.exit().selectAll('path.nv-area')
           .remove();

      areaPaths
          .transition()
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
                .y0(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
                .y1(function(d,i) { return y( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });



      var linePaths = groups.selectAll('path.nv-line')
          .data(function(d) { return [d.values] });
      linePaths.enter().append('path')
          .attr('class', 'nv-line')
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
              .y(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
          );

      linePaths
          .transition()
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
              .y(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
          );



      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = scatter.dispatch;
  chart.scatter = scatter;

  d3.rebind(chart, scatter, 'id', 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange',
    'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'useVoronoi', 'clipRadius', 'padData','highlightPoint','clearHighlights');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    scatter.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    scatter.y(_);
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    scatter.color(color);
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return chart;
  };

  chart.defined = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return chart;
  };

  chart.isArea = function(_) {
    if (!arguments.length) return isArea;
    isArea = d3.functor(_);
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.lineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , useInteractiveGuideline = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x
    , y
    , state = {}
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = d3.event.pageX || ( e.pos[0] + (offsetElement.offsetLeft || 0) ) + margin.left,
    top = d3.event.pageY || ( e.pos[1] + ( offsetElement.offsetTop || 0) ) + margin.top,
    x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
    y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
    content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null , null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });


      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-lineChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineChart').append('g');
      var g = wrap.select('g');

      gEnter.append("rect").style("opacity",0);
      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-linesWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-interactive');

      g.select("rect")
        .attr("width",availableWidth)
        .attr("height",(availableHeight > 0) ? availableHeight : 0);
      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)


      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
           .width(availableWidth)
           .height(availableHeight)
           .margin({left:margin.left, top:margin.top})
           .svgContainer(container)
           .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }


      lines
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }));


      var linesWrap = g.select('.nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      linesWrap.transition().call(lines);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .ticks( availableWidth / 100 )
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        g.select('.nv-x.nv-axis')
            .transition()
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .transition()
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
          state = newState;
          dispatch.stateChange(state);
          chart.update();
      });

      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          lines.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];
          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              lines.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
              allData.push({
                  key: series.key,
                  value: chart.y()(point, pointIndex),
                  color: color(series,series.seriesIndex)
              });
          });
          //Highlight the tooltip entry based on which point the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
            var threshold = 0.03 * domainExtent;
            var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value}),yValue,threshold);
            if (indexToHighlight !== null)
              allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex));
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(function(d,i) {
                     return yAxis.tickFormat()(d);
                  })
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          lines.clearHighlights();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.lines = lines;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'xRange', 'yRange'
    , 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'useVoronoi','id', 'interpolate');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.linePlusBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , bars = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , y1Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , legend = nv.models.legend()
    ;

  var margin = {top: 30, right: 60, bottom: 50, left: 60}
    , width = null
    , height = null
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.defaultColor()
    , showLegend = true
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>';
      }
    , x
    , y1
    , y2
    , state = {}
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    ;

  bars
    .padData(true)
    ;
  lines
    .clipEdge(false)
    .padData(true)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(7)
    .highlightZero(false)
    ;
  y1Axis
    .orient('left')
    ;
  y2Axis
    .orient('right')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
          top = e.pos[1] + ( offsetElement.offsetTop || 0),
          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
          y = (e.series.bar ? y1Axis : y2Axis).tickFormat()(lines.y()(e.point, e.pointIndex)),
          content = tooltip(e.series.key, x, y, e, chart);

      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
    }
    ;

  //------------------------------------------------------------



  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().call(chart); };
      // chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });
      var dataLines = data.filter(function(d) { return !d.bar }); // removed the !d.disabled clause here to fix Issue #240

      //x = xAxis.scale();
       x = dataLines.filter(function(d) { return !d.disabled; }).length && dataLines.filter(function(d) { return !d.disabled; })[0].values.length ? lines.xScale() : bars.xScale();
      //x = dataLines.filter(function(d) { return !d.disabled; }).length ? lines.xScale() : bars.xScale(); //old code before change above
      y1 = bars.yScale();
      y2 = lines.yScale();

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y1 nv-axis');
      gEnter.append('g').attr('class', 'nv-y2 nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-linesWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.nv-legendWrap')
            .datum(data.map(function(series) {
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)


      lines
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }))



      var barsWrap = g.select('.nv-barsWrap')
          .datum(dataBars.length ? dataBars : [{values:[]}])

      var linesWrap = g.select('.nv-linesWrap')
          .datum(dataLines[0] && !dataLines[0].disabled ? dataLines : [{values:[]}] );
          //.datum(!dataLines[0].disabled ? dataLines : [{values:dataLines[0].values.map(function(d) { return [d[0], null] }) }] );

      d3.transition(barsWrap).call(bars);
      d3.transition(linesWrap).call(lines);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y1.range()[0] + ')');
      d3.transition(g.select('.nv-x.nv-axis'))
          .call(xAxis);


      y1Axis
        .scale(y1)
        .ticks( availableHeight / 36 )
        .tickSize(-availableWidth, 0);

      d3.transition(g.select('.nv-y1.nv-axis'))
          .style('opacity', dataBars.length ? 1 : 0)
          .call(y1Axis);


      y2Axis
        .scale(y2)
        .ticks( availableHeight / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + availableWidth + ',0)');
          //.attr('transform', 'translate(' + x.range()[1] + ',0)');

      d3.transition(g.select('.nv-y2.nv-axis'))
          .call(y2Axis);

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.bars = bars;
  chart.xAxis = xAxis;
  chart.y1Axis = y1Axis;
  chart.y2Axis = y2Axis;

  d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.lineWithFocusChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , lines2 = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , x2Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , legend = nv.models.legend()
    , brush = d3.svg.brush()
    ;

  var margin = {top: 30, right: 30, bottom: 30, left: 60}
    , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , height2 = 100
    , x
    , y
    , x2
    , y2
    , showLegend = true
    , brushExtent = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>';
      }
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'brush')
    , transitionDuration = 250
    ;
    
  lines
    .clipEdge(true)
    ;
  lines2
    .interactive(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(5)
    ;
  yAxis
    .orient('left')
    ;
  x2Axis
    .orient('bottom')
    .tickPadding(5)
    ;
  y2Axis
    .orient('left')
    ;
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

var showTooltip = function(e, offsetElement) {
    var left = d3.event.pageX || ( e.pos[0] + (offsetElement.offsetLeft || 0) ) + margin.left,
    top = d3.event.pageY || ( e.pos[1] + ( offsetElement.offsetTop || 0) ) + margin.top,
    x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
    y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
    content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null , null, offsetElement);

    /*var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);*/
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2,
          availableHeight2 = height2 - margin2.top - margin2.bottom;

          //console.log('height2 ' + height2 + 'margintop ' + margin2.top + 'marginbottom ' + margin2.bottom + 'availableHeight2 ' + availableHeight2);

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight1 / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();
      x2 = lines2.xScale();
      y2 = lines2.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-lineWithFocusChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineWithFocusChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-legendWrap');

      var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
      focusEnter.append('g').attr('class', 'nv-x nv-axis');
      focusEnter.append('g').attr('class', 'nv-y nv-axis');
      focusEnter.append('g').attr('class', 'nv-linesWrap');

      var contextEnter = gEnter.append('g').attr('class', 'nv-context');
      contextEnter.append('g').attr('class', 'nv-x nv-axis');
      contextEnter.append('g').attr('class', 'nv-y nv-axis');
      contextEnter.append('g').attr('class', 'nv-linesWrap');
      contextEnter.append('g').attr('class', 'nv-brushBackground');
      contextEnter.append('g').attr('class', 'nv-x nv-brush');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      lines
        .width(availableWidth)
        .height(availableHeight1)
        .color(
          data
            .map(function(d,i) {
              return d.color || color(d, i);
            })
            .filter(function(d,i) {
              return !data[i].disabled;
          })
        );

      lines2
        .defined(lines.defined())
        .width(availableWidth)
        .height(availableHeight2)
        .color(
          data
            .map(function(d,i) {
              return d.color || color(d, i);
            })
            .filter(function(d,i) {
              return !data[i].disabled;
          })
        );

      g.select('.nv-context')
          .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')')

      var contextLinesWrap = g.select('.nv-context .nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      d3.transition(contextLinesWrap).call(lines2);

      //------------------------------------------------------------


      /*
      var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      d3.transition(focusLinesWrap).call(lines);
     */


      //------------------------------------------------------------
      // Setup Main (Focus) Axes

      xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight1, 0);

      yAxis
        .scale(y)
        .ticks( availableHeight1 / 36 )
        .tickSize( -availableWidth, 0);

      g.select('.nv-focus .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + availableHeight1 + ')');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Brush

      brush
        .x(x2)
        .on('brush', function() {
            //When brushing, turn off transitions because chart needs to change immediately.
            var oldTransition = chart.transitionDuration();
            chart.transitionDuration(0); 
            onBrush();
            chart.transitionDuration(oldTransition);
        });

      if (brushExtent) brush.extent(brushExtent);

      var brushBG = g.select('.nv-brushBackground').selectAll('g')
          .data([brushExtent || brush.extent()])

      var brushBGenter = brushBG.enter()
          .append('g');

      brushBGenter.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      brushBGenter.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      var gBrush = g.select('.nv-x.nv-brush')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight2);
      gBrush.selectAll('.resize').append('path').attr('d', resizePath);

      onBrush();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Secondary (Context) Axes

      x2Axis
        .scale(x2)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y2.range()[0] + ')');
      d3.transition(g.select('.nv-context .nv-x.nv-axis'))
          .call(x2Axis);


      y2Axis
        .scale(y2)
        .ticks( availableHeight2 / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.nv-context .nv-y.nv-axis'))
          .call(y2Axis);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y2.range()[0] + ')');

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


      //============================================================
      // Functions
      //------------------------------------------------------------

      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == 'e'),
            x = e ? 1 : -1,
            y = availableHeight2 / 3;
        return 'M' + (.5 * x) + ',' + y
            + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
            + 'V' + (2 * y - 6)
            + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
            + 'Z'
            + 'M' + (2.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8)
            + 'M' + (4.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8);
      }


      function updateBrushBG() {
        if (!brush.empty()) brush.extent(brushExtent);
        brushBG
            .data([brush.empty() ? x2.domain() : brushExtent])
            .each(function(d,i) {
              var leftWidth = x2(d[0]) - x.range()[0],
                  rightWidth = x.range()[1] - x2(d[1]);
              d3.select(this).select('.left')
                .attr('width',  leftWidth < 0 ? 0 : leftWidth);

              d3.select(this).select('.right')
                .attr('x', x2(d[1]))
                .attr('width', rightWidth < 0 ? 0 : rightWidth);
            });
      }


      function onBrush() {
        brushExtent = brush.empty() ? null : brush.extent();
        var extent = brush.empty() ? x2.domain() : brush.extent();

        //The brush extent cannot be less than one.  If it is, don't update the line chart.
        if (Math.abs(extent[0] - extent[1]) <= 1) {
          return;
        }

        dispatch.brush({extent: extent, brush: brush});


        updateBrushBG();

        // Update Main (Focus)
        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
            .datum(
              data
                .filter(function(d) { return !d.disabled })
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                    })
                  }
                })
            );
        focusLinesWrap.transition().duration(transitionDuration).call(lines);


        // Update Main (Focus) Axes
        g.select('.nv-focus .nv-x.nv-axis').transition().duration(transitionDuration)
            .call(xAxis);
        g.select('.nv-focus .nv-y.nv-axis').transition().duration(transitionDuration)
            .call(yAxis);
      }

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.lines2 = lines2;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.x2Axis = x2Axis;
  chart.y2Axis = y2Axis;

  d3.rebind(chart, lines, 'defined', 'isArea', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return lines.x;
    lines.x(_);
    lines2.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return lines.y;
    lines.y(_);
    lines2.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.margin2 = function(_) {
    if (!arguments.length) return margin2;
    margin2.top    = typeof _.top    != 'undefined' ? _.top    : margin2.top;
    margin2.right  = typeof _.right  != 'undefined' ? _.right  : margin2.right;
    margin2.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin2.bottom;
    margin2.left   = typeof _.left   != 'undefined' ? _.left   : margin2.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.height2 = function(_) {
    if (!arguments.length) return height2;
    height2 = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color =nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) return lines.interpolate();
    lines.interpolate(_);
    lines2.interpolate(_);
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  // Chart has multiple similar Axes, to prevent code duplication, probably need to link all axis functions manually like below
  chart.xTickFormat = function(_) {
    if (!arguments.length) return xAxis.tickFormat();
    xAxis.tickFormat(_);
    x2Axis.tickFormat(_);
    return chart;
  };

  chart.yTickFormat = function(_) {
    if (!arguments.length) return yAxis.tickFormat();
    yAxis.tickFormat(_);
    y2Axis.tickFormat(_);
    return chart;
  };
  
  chart.brushExtent = function(_) {
    if (!arguments.length) return brushExtent;
    brushExtent = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.linePlusBarWithFocusChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , lines2 = nv.models.line()
    , bars = nv.models.historicalBar()
    , bars2 = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , x2Axis = nv.models.axis()
    , y1Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , y3Axis = nv.models.axis()
    , y4Axis = nv.models.axis()
    , legend = nv.models.legend()
    , brush = d3.svg.brush()
    ;

  var margin = {top: 30, right: 30, bottom: 30, left: 60}
    , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
    , width = null
    , height = null
    , height2 = 100
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.defaultColor()
    , showLegend = true
    , extent
    , brushExtent = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>';
      }
    , x
    , x2
    , y1
    , y2
    , y3
    , y4
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'brush')
    , transitionDuration = 0
    ;

  lines
    .clipEdge(true)
    ;
  lines2
    .interactive(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(5)
    ;
  y1Axis
    .orient('left')
    ;
  y2Axis
    .orient('right')
    ;
  x2Axis
    .orient('bottom')
    .tickPadding(5)
    ;
  y3Axis
    .orient('left')
    ;
  y4Axis
    .orient('right')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    if (extent) {
        e.pointIndex += Math.ceil(extent[0]);
    }
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = (e.series.bar ? y1Axis : y2Axis).tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //------------------------------------------------------------



  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2,
          availableHeight2 = height2 - margin2.top - margin2.bottom;



      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight1 / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });
      var dataLines = data.filter(function(d) { return !d.bar }); // removed the !d.disabled clause here to fix Issue #240

      x = bars.xScale();
      x2 = x2Axis.scale();
      y1 = bars.yScale();
      y2 = lines.yScale();
      y3 = bars2.yScale();
      y4 = lines2.yScale();

      var series1 = data
        .filter(function(d) { return !d.disabled && d.bar })
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

      var series2 = data
        .filter(function(d) { return !d.disabled && !d.bar })
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

      x   .range([0, availableWidth]);
      
      x2  .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
          .range([0, availableWidth]);


      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-legendWrap');
      
      var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
      focusEnter.append('g').attr('class', 'nv-x nv-axis');
      focusEnter.append('g').attr('class', 'nv-y1 nv-axis');
      focusEnter.append('g').attr('class', 'nv-y2 nv-axis');
      focusEnter.append('g').attr('class', 'nv-barsWrap');
      focusEnter.append('g').attr('class', 'nv-linesWrap');

      var contextEnter = gEnter.append('g').attr('class', 'nv-context');
      contextEnter.append('g').attr('class', 'nv-x nv-axis');
      contextEnter.append('g').attr('class', 'nv-y1 nv-axis');
      contextEnter.append('g').attr('class', 'nv-y2 nv-axis');
      contextEnter.append('g').attr('class', 'nv-barsWrap');
      contextEnter.append('g').attr('class', 'nv-linesWrap');
      contextEnter.append('g').attr('class', 'nv-brushBackground');
      contextEnter.append('g').attr('class', 'nv-x nv-brush');


      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.nv-legendWrap')
            .datum(data.map(function(series) {
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Context Components

      bars2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }));

      lines2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }));
        
      var bars2Wrap = g.select('.nv-context .nv-barsWrap')
          .datum(dataBars.length ? dataBars : [{values:[]}]);

      var lines2Wrap = g.select('.nv-context .nv-linesWrap')
          .datum(!dataLines[0].disabled ? dataLines : [{values:[]}]);
          
      g.select('.nv-context')
          .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')')

      bars2Wrap.transition().call(bars2);
      lines2Wrap.transition().call(lines2);

      //------------------------------------------------------------



      //------------------------------------------------------------
      // Setup Brush

      brush
        .x(x2)
        .on('brush', onBrush);

      if (brushExtent) brush.extent(brushExtent);

      var brushBG = g.select('.nv-brushBackground').selectAll('g')
          .data([brushExtent || brush.extent()])

      var brushBGenter = brushBG.enter()
          .append('g');

      brushBGenter.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      brushBGenter.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      var gBrush = g.select('.nv-x.nv-brush')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight2);
      gBrush.selectAll('.resize').append('path').attr('d', resizePath);

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup Secondary (Context) Axes

      x2Axis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y3.range()[0] + ')');
      g.select('.nv-context .nv-x.nv-axis').transition()
          .call(x2Axis);


      y3Axis
        .scale(y3)
        .ticks( availableHeight2 / 36 )
        .tickSize( -availableWidth, 0);

      g.select('.nv-context .nv-y1.nv-axis')
          .style('opacity', dataBars.length ? 1 : 0)
          .attr('transform', 'translate(0,' + x2.range()[0] + ')');
          
      g.select('.nv-context .nv-y1.nv-axis').transition()
          .call(y3Axis);
          

      y4Axis
        .scale(y4)
        .ticks( availableHeight2 / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.nv-context .nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + x2.range()[1] + ',0)');

      g.select('.nv-context .nv-y2.nv-axis').transition()
          .call(y4Axis);
          
      //------------------------------------------------------------

      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


      //============================================================
      // Functions
      //------------------------------------------------------------

      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == 'e'),
            x = e ? 1 : -1,
            y = availableHeight2 / 3;
        return 'M' + (.5 * x) + ',' + y
            + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
            + 'V' + (2 * y - 6)
            + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
            + 'Z'
            + 'M' + (2.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8)
            + 'M' + (4.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8);
      }


      function updateBrushBG() {
        if (!brush.empty()) brush.extent(brushExtent);
        brushBG
            .data([brush.empty() ? x2.domain() : brushExtent])
            .each(function(d,i) {
              var leftWidth = x2(d[0]) - x2.range()[0],
                  rightWidth = x2.range()[1] - x2(d[1]);
              d3.select(this).select('.left')
                .attr('width',  leftWidth < 0 ? 0 : leftWidth);

              d3.select(this).select('.right')
                .attr('x', x2(d[1]))
                .attr('width', rightWidth < 0 ? 0 : rightWidth);
            });
      }


      function onBrush() {
        brushExtent = brush.empty() ? null : brush.extent();
        extent = brush.empty() ? x2.domain() : brush.extent();


        dispatch.brush({extent: extent, brush: brush});

        updateBrushBG();


        //------------------------------------------------------------
        // Prepare Main (Focus) Bars and Lines
        
        bars
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }));


        lines
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }));

        var focusBarsWrap = g.select('.nv-focus .nv-barsWrap')
            .datum(!dataBars.length ? [{values:[]}] :
              dataBars
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return bars.x()(d,i) >= extent[0] && bars.x()(d,i) <= extent[1];
                    })
                  }
                })
            );
        
        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
            .datum(dataLines[0].disabled ? [{values:[]}] :
              dataLines
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                    })
                  }
                })
             );
                 
        //------------------------------------------------------------
        
        
        //------------------------------------------------------------
        // Update Main (Focus) X Axis

        if (dataBars.length) {
            x = bars.xScale();
        } else {
            x = lines.xScale();
        }
        
        xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight1, 0);

        xAxis.domain([Math.ceil(extent[0]), Math.floor(extent[1])]);
        
        g.select('.nv-x.nv-axis').transition().duration(transitionDuration)
          .call(xAxis);
        //------------------------------------------------------------
        
        
        //------------------------------------------------------------
        // Update Main (Focus) Bars and Lines

        focusBarsWrap.transition().duration(transitionDuration).call(bars);
        focusLinesWrap.transition().duration(transitionDuration).call(lines);
        
        //------------------------------------------------------------
        
          
        //------------------------------------------------------------
        // Setup and Update Main (Focus) Y Axes
        
        g.select('.nv-focus .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y1.range()[0] + ')');


        y1Axis
        .scale(y1)
        .ticks( availableHeight1 / 36 )
        .tickSize(-availableWidth, 0);

        g.select('.nv-focus .nv-y1.nv-axis')
          .style('opacity', dataBars.length ? 1 : 0);


        y2Axis
        .scale(y2)
        .ticks( availableHeight1 / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

        g.select('.nv-focus .nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + x.range()[1] + ',0)');

        g.select('.nv-focus .nv-y1.nv-axis').transition().duration(transitionDuration)
            .call(y1Axis);
        g.select('.nv-focus .nv-y2.nv-axis').transition().duration(transitionDuration)
            .call(y2Axis);
      }

      //============================================================

      onBrush();

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.lines2 = lines2;
  chart.bars = bars;
  chart.bars2 = bars2;
  chart.xAxis = xAxis;
  chart.x2Axis = x2Axis;
  chart.y1Axis = y1Axis;
  chart.y2Axis = y2Axis;
  chart.y3Axis = y3Axis;
  chart.y4Axis = y4Axis;

  d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.brushExtent = function(_) {
    if (!arguments.length) return brushExtent;
    brushExtent = _;
    return chart;
  };


  //============================================================


  return chart;
}

nv.models.multiBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , clipEdge = true
    , stacked = false
    , stackOffset = 'zero' // options include 'silhouette', 'wiggle', 'expand', 'zero', or a custom function
    , color = nv.utils.defaultColor()
    , hideable = false
    , barColor = null // adding the ability to set the color for each rather than the whole group
    , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
    , delay = 1200
    , xDomain
    , yDomain
    , xRange
    , yRange
    , groupSpacing = 0.1
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      if(hideable && data.length) hideable = [{
        values: data[0].values.map(function(d) {
        return {
          x: d.x,
          y: 0,
          series: d.series,
          size: 0.01
        };}
      )}];

      if (stacked)
        data = d3.layout.stack()
                 .offset(stackOffset)
                 .values(function(d){ return d.values })
                 .y(getY)
                 (!data.length && hideable ? hideable : data);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });


      //------------------------------------------------------------
      // HACK for negative value stacking
      if (stacked)
        data[0].values.map(function(d,i) {
          var posBase = 0, negBase = 0;
          data.map(function(d) {
            var f = d.values[i]
            f.size = Math.abs(f.y);
            if (f.y<0)  {
              f.y1 = negBase;
              negBase = negBase - f.size;
            } else
            {
              f.y1 = f.size + posBase;
              posBase = posBase + f.size;
            }
          });
        });

      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableWidth], groupSpacing);

      //y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y1 : 0) }).concat(forceY)))
      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return stacked ? (d.y > 0 ? d.y1 : d.y1 + d.y ) : d.y }).concat(forceY)))
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);


      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multibar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibar');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');
      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');



      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d,i) { return i });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
        .transition()
        .selectAll('rect.nv-bar')
        .delay(function(d,i) {
             return i * delay/ data[0].values.length;
        })
          .attr('y', function(d) { return stacked ? y0(d.y0) : y0(0) })
          .attr('height', 0)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i) });
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('rect.nv-bar')
          .data(function(d) { return (hideable && !data.length) ? hideable.values : d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('rect')
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
          .attr('x', function(d,i,j) {
              return stacked ? 0 : (j * x.rangeBand() / data.length )
          })
          .attr('y', function(d) { return y0(stacked ? d.y0 : 0) })
          .attr('height', 0)
          .attr('width', x.rangeBand() / (stacked ? 1 : data.length) )
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
          ;
      bars
          .style('fill', function(d,i,j){ return color(d, j, i);  })
          .style('stroke', function(d,i,j){ return color(d, j, i); })
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });
      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
          .transition()
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })

      if (barColor) {
        if (!disabled) disabled = data.map(function() { return true });
        bars
          .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
          .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
      }


      if (stacked)
          bars.transition()
            .delay(function(d,i) {

                  return i * delay / data[0].values.length;
            })
            .attr('y', function(d,i) {

              return y((stacked ? d.y1 : 0));
            })
            .attr('height', function(d,i) {
              return Math.max(Math.abs(y(d.y + (stacked ? d.y0 : 0)) - y((stacked ? d.y0 : 0))),1);
            })
            .attr('x', function(d,i) {
                  return stacked ? 0 : (d.series * x.rangeBand() / data.length )
            })
            .attr('width', x.rangeBand() / (stacked ? 1 : data.length) );
      else
          bars.transition()
            .delay(function(d,i) {
                return i * delay/ data[0].values.length;
            })
            .attr('x', function(d,i) {
              return d.series * x.rangeBand() / data.length
            })
            .attr('width', x.rangeBand() / data.length)
            .attr('y', function(d,i) {
                return getY(d,i) < 0 ?
                        y(0) :
                        y(0) - y(getY(d,i)) < 1 ?
                          y(0) - 1 :
                        y(getY(d,i)) || 0;
            })
            .attr('height', function(d,i) {
                return Math.max(Math.abs(y(getY(d,i)) - y(0)),1) || 0;
            });



      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.stacked = function(_) {
    if (!arguments.length) return stacked;
    stacked = _;
    return chart;
  };

  chart.stackOffset = function(_) {
    if (!arguments.length) return stackOffset;
    stackOffset = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.barColor = function(_) {
    if (!arguments.length) return barColor;
    barColor = nv.utils.getColor(_);
    return chart;
  };

  chart.disabled = function(_) {
    if (!arguments.length) return disabled;
    disabled = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.hideable = function(_) {
    if (!arguments.length) return hideable;
    hideable = _;
    return chart;
  };

  chart.delay = function(_) {
    if (!arguments.length) return delay;
    delay = _;
    return chart;
  };

  chart.groupSpacing = function(_) {
    if (!arguments.length) return groupSpacing;
    groupSpacing = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var multibar = nv.models.multiBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor()
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , reduceXTicks = true // if false a tick will show for every data point
    , staggerLabels = false
    , rotateLabels = 0
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' on ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , state = { stacked: false }
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = function() { return showControls ? 180 : 0 }
    , transitionDuration = 250
    ;

  multibar
    .stacked(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(7)
    .highlightZero(true)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickFormat(d3.format(',.1f'))
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = d3.event.pageX || ( e.pos[0] + (offsetElement.offsetLeft || 0) ) + margin.left,
    top = d3.event.pageY || ( e.pos[1] + ( offsetElement.offsetTop || 0) ) + margin.top,
    x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
    y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
    content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);

    /*var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);
    console.log('nvd3 file, left:' left + ', top: ' + top + ', content: ' + content + ', e.value: ' + e.value + ', offsetElement: ' + JSON.stringify(offsetElement) + ', x: ' + x + ', y: ' + y);
    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);*/
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }
      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = multibar.xScale();
      y = multibar.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multiBarWithLegend').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarWithLegend').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth - controlWidth());

        if (multibar.barColor())
          data.forEach(function(series,i) {
            series.color = d3.rgb('#ccc').darker(i * 1.5).toString();
          })

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Grouped', disabled: multibar.stacked() },
          { key: 'Stacked', disabled: !multibar.stacked() }
        ];

        controls.width(controlWidth()).color(['#444', '#444', '#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      multibar
        .disabled(data.map(function(series) { return series.disabled }))
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }))


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(multibar);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableWidth / 100 )
            .tickSize(-availableHeight, 0);

          g.select('.nv-x.nv-axis')
              .attr('transform', 'translate(0,' + y.range()[0] + ')');
          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);

          var xTicks = g.select('.nv-x.nv-axis > g').selectAll('g');

          xTicks
              .selectAll('line, text')
              .style('opacity', 1)

          if (staggerLabels) {
              var getTranslate = function(x,y) {
                  return "translate(" + x + "," + y + ")";
              };

              var staggerUp = 5, staggerDown = 17;  //pixels to stagger by
              // Issue #140
              xTicks
                .selectAll("text")
                .attr('transform', function(d,i,j) { 
                    return  getTranslate(0, (j % 2 == 0 ? staggerUp : staggerDown));
                  });

              var totalInBetweenTicks = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
              g.selectAll(".nv-x.nv-axis .nv-axisMaxMin text")
                .attr("transform", function(d,i) {
                    return getTranslate(0, (i === 0 || totalInBetweenTicks % 2 !== 0) ? staggerDown : staggerUp);
                });
          }

          if (reduceXTicks)
            xTicks
              .filter(function(d,i) {
                  return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
                })
              .selectAll('text, line')
              .style('opacity', 0);

          if(rotateLabels)
            xTicks
              .selectAll('.tick text')
              .attr('transform', 'rotate(' + rotateLabels + ' 0,0)')
              .style('text-anchor', rotateLabels > 0 ? 'start' : 'end');
          
          g.select('.nv-x.nv-axis').selectAll('g.nv-axisMaxMin text')
              .style('opacity', 1);
      }


      if (showYAxis) {      
          yAxis
            .scale(y)
            .ticks( availableHeight / 36 )
            .tickSize( -availableWidth, 0);

          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }


      //------------------------------------------------------------



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;
        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        switch (d.key) {
          case 'Grouped':
            multibar.stacked(false);
            break;
          case 'Stacked':
            multibar.stacked(true);
            break;
        }

        state.stacked = multibar.stacked();
        dispatch.stateChange(state);

        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode)
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.stacked !== 'undefined') {
          multibar.stacked(e.stacked);
          state.stacked = e.stacked;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  multibar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  multibar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.multibar = multibar;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'clipEdge',
   'id', 'stacked', 'stackOffset', 'delay', 'barColor','groupSpacing');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.reduceXTicks= function(_) {
    if (!arguments.length) return reduceXTicks;
    reduceXTicks = _;
    return chart;
  };

  chart.rotateLabels = function(_) {
    if (!arguments.length) return rotateLabels;
    rotateLabels = _;
    return chart;
  }

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };
  
  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarHorizontal = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , color = nv.utils.defaultColor()
    , barColor = null // adding the ability to set the color for each rather than the whole group
    , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
    , stacked = false
    , showValues = false
    , showBarLabels = false
    , valuePadding = 60
    , valueFormat = d3.format(',.2f')
    , delay = 1200
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      if (stacked)
        data = d3.layout.stack()
                 .offset('zero')
                 .values(function(d){ return d.values })
                 .y(getY)
                 (data);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });



      //------------------------------------------------------------
      // HACK for negative value stacking
      if (stacked)
        data[0].values.map(function(d,i) {
          var posBase = 0, negBase = 0;
          data.map(function(d) {
            var f = d.values[i]
            f.size = Math.abs(f.y);
            if (f.y<0)  {
              f.y1 = negBase - f.size;
              negBase = negBase - f.size;
            } else
            {
              f.y1 = posBase;
              posBase = posBase + f.size;
            }
          });
        });



      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableHeight], .1);

      //y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y0 : 0) }).concat(forceY)))
      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return stacked ? (d.y > 0 ? d.y1 + d.y : d.y1 ) : d.y }).concat(forceY)))

      if (showValues && !stacked)
        y.range(yRange || [(y.domain()[0] < 0 ? valuePadding : 0), availableWidth - (y.domain()[1] > 0 ? valuePadding : 0) ]);
      else
        y.range(yRange || [0, availableWidth]);

      x0 = x0 || x;
      y0 = y0 || d3.scale.linear().domain(y.domain()).range([y(0),y(0)]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-multibarHorizontal').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibarHorizontal');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d,i) { return i });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit().transition()
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i) });
      groups.transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('g.nv-bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('g')
          .attr('transform', function(d,i,j) {
              return 'translate(' + y0(stacked ? d.y0 : 0) + ',' + (stacked ? 0 : (j * x.rangeBand() / data.length ) + x(getX(d,i))) + ')'
          });

      barsEnter.append('rect')
          .attr('width', 0)
          .attr('height', x.rangeBand() / (stacked ? 1 : data.length) )

      bars
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [ y(getY(d,i) + (stacked ? d.y0 : 0)), x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length) ],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });


      barsEnter.append('text');

      if (showValues && !stacked) {
        bars.select('text')
            .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'end' : 'start' })
            .attr('y', x.rangeBand() / (data.length * 2))
            .attr('dy', '.32em')
            .text(function(d,i) { return valueFormat(getY(d,i)) })
        bars.transition()
          .select('text')
            .attr('x', function(d,i) { return getY(d,i) < 0 ? -4 : y(getY(d,i)) - y(0) + 4 })
      } else {
        bars.selectAll('text').text('');
      }

      if (showBarLabels && !stacked) {
        barsEnter.append('text').classed('nv-bar-label',true);
        bars.select('text.nv-bar-label')
            .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'start' : 'end' })
            .attr('y', x.rangeBand() / (data.length * 2))
            .attr('dy', '.32em')
            .text(function(d,i) { return getX(d,i) });
        bars.transition()
          .select('text.nv-bar-label')
            .attr('x', function(d,i) { return getY(d,i) < 0 ? y(0) - y(getY(d,i)) + 4 : -4 });
      }
      else {
        bars.selectAll('text.nv-bar-label').text('');
      }

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})

      if (barColor) {
        if (!disabled) disabled = data.map(function() { return true });
        bars
          .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
          .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
      }

      if (stacked)
        bars.transition()
            .attr('transform', function(d,i) {
              return 'translate(' + y(d.y1) + ',' + x(getX(d,i)) + ')'
            })
          .select('rect')
            .attr('width', function(d,i) {
              return Math.abs(y(getY(d,i) + d.y0) - y(d.y0))
            })
            .attr('height', x.rangeBand() );
      else
        bars.transition()
            .attr('transform', function(d,i) {
              //TODO: stacked must be all positive or all negative, not both?
              return 'translate(' +
              (getY(d,i) < 0 ? y(getY(d,i)) : y(0))
              + ',' +
              (d.series * x.rangeBand() / data.length
              +
              x(getX(d,i)) )
              + ')'
            })
          .select('rect')
            .attr('height', x.rangeBand() / data.length )
            .attr('width', function(d,i) {
              return Math.max(Math.abs(y(getY(d,i)) - y(0)),1)
            });


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.stacked = function(_) {
    if (!arguments.length) return stacked;
    stacked = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.barColor = function(_) {
    if (!arguments.length) return barColor;
    barColor = nv.utils.getColor(_);
    return chart;
  };

  chart.disabled = function(_) {
    if (!arguments.length) return disabled;
    disabled = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.delay = function(_) {
    if (!arguments.length) return delay;
    delay = _;
    return chart;
  };

  chart.showValues = function(_) {
    if (!arguments.length) return showValues;
    showValues = _;
    return chart;
  };

  chart.showBarLabels = function(_) {
    if (!arguments.length) return showBarLabels;
    showBarLabels = _;
    return chart;
  };


  chart.valueFormat= function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.valuePadding = function(_) {
    if (!arguments.length) return valuePadding;
    valuePadding = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarHorizontalChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var multibar = nv.models.multiBarHorizontal()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend().height(30)
    , controls = nv.models.legend().height(30)
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor()
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , stacked = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + ' - ' + x + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , state = { stacked: stacked }
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = function() { return showControls ? 180 : 0 }
    , transitionDuration = 250
    ;

  multibar
    .stacked(stacked)
    ;
  xAxis
    .orient('left')
    .tickPadding(5)
    .highlightZero(false)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient('bottom')
    .tickFormat(d3.format(',.1f'))
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = d3.event.pageX || ( e.pos[0] + (offsetElement.offsetLeft || 0) ) + margin.left,
        top = d3.event.pageY || ( e.pos[1] + ( offsetElement.offsetTop || 0) ) + margin.top,
        x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);


    /*var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);*/
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = multibar.xScale();
      y = multibar.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multiBarHorizontalChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarHorizontalChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis')
            .append('g').attr('class', 'nv-zeroLine')
            .append('line');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth - controlWidth());

        if (multibar.barColor())
          data.forEach(function(series,i) {
            series.color = d3.rgb('#ccc').darker(i * 1.5).toString();
          })

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Grouped', disabled: multibar.stacked() },
          { key: 'Stacked', disabled: !multibar.stacked() }
        ];

        controls.width(controlWidth()).color(['#444', '#444', '#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      multibar
        .disabled(data.map(function(series) { return series.disabled }))
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }))


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(multibar);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableHeight / 24 )
            .tickSize(-availableWidth, 0);

          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);

          var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

          xTicks
              .selectAll('line, text');
      }

      if (showYAxis) {
          yAxis
            .scale(y)
            .ticks( availableWidth / 100 )
            .tickSize( -availableHeight, 0);

          g.select('.nv-y.nv-axis')
              .attr('transform', 'translate(0,' + availableHeight + ')');
          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }

      // Zero line
      g.select(".nv-zeroLine line")
        .attr("x1", y(0))
        .attr("x2", y(0))
        .attr("y1", 0)
        .attr("y2", -availableHeight)
        ;

      //------------------------------------------------------------



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;
        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        switch (d.key) {
          case 'Grouped':
            multibar.stacked(false);
            break;
          case 'Stacked':
            multibar.stacked(true);
            break;
        }

        state.stacked = multibar.stacked();
        dispatch.stateChange(state);

        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.stacked !== 'undefined') {
          multibar.stacked(e.stacked);
          state.stacked = e.stacked;
        }

        chart.update();
      });
      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  multibar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  multibar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.multibar = multibar;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY',
    'clipEdge', 'id', 'delay', 'showValues','showBarLabels', 'valueFormat', 'stacked', 'barColor');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };
  //============================================================


  return chart;
}
nv.models.multiChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 30, right: 20, bottom: 50, left: 60},
      color = d3.scale.category20().range(),
      width = null, 
      height = null,
      showLegend = true,
      tooltips = true,
      tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      },
      x,
      y,
      yDomain1,
      yDomain2
      ; //can be accessed via chart.lines.[x/y]Scale()

  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x = d3.scale.linear(),
      yScale1 = d3.scale.linear(),
      yScale2 = d3.scale.linear(),

      lines1 = nv.models.line().yScale(yScale1),
      lines2 = nv.models.line().yScale(yScale2),

      bars1 = nv.models.multiBar().stacked(false).yScale(yScale1),
      bars2 = nv.models.multiBar().stacked(false).yScale(yScale2),

      stack1 = nv.models.stackedArea().yScale(yScale1),
      stack2 = nv.models.stackedArea().yScale(yScale2),

      xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
      yAxis1 = nv.models.axis().scale(yScale1).orient('left'),
      yAxis2 = nv.models.axis().scale(yScale2).orient('right'),

      legend = nv.models.legend().height(30),
      dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines1.x()(e.point, e.pointIndex)),
        y = ((e.series.yAxis == 2) ? yAxis2 : yAxis1).tickFormat()(lines1.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, undefined, undefined, offsetElement.offsetParent);
  };

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      chart.update = function() { container.transition().call(chart); };
      chart.container = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      var dataLines1 = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 1})
      var dataLines2 = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 2})
      var dataBars1 = data.filter(function(d) {return !d.disabled && d.type == 'bar' && d.yAxis == 1})
      var dataBars2 = data.filter(function(d) {return !d.disabled && d.type == 'bar' && d.yAxis == 2})
      var dataStack1 = data.filter(function(d) {return !d.disabled && d.type == 'area' && d.yAxis == 1})
      var dataStack2 = data.filter(function(d) {return !d.disabled && d.type == 'area' && d.yAxis == 2})

      var series1 = data.filter(function(d) {return !d.disabled && d.yAxis == 1})
            .map(function(d) {
              return d.values.map(function(d,i) {
                return { x: d.x, y: d.y }
              })
            })

      var series2 = data.filter(function(d) {return !d.disabled && d.yAxis == 2})
            .map(function(d) {
              return d.values.map(function(d,i) {
                return { x: d.x, y: d.y }
              })
            })

      x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
          .range([0, availableWidth]);

      var wrap = container.selectAll('g.wrap.multiChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 multiChart').append('g');

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y1 axis');
      gEnter.append('g').attr('class', 'y2 axis');
      gEnter.append('g').attr('class', 'lines1Wrap');
      gEnter.append('g').attr('class', 'lines2Wrap');
      gEnter.append('g').attr('class', 'bars1Wrap');
      gEnter.append('g').attr('class', 'bars2Wrap');
      gEnter.append('g').attr('class', 'stack1Wrap');
      gEnter.append('g').attr('class', 'stack2Wrap');
      gEnter.append('g').attr('class', 'legendWrap');

      var g = wrap.select('g');

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.legendWrap')
            .datum(data.map(function(series) { 
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.yAxis == 1 ? '' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }


      lines1
        .width(availableWidth)
        .height(availableHeight)
        .interpolate("monotone")
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'line'}));

      lines2
        .width(availableWidth)
        .height(availableHeight)
        .interpolate("monotone")
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'line'}));

      bars1
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'bar'}));

      bars2
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'bar'}));

      stack1
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'area'}));

      stack2
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'area'}));

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      var lines1Wrap = g.select('.lines1Wrap')
          .datum(dataLines1)
      var bars1Wrap = g.select('.bars1Wrap')
          .datum(dataBars1)
      var stack1Wrap = g.select('.stack1Wrap')
          .datum(dataStack1)

      var lines2Wrap = g.select('.lines2Wrap')
          .datum(dataLines2)
      var bars2Wrap = g.select('.bars2Wrap')
          .datum(dataBars2)
      var stack2Wrap = g.select('.stack2Wrap')
          .datum(dataStack2)

      var extraValue1 = dataStack1.length ? dataStack1.map(function(a){return a.values}).reduce(function(a,b){
        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
      }).concat([{x:0, y:0}]) : []
      var extraValue2 = dataStack2.length ? dataStack2.map(function(a){return a.values}).reduce(function(a,b){
        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
      }).concat([{x:0, y:0}]) : []

      yScale1 .domain(yDomain1 || d3.extent(d3.merge(series1).concat(extraValue1), function(d) { return d.y } ))
              .range([0, availableHeight])

      yScale2 .domain(yDomain2 || d3.extent(d3.merge(series2).concat(extraValue2), function(d) { return d.y } ))
              .range([0, availableHeight])

      lines1.yDomain(yScale1.domain())
      bars1.yDomain(yScale1.domain())
      stack1.yDomain(yScale1.domain())

      lines2.yDomain(yScale2.domain())
      bars2.yDomain(yScale2.domain())
      stack2.yDomain(yScale2.domain())

      if(dataStack1.length){d3.transition(stack1Wrap).call(stack1);}
      if(dataStack2.length){d3.transition(stack2Wrap).call(stack2);}

      if(dataBars1.length){d3.transition(bars1Wrap).call(bars1);}
      if(dataBars2.length){d3.transition(bars2Wrap).call(bars2);}

      if(dataLines1.length){d3.transition(lines1Wrap).call(lines1);}
      if(dataLines2.length){d3.transition(lines2Wrap).call(lines2);}
      


      xAxis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + availableHeight + ')');
      d3.transition(g.select('.x.axis'))
          .call(xAxis);

      yAxis1
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);


      d3.transition(g.select('.y1.axis'))
          .call(yAxis1);

      yAxis2
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.y2.axis'))
          .call(yAxis2);

      g.select('.y2.axis')
          .style('opacity', series2.length ? 1 : 0)
          .attr('transform', 'translate(' + x.range()[1] + ',0)');

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });
     
      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  lines2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  stack1.dispatch.on('tooltipShow', function(e) {
    //disable tooltips when value ~= 0
    //// TODO: consider removing points from voronoi that have 0 value instead of this hack
    if (!Math.round(stack1.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
      setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
      return false;
    }

    e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
    dispatch.tooltipShow(e);
  });

  stack1.dispatch.on('tooltipHide', function(e) {
    dispatch.tooltipHide(e);
  });

  stack2.dispatch.on('tooltipShow', function(e) {
    //disable tooltips when value ~= 0
    //// TODO: consider removing points from voronoi that have 0 value instead of this hack
    if (!Math.round(stack2.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
      setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
      return false;
    }

    e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
    dispatch.tooltipShow(e);
  });

  stack2.dispatch.on('tooltipHide', function(e) {
    dispatch.tooltipHide(e);
  });

    lines1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  lines2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });



  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.lines1 = lines1;
  chart.lines2 = lines2;
  chart.bars1 = bars1;
  chart.bars2 = bars2;
  chart.stack1 = stack1;
  chart.stack2 = stack2;
  chart.xAxis = xAxis;
  chart.yAxis1 = yAxis1;
  chart.yAxis2 = yAxis2;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines1.x(_);
    bars1.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines1.y(_);
    bars1.y(_);
    return chart;
  };

  chart.yDomain1 = function(_) {
    if (!arguments.length) return yDomain1;
    yDomain1 = _;
    return chart;
  };

  chart.yDomain2 = function(_) {
    if (!arguments.length) return yDomain2;
    yDomain2 = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    legend.color(_);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  return chart;
}


nv.models.ohlcBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , getOpen = function(d) { return d.open }
    , getClose = function(d) { return d.close }
    , getHigh = function(d) { return d.high }
    , getLow = function(d) { return d.low }
    , forceX = []
    , forceY = []
    , padData     = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
    , clipEdge = true
    , color = nv.utils.defaultColor()
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================

  //============================================================
  // Private Variables
  //------------------------------------------------------------

  //TODO: store old scales for transitions

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ));

      if (padData)
        x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || [
            d3.min(data[0].values.map(getLow).concat(forceY)),
            d3.max(data[0].values.map(getHigh).concat(forceY))
          ])
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-ohlcBar').data([data[0].values]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-ohlcBar');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-ticks');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
            dispatch.chartClick({
                data: d,
                index: i,
                pos: d3.event,
                id: id
            });
          });


      defsEnter.append('clipPath')
          .attr('id', 'nv-chart-clip-path-' + id)
        .append('rect');

      wrap.select('#nv-chart-clip-path-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');



      var ticks = wrap.select('.nv-ticks').selectAll('.nv-tick')
          .data(function(d) { return d });

      ticks.exit().remove();


      var ticksEnter = ticks.enter().append('path')
          .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
          .attr('d', function(d,i) {
            var w = (availableWidth / data[0].values.length) * .9;
            return 'm0,0l0,'
                 + (y(getOpen(d,i))
                 - y(getHigh(d,i)))
                 + 'l'
                 + (-w/2)
                 + ',0l'
                 + (w/2)
                 + ',0l0,'
                 + (y(getLow(d,i)) - y(getOpen(d,i)))
                 + 'l0,'
                 + (y(getClose(d,i))
                 - y(getLow(d,i)))
                 + 'l'
                 + (w/2)
                 + ',0l'
                 + (-w/2)
                 + ',0z';
          })
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
          //.attr('fill', function(d,i) { return color[0]; })
          //.attr('stroke', function(d,i) { return color[0]; })
          //.attr('x', 0 )
          //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) })
          .on('mouseover', function(d,i) {
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
                point: d,
                series: data[0],
                pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
                pointIndex: i,
                seriesIndex: 0,
                e: d3.event
            });

          })
          .on('mouseout', function(d,i) {
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    point: d,
                    series: data[0],
                    pointIndex: i,
                    seriesIndex: 0,
                    e: d3.event
                });
          })
          .on('click', function(d,i) {
                dispatch.elementClick({
                    //label: d[label],
                    value: getY(d,i),
                    data: d,
                    index: i,
                    pos: [x(getX(d,i)), y(getY(d,i))],
                    e: d3.event,
                    id: id
                });
              d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
              dispatch.elementDblClick({
                  //label: d[label],
                  value: getY(d,i),
                  data: d,
                  index: i,
                  pos: [x(getX(d,i)), y(getY(d,i))],
                  e: d3.event,
                  id: id
              });
              d3.event.stopPropagation();
          });

      ticks
          .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
      d3.transition(ticks)
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
          .attr('d', function(d,i) {
            var w = (availableWidth / data[0].values.length) * .9;
            return 'm0,0l0,'
                 + (y(getOpen(d,i))
                 - y(getHigh(d,i)))
                 + 'l'
                 + (-w/2)
                 + ',0l'
                 + (w/2)
                 + ',0l0,'
                 + (y(getLow(d,i))
                 - y(getOpen(d,i)))
                 + 'l0,'
                 + (y(getClose(d,i))
                 - y(getLow(d,i)))
                 + 'l'
                 + (w/2)
                 + ',0l'
                 + (-w/2)
                 + ',0z';
          })
          //.attr('width', (availableWidth / data[0].values.length) * .9 )


      //d3.transition(ticks)
          //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });
          //.order();  // not sure if this makes any sense for this model

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.open = function(_) {
    if (!arguments.length) return getOpen;
    getOpen = _;
    return chart;
  };

  chart.close = function(_) {
    if (!arguments.length) return getClose;
    getClose = _;
    return chart;
  };

  chart.high = function(_) {
    if (!arguments.length) return getHigh;
    getHigh = _;
    return chart;
  };

  chart.low = function(_) {
    if (!arguments.length) return getLow;
    getLow = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.pie = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 500
    , height = 500
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , getDescription = function(d) { return d.description }
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , color = nv.utils.defaultColor()
    , valueFormat = d3.format(',.2f')
    , showLabels = true
    , pieLabelsOutside = true
    , donutLabelsOutside = false
    , labelType = "key"
    , labelThreshold = .02 //if slice percentage is under this, don't show label
    , donut = false
    , labelSunbeamLayout = false
    , startAngle = false
    , endAngle = false
    , donutRatio = 0.5
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          radius = Math.min(availableWidth, availableHeight) / 2,
          arcRadius = radius-(radius / 5),
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      //var wrap = container.selectAll('.nv-wrap.nv-pie').data([data]);
      var wrap = container.selectAll('.nv-wrap.nv-pie').data(data);
      var wrapEnter = wrap.enter().append('g').attr('class','nvd3 nv-wrap nv-pie nv-chart-' + id);
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-pie');
      gEnter.append('g').attr('class', 'nv-pieLabels');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      g.select('.nv-pie').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');
      g.select('.nv-pieLabels').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
              dispatch.chartClick({
                  data: d,
                  index: i,
                  pos: d3.event,
                  id: id
              });
          });


      var arc = d3.svg.arc()
                  .outerRadius(arcRadius);

      if (startAngle) arc.startAngle(startAngle)
      if (endAngle) arc.endAngle(endAngle);
      if (donut) arc.innerRadius(radius * donutRatio);

      // Setup the Pie chart and choose the data element
      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.disabled ? 0 : getY(d) });

      var slices = wrap.select('.nv-pie').selectAll('.nv-slice')
          .data(pie);

      var pieLabels = wrap.select('.nv-pieLabels').selectAll('.nv-label')
          .data(pie);

      slices.exit().remove();
      pieLabels.exit().remove();

      var ae = slices.enter().append('g')
              .attr('class', 'nv-slice')
              .on('mouseover', function(d,i){
                d3.select(this).classed('hover', true);
                dispatch.elementMouseover({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    pointIndex: i,
                    pos: [d3.event.pageX, d3.event.pageY],
                    id: id
                });
              })
              .on('mouseout', function(d,i){
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    id: id
                });
              })
              .on('click', function(d,i) {
                dispatch.elementClick({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    pos: d3.event,
                    id: id
                });
                d3.event.stopPropagation();
              })
              .on('dblclick', function(d,i) {
                dispatch.elementDblClick({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    pos: d3.event,
                    id: id
                });
                d3.event.stopPropagation();
              });

        slices
            .attr('fill', function(d,i) { return color(d, i); })
            .attr('stroke', function(d,i) { return color(d, i); });

        var paths = ae.append('path')
            .each(function(d) { this._current = d; });
            //.attr('d', arc);

        slices.select('path')
          .transition()
            .attr('d', arc)
            .attrTween('d', arcTween);

        if (showLabels) {
          // This does the normal label
          var labelsArc = d3.svg.arc().innerRadius(0);

          if (pieLabelsOutside){ labelsArc = arc; }

          if (donutLabelsOutside) { labelsArc = d3.svg.arc().outerRadius(arc.outerRadius()); }

          pieLabels.enter().append("g").classed("nv-label",true)
            .each(function(d,i) {
                var group = d3.select(this);

                group
                  .attr('transform', function(d) {
                       if (labelSunbeamLayout) {
                         d.outerRadius = arcRadius + 10; // Set Outer Coordinate
                         d.innerRadius = arcRadius + 15; // Set Inner Coordinate
                         var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                         if ((d.startAngle+d.endAngle)/2 < Math.PI) {
                           rotateAngle -= 90;
                         } else {
                           rotateAngle += 90;
                         }
                         return 'translate(' + labelsArc.centroid(d) + ') rotate(' + rotateAngle + ')';
                       } else {
                         d.outerRadius = radius + 10; // Set Outer Coordinate
                         d.innerRadius = radius + 15; // Set Inner Coordinate
                         return 'translate(' + labelsArc.centroid(d) + ')'
                       }
                  });

                group.append('rect')
                    .style('stroke', '#fff')
                    .style('fill', '#fff')
                    .attr("rx", 3)
                    .attr("ry", 3);

                group.append('text')
                    .style('text-anchor', labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle') //center the text on it's origin or begin/end if orthogonal aligned
                    .style('fill', '#000')

            });

          var labelLocationHash = {};
          var avgHeight = 14;
          var avgWidth = 140;
          var createHashKey = function(coordinates) {

              return Math.floor(coordinates[0]/avgWidth) * avgWidth + ',' + Math.floor(coordinates[1]/avgHeight) * avgHeight;
          };
          pieLabels.transition()
                .attr('transform', function(d) {
                  if (labelSunbeamLayout) {
                      d.outerRadius = arcRadius + 10; // Set Outer Coordinate
                      d.innerRadius = arcRadius + 15; // Set Inner Coordinate
                      var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                      if ((d.startAngle+d.endAngle)/2 < Math.PI) {
                        rotateAngle -= 90;
                      } else {
                        rotateAngle += 90;
                      }
                      return 'translate(' + labelsArc.centroid(d) + ') rotate(' + rotateAngle + ')';
                    } else {
                      d.outerRadius = radius + 10; // Set Outer Coordinate
                      d.innerRadius = radius + 15; // Set Inner Coordinate

                      /*
                      Overlapping pie labels are not good. What this attempts to do is, prevent overlapping.
                      Each label location is hashed, and if a hash collision occurs, we assume an overlap.
                      Adjust the label's y-position to remove the overlap.
                      */
                      var center = labelsArc.centroid(d);
                      var hashKey = createHashKey(center);
                      if (labelLocationHash[hashKey]) {
                        center[1] -= avgHeight;
                      }
                      labelLocationHash[createHashKey(center)] = true;
                      return 'translate(' + center + ')'
                    }
                });
          pieLabels.select(".nv-label text")
                .style('text-anchor', labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle') //center the text on it's origin or begin/end if orthogonal aligned
                .text(function(d, i) {
                  var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
                  var labelTypes = {
                    "key" : getX(d.data),
                    "value": getY(d.data),
                    "percent": d3.format('%')(percent)
                  };
                  return (d.value && percent > labelThreshold) ? labelTypes[labelType] : '';
                });
        }


        // Computes the angle of an arc, converting from radians to degrees.
        function angle(d) {
          var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
          return a > 90 ? a - 180 : a;
        }

        function arcTween(a) {
          a.endAngle = isNaN(a.endAngle) ? 0 : a.endAngle;
          a.startAngle = isNaN(a.startAngle) ? 0 : a.startAngle;
          if (!donut) a.innerRadius = 0;
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        }

        function tweenPie(b) {
          b.innerRadius = 0;
          var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
          return function(t) {
              return arc(i(t));
          };
        }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.values = function(_) {
    nv.log("pie.values() is no longer supported.");
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.description = function(_) {
    if (!arguments.length) return getDescription;
    getDescription = _;
    return chart;
  };

  chart.showLabels = function(_) {
    if (!arguments.length) return showLabels;
    showLabels = _;
    return chart;
  };

  chart.labelSunbeamLayout = function(_) {
    if (!arguments.length) return labelSunbeamLayout;
    labelSunbeamLayout = _;
    return chart;
  };

  chart.donutLabelsOutside = function(_) {
    if (!arguments.length) return donutLabelsOutside;
    donutLabelsOutside = _;
    return chart;
  };

  chart.pieLabelsOutside = function(_) {
    if (!arguments.length) return pieLabelsOutside;
    pieLabelsOutside = _;
    return chart;
  };

  chart.labelType = function(_) {
    if (!arguments.length) return labelType;
    labelType = _;
    labelType = labelType || "key";
    return chart;
  };

  chart.donut = function(_) {
    if (!arguments.length) return donut;
    donut = _;
    return chart;
  };

  chart.donutRatio = function(_) {
    if (!arguments.length) return donutRatio;
    donutRatio = _;
    return chart;
  };

  chart.startAngle = function(_) {
    if (!arguments.length) return startAngle;
    startAngle = _;
    return chart;
  };

  chart.endAngle = function(_) {
    if (!arguments.length) return endAngle;
    endAngle = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.valueFormat = function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.labelThreshold = function(_) {
    if (!arguments.length) return labelThreshold;
    labelThreshold = _;
    return chart;
  };
  //============================================================


  return chart;
}
nv.models.pieChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var pie = nv.models.pie()
    , legend = nv.models.legend()
    ;

  var margin = {top: 30, right: 20, bottom: 20, left: 20}
    , width = null
    , height = null
    , showLegend = true
    , color = nv.utils.defaultColor()
    , tooltips = true
    , tooltip = function(key, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , state = {}
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var tooltipLabel = pie.description()(e.point) || pie.x()(e.point)
    var left = e.pos[0] + ( (offsetElement && offsetElement.offsetLeft) || 0 ),
        top = e.pos[1] + ( (offsetElement && offsetElement.offsetTop) || 0),
        y = pie.valueFormat()(pie.y()(e.point)),
        content = tooltip(tooltipLabel, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-pieChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-pieChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-pieWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend
          .width( availableWidth )
          .key(pie.x());

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      pie
        .width(availableWidth)
        .height(availableHeight);


      var pieWrap = g.select('.nv-pieWrap')
          .datum([data]);

      d3.transition(pieWrap).call(pie);

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      pie.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }

  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  pie.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  dispatch.on('tooltipShow', function(e) {
    if (tooltips) showTooltip(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.legend = legend;
  chart.dispatch = dispatch;
  chart.pie = pie;

  d3.rebind(chart, pie, 'valueFormat', 'values', 'x', 'y', 'description', 'id', 'showLabels', 'donutLabelsOutside', 'pieLabelsOutside', 'labelType', 'donut', 'donutRatio', 'labelThreshold');
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    pie.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.scatter = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin       = {top: 0, right: 0, bottom: 0, left: 0}
    , width        = 960
    , height       = 500
    , color        = nv.utils.defaultColor() // chooses color
    , id           = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't select one
    , x            = d3.scale.linear()
    , y            = d3.scale.linear()
    , z            = d3.scale.linear() //linear because d3.svg.shape.size is treated as area
    , getX         = function(d) { return d.x } // accessor to get the x value
    , getY         = function(d) { return d.y } // accessor to get the y value
    , getSize      = function(d) { return d.size || 1} // accessor to get the point size
    , getShape     = function(d) { return d.shape || 'circle' } // accessor to get point shape
    , onlyCircles  = true // Set to false to use shapes
    , forceX       = [] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
    , forceY       = [] // List of numbers to Force into the Y scale
    , forceSize    = [] // List of numbers to Force into the Size scale
    , interactive  = true // If true, plots a voronoi overlay for advanced point intersection
    , pointKey     = null
    , pointActive  = function(d) { return !d.notActive } // any points that return false will be filtered out
    , padData      = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
    , padDataOuter = .1 //outerPadding to imitate ordinal scale outer padding
    , clipEdge     = false // if true, masks points within x and y scale
    , clipVoronoi  = true // if true, masks each point with a circle... can turn off to slightly increase performance
    , clipRadius   = function() { return 25 } // function to get the radius for voronoi point clips
    , xDomain      = null // Override x domain (skips the calculation from data)
    , yDomain      = null // Override y domain
    , xRange       = null // Override x range
    , yRange       = null // Override y range
    , sizeDomain   = null // Override point size domain
    , sizeRange    = null
    , singlePoint  = false
    , dispatch     = d3.dispatch('elementClick', 'elementMouseover', 'elementMouseout')
    , useVoronoi   = true
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0, z0 // used to store previous scales
    , timeoutID
    , needsUpdate = false // Flag for when the points are visually updating, but the interactive layer is behind, to disable tooltips
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });

      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain && sizeDomain) ? [] : // if we know xDomain and yDomain and sizeDomain, no need to calculate.... if Size is constant remember to set sizeDomain to speed up performance
            d3.merge(
              data.map(function(d) {
                return d.values.map(function(d,i) {
                  return { x: getX(d,i), y: getY(d,i), size: getSize(d,i) }
                })
              })
            );

      x   .domain(xDomain || d3.extent(seriesData.map(function(d) { return d.x; }).concat(forceX)))

      if (padData && data[0])
        x.range(xRange || [(availableWidth * padDataOuter +  availableWidth) / (2 *data[0].values.length), availableWidth - availableWidth * (1 + padDataOuter) / (2 * data[0].values.length)  ]);
        //x.range([availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(seriesData.map(function(d) { return d.y }).concat(forceY)))
          .range(yRange || [availableHeight, 0]);

      z   .domain(sizeDomain || d3.extent(seriesData.map(function(d) { return d.size }).concat(forceSize)))
          .range(sizeRange || [16, 256]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] - y.domain()[0] * 0.01, y.domain()[1] + y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      if ( isNaN(x.domain()[0])) {
          x.domain([-1,1]);
      }

      if ( isNaN(y.domain()[0])) {
          y.domain([-1,1]);
      }


      x0 = x0 || x;
      y0 = y0 || y;
      z0 = z0 || z;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatter').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatter nv-chart-' + id + (singlePoint ? ' nv-single-point' : ''));
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');
      gEnter.append('g').attr('class', 'nv-point-paths');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');

      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', (availableHeight > 0) ? availableHeight : 0);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');


      function updateInteractiveLayer() {

        if (!interactive) return false;

        var eventElements;

        var vertices = d3.merge(data.map(function(group, groupIndex) {
            return group.values
              .map(function(point, pointIndex) {
                // *Adding noise to make duplicates very unlikely
                // *Injecting series and point index for reference
                /* *Adding a 'jitter' to the points, because there's an issue in d3.geom.voronoi.
                */
                var pX = getX(point,pointIndex);
                var pY = getY(point,pointIndex);

                return [x(pX)+ Math.random() * 1e-7,
                        y(pY)+ Math.random() * 1e-7,
                        groupIndex,
                        pointIndex, point]; //temp hack to add noise untill I think of a better way so there are no duplicates
              })
              .filter(function(pointArray, pointIndex) {
                return pointActive(pointArray[4], pointIndex); // Issue #237.. move filter to after map, so pointIndex is correct!
              })
          })
        );



        //inject series and point index for reference into voronoi
        if (useVoronoi === true) {

          if (clipVoronoi) {
            var pointClipsEnter = wrap.select('defs').selectAll('.nv-point-clips')
                .data([id])
              .enter();

            pointClipsEnter.append('clipPath')
                  .attr('class', 'nv-point-clips')
                  .attr('id', 'nv-points-clip-' + id);

            var pointClips = wrap.select('#nv-points-clip-' + id).selectAll('circle')
                .data(vertices);
            pointClips.enter().append('circle')
                .attr('r', clipRadius);
            pointClips.exit().remove();
            pointClips
                .attr('cx', function(d) { return d[0] })
                .attr('cy', function(d) { return d[1] });

            wrap.select('.nv-point-paths')
                .attr('clip-path', 'url(#nv-points-clip-' + id + ')');
          }


          if(vertices.length) {
            // Issue #283 - Adding 2 dummy points to the voronoi b/c voronoi requires min 3 points to work
            vertices.push([x.range()[0] - 20, y.range()[0] - 20, null, null]);
            vertices.push([x.range()[1] + 20, y.range()[1] + 20, null, null]);
            vertices.push([x.range()[0] - 20, y.range()[0] + 20, null, null]);
            vertices.push([x.range()[1] + 20, y.range()[1] - 20, null, null]);
          }

          var bounds = d3.geom.polygon([
              [-10,-10],
              [-10,height + 10],
              [width + 10,height + 10],
              [width + 10,-10]
          ]);

          var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
              return {
                'data': bounds.clip(d),
                'series': vertices[i][2],
                'point': vertices[i][3]
              }
            });


          var pointPaths = wrap.select('.nv-point-paths').selectAll('path')
              .data(voronoi);
          pointPaths.enter().append('path')
              .attr('class', function(d,i) { return 'nv-path-'+i; });
          pointPaths.exit().remove();
          /*pointPaths
              .attr('d', function(d) {
                if (d.data.length === 0)
                    return 'M 0 0'
                else
                    return 'M' + d.data.join('L') + 'Z';
              });
          */
          var mouseEventCallback = function(d,mDispatch) {
                if (needsUpdate) return 0;
                var series = data[d.series];
                if (typeof series === 'undefined') return;

                var point  = series.values[d.point];

                mDispatch({
                  point: point,
                  series: series,
                  pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: d.point
                });
          };

          pointPaths
              .on('click', function(d) {
                mouseEventCallback(d, dispatch.elementClick);
              })
              .on('mouseover', function(d) {
                mouseEventCallback(d, dispatch.elementMouseover);
              })
              .on('mouseout', function(d, i) {
                mouseEventCallback(d, dispatch.elementMouseout);
              });


        } else {
          /*
          // bring data in form needed for click handlers
          var dataWithPoints = vertices.map(function(d, i) {
              return {
                'data': d,
                'series': vertices[i][2],
                'point': vertices[i][3]
              }
            });
           */

          // add event handlers to points instead voronoi paths
          wrap.select('.nv-groups').selectAll('.nv-group')
            .selectAll('.nv-point')
              //.data(dataWithPoints)
              //.style('pointer-events', 'auto') // recativate events, disabled by css
              .on('click', function(d,i) {
                //nv.log('test', d, i);
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementClick({
                  point: point,
                  series: series,
                  pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: i
                });
              })
              .on('mouseover', function(d,i) {
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementMouseover({
                  point: point,
                  series: series,
                  pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: i
                });
              })
              .on('mouseout', function(d,i) {
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementMouseout({
                  point: point,
                  series: series,
                  seriesIndex: d.series,
                  pointIndex: i
                });
              });
          }

          needsUpdate = false;
      }

      needsUpdate = true;

      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover });
      groups
          .transition()
          .style('fill', function(d,i) { return color(d, i) })
          .style('stroke', function(d,i) { return color(d, i) })
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


      if (onlyCircles) {

        var points = groups.selectAll('circle.nv-point')
            .data(function(d) { return d.values }, pointKey);
        points.enter().append('circle')
            .style('fill', function (d,i) { return d.color })
            .style('stroke', function (d,i) { return d.color })
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
            .attr('r', function(d,i) { return Math.sqrt(z(getSize(d,i))/Math.PI) });
        points.exit().remove();
        groups.exit().selectAll('path.nv-point').transition()
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            .remove();
        points.each(function(d,i) {
          d3.select(this)
            .classed('nv-point', true)
            .classed('nv-point-' + i, true)
            .classed('hover',false)
            ;
        });
        points.transition()
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            .attr('r', function(d,i) { return Math.sqrt(z(getSize(d,i))/Math.PI) });

      } else {

        var points = groups.selectAll('path.nv-point')
            .data(function(d) { return d.values });
        points.enter().append('path')
            .style('fill', function (d,i) { return d.color })
            .style('stroke', function (d,i) { return d.color })
            .attr('transform', function(d,i) {
              return 'translate(' + x0(getX(d,i)) + ',' + y0(getY(d,i)) + ')'
            })
            .attr('d',
              d3.svg.symbol()
                .type(getShape)
                .size(function(d,i) { return z(getSize(d,i)) })
            );
        points.exit().remove();
        groups.exit().selectAll('path.nv-point')
            .transition()
            .attr('transform', function(d,i) {
              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
            })
            .remove();
        points.each(function(d,i) {
          d3.select(this)
            .classed('nv-point', true)
            .classed('nv-point-' + i, true)
            .classed('hover',false)
            ;
        });
        points.transition()
            .attr('transform', function(d,i) {
              //nv.log(d,i,getX(d,i), x(getX(d,i)));
              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
            })
            .attr('d',
              d3.svg.symbol()
                .type(getShape)
                .size(function(d,i) { return z(getSize(d,i)) })
            );
      }


      // Delay updating the invisible interactive layer for smoother animation
      clearTimeout(timeoutID); // stop repeat calls to updateInteractiveLayer
      timeoutID = setTimeout(updateInteractiveLayer, 300);
      //updateInteractiveLayer();

      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();
      z0 = z.copy();

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------
  chart.clearHighlights = function() {
      //Remove the 'hover' class from all highlighted points.
      d3.selectAll(".nv-chart-" + id + " .nv-point.hover").classed("hover",false);
  };

  chart.highlightPoint = function(seriesIndex,pointIndex,isHoverOver) {
      d3.select(".nv-chart-" + id + " .nv-series-" + seriesIndex + " .nv-point-" + pointIndex)
          .classed("hover",isHoverOver);
  };


  dispatch.on('elementMouseover.point', function(d) {
     if (interactive) chart.highlightPoint(d.seriesIndex,d.pointIndex,true);
  });

  dispatch.on('elementMouseout.point', function(d) {
     if (interactive) chart.highlightPoint(d.seriesIndex,d.pointIndex,false);
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.size = function(_) {
    if (!arguments.length) return getSize;
    getSize = d3.functor(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.zScale = function(_) {
    if (!arguments.length) return z;
    z = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.sizeDomain = function(_) {
    if (!arguments.length) return sizeDomain;
    sizeDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.sizeRange = function(_) {
    if (!arguments.length) return sizeRange;
    sizeRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.forceSize = function(_) {
    if (!arguments.length) return forceSize;
    forceSize = _;
    return chart;
  };

  chart.interactive = function(_) {
    if (!arguments.length) return interactive;
    interactive = _;
    return chart;
  };

  chart.pointKey = function(_) {
    if (!arguments.length) return pointKey;
    pointKey = _;
    return chart;
  };

  chart.pointActive = function(_) {
    if (!arguments.length) return pointActive;
    pointActive = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.padDataOuter = function(_) {
    if (!arguments.length) return padDataOuter;
    padDataOuter = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.clipVoronoi= function(_) {
    if (!arguments.length) return clipVoronoi;
    clipVoronoi = _;
    return chart;
  };

  chart.useVoronoi= function(_) {
    if (!arguments.length) return useVoronoi;
    useVoronoi = _;
    if (useVoronoi === false) {
        clipVoronoi = false;
    }
    return chart;
  };

  chart.clipRadius = function(_) {
    if (!arguments.length) return clipRadius;
    clipRadius = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.shape = function(_) {
    if (!arguments.length) return getShape;
    getShape = _;
    return chart;
  };

  chart.onlyCircles = function(_) {
    if (!arguments.length) return onlyCircles;
    onlyCircles = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.singlePoint = function(_) {
    if (!arguments.length) return singlePoint;
    singlePoint = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.scatterChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var scatter      = nv.models.scatter()
    , xAxis        = nv.models.axis()
    , yAxis        = nv.models.axis()
    , legend       = nv.models.legend()
    , controls     = nv.models.legend()
    , distX        = nv.models.distribution()
    , distY        = nv.models.distribution()
    ;

  var margin       = {top: 30, right: 20, bottom: 50, left: 75}
    , width        = null
    , height       = null
    , color        = nv.utils.defaultColor()
    , x            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.xScale()
    , y            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.yScale()
    , xPadding     = 0
    , yPadding     = 0
    , showDistX    = false
    , showDistY    = false
    , showLegend   = true
    , showXAxis    = true
    , showYAxis    = true
    , rightAlignYAxis = false
    , showControls = !!d3.fisheye
    , fisheye      = 0
    , pauseFisheye = false
    , tooltips     = true
    , tooltipX     = function(key, x, y) { return '<strong>' + x + '</strong>' }
    , tooltipY     = function(key, x, y) { return '<strong>' + y + '</strong>' }
    , tooltip      = null
    , state = {}
    , defaultState = null
    , dispatch     = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , noData       = "No Data Available."
    , transitionDuration = 250
    ;

  scatter
    .xScale(x)
    .yScale(y)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(10)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickPadding(10)
    ;
  distX
    .axis('x')
    ;
  distY
    .axis('y')
    ;

  controls.updateState(false);

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  var showTooltip = function(e, offsetElement) {
    //TODO: make tooltip style an option between single or dual on axes (maybe on all charts with axes?)

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        leftX = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        topX = y.range()[0] + margin.top + ( offsetElement.offsetTop || 0),
        leftY = x.range()[0] + margin.left + ( offsetElement.offsetLeft || 0 ),
        topY = e.pos[1] + ( offsetElement.offsetTop || 0),
        xVal = xAxis.tickFormat()(scatter.x()(e.point, e.pointIndex)),
        yVal = yAxis.tickFormat()(scatter.y()(e.point, e.pointIndex));

      if( tooltipX != null )
          nv.tooltip.show([leftX, topX], tooltipX(e.series.key, xVal, yVal, e, chart), 'n', 1, offsetElement, 'x-nvtooltip');
      if( tooltipY != null )
          nv.tooltip.show([leftY, topY], tooltipY(e.series.key, xVal, yVal, e, chart), 'e', 1, offsetElement, 'y-nvtooltip');
      if( tooltip != null )
          nv.tooltip.show([left, top], tooltip(e.series.key, xVal, yVal, e, chart), e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  var controlsData = [
    { key: 'Magnify', disabled: true }
  ];

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      // background for pointer events
      gEnter.append('rect').attr('class', 'nvd3 nv-background');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-scatterWrap');
      gEnter.append('g').attr('class', 'nv-distWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        var legendWidth = (showControls) ? availableWidth / 2 : availableWidth;
        legend.width(legendWidth);

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (availableWidth - legendWidth) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        controls.width(180).color(['#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      scatter
          .width(availableWidth)
          .height(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color(d, i);
          }).filter(function(d,i) { return !data[i].disabled }));

      if (xPadding !== 0)
        scatter.xDomain(null);

      if (yPadding !== 0)
        scatter.yDomain(null);

      wrap.select('.nv-scatterWrap')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(scatter);

      //Adjust for x and y padding
      if (xPadding !== 0) {
        var xRange = x.domain()[1] - x.domain()[0];
        scatter.xDomain([x.domain()[0] - (xPadding * xRange), x.domain()[1] + (xPadding * xRange)]);
      }

      if (yPadding !== 0) {
        var yRange = y.domain()[1] - y.domain()[0];
        scatter.yDomain([y.domain()[0] - (yPadding * yRange), y.domain()[1] + (yPadding * yRange)]);
      }

      //Only need to update the scatter again if x/yPadding changed the domain.
      if (yPadding !== 0 || xPadding !== 0) {
        wrap.select('.nv-scatterWrap')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(scatter);
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes
      if (showXAxis) {
        xAxis
            .scale(x)
            .ticks( xAxis.ticks() && xAxis.ticks().length ? xAxis.ticks() : availableWidth / 100 )
            .tickSize( -availableHeight , 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .call(xAxis);

      }

      if (showYAxis) {
        yAxis
            .scale(y)
            .ticks( yAxis.ticks() && yAxis.ticks().length ? yAxis.ticks() : availableHeight / 36 )
            .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .call(yAxis);
      }


      if (showDistX) {
        distX
            .getData(scatter.x())
            .scale(x)
            .width(availableWidth)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionX');
        g.select('.nv-distributionX')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
      }

      if (showDistY) {
        distY
            .getData(scatter.y())
            .scale(y)
            .width(availableHeight)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionY');
        g.select('.nv-distributionY')
            .attr('transform', 
              'translate(' + (rightAlignYAxis ? availableWidth : -distY.size() ) + ',0)')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }

      //------------------------------------------------------------




      if (d3.fisheye) {
        g.select('.nv-background')
            .attr('width', availableWidth)
            .attr('height', availableHeight);

        g.select('.nv-background').on('mousemove', updateFisheye);
        g.select('.nv-background').on('click', function() { pauseFisheye = !pauseFisheye;});
        scatter.dispatch.on('elementClick.freezeFisheye', function() {
          pauseFisheye = !pauseFisheye;
        });
      }


      function updateFisheye() {
        if (pauseFisheye) {
          g.select('.nv-point-paths').style('pointer-events', 'all');
          return false;
        }

        g.select('.nv-point-paths').style('pointer-events', 'none' );

        var mouse = d3.mouse(this);
        x.distortion(fisheye).focus(mouse[0]);
        y.distortion(fisheye).focus(mouse[1]);

        g.select('.nv-scatterWrap')
            .call(scatter);

        if (showXAxis)
          g.select('.nv-x.nv-axis').call(xAxis);
        
        if (showYAxis)
          g.select('.nv-y.nv-axis').call(yAxis);
        
        g.select('.nv-distributionX')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
        g.select('.nv-distributionY')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        fisheye = d.disabled ? 0 : 2.5;
        g.select('.nv-background') .style('pointer-events', d.disabled ? 'none' : 'all');
        g.select('.nv-point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

        if (d.disabled) {
          x.distortion(fisheye).focus(0);
          y.distortion(fisheye).focus(0);

          g.select('.nv-scatterWrap').call(scatter);
          g.select('.nv-x.nv-axis').call(xAxis);
          g.select('.nv-y.nv-axis').call(yAxis);
        } else {
          pauseFisheye = false;
        }

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
            .attr('y1', function(d,i) { return e.pos[1] - availableHeight;});
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
            .attr('x2', e.pos[0] + distX.size());

        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);

    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
        .attr('y1', 0);
    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
        .attr('x2', distY.size());
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.scatter = scatter;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.distX = distX;
  chart.distY = distY;

  d3.rebind(chart, scatter, 'id', 'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi');
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    distX.color(color);
    distY.color(color);
    return chart;
  };

  chart.showDistX = function(_) {
    if (!arguments.length) return showDistX;
    showDistX = _;
    return chart;
  };

  chart.showDistY = function(_) {
    if (!arguments.length) return showDistY;
    showDistY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };


  chart.fisheye = function(_) {
    if (!arguments.length) return fisheye;
    fisheye = _;
    return chart;
  };

  chart.xPadding = function(_) {
    if (!arguments.length) return xPadding;
    xPadding = _;
    return chart;
  };

  chart.yPadding = function(_) {
    if (!arguments.length) return yPadding;
    yPadding = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltipXContent = function(_) {
    if (!arguments.length) return tooltipX;
    tooltipX = _;
    return chart;
  };

  chart.tooltipYContent = function(_) {
    if (!arguments.length) return tooltipY;
    tooltipY = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };
  
  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.scatterPlusLineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var scatter      = nv.models.scatter()
    , xAxis        = nv.models.axis()
    , yAxis        = nv.models.axis()
    , legend       = nv.models.legend()
    , controls     = nv.models.legend()
    , distX        = nv.models.distribution()
    , distY        = nv.models.distribution()
    ;

  var margin       = {top: 30, right: 20, bottom: 50, left: 75}
    , width        = null
    , height       = null
    , color        = nv.utils.defaultColor()
    , x            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.xScale()
    , y            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.yScale()
    , showDistX    = false
    , showDistY    = false
    , showLegend   = true
    , showXAxis    = true
    , showYAxis    = true
    , rightAlignYAxis = false
    , showControls = !!d3.fisheye
    , fisheye      = 0
    , pauseFisheye = false
    , tooltips     = true
    , tooltipX     = function(key, x, y) { return '<strong>' + x + '</strong>' }
    , tooltipY     = function(key, x, y) { return '<strong>' + y + '</strong>' }
    , tooltip      = function(key, x, y, date) { return '<h3>' + key + '</h3>' 
                                                      + '<p>' + date + '</p>' }
    , state = {}
    , defaultState = null
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , noData       = "No Data Available."
    , transitionDuration = 250
    ;

  scatter
    .xScale(x)
    .yScale(y)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(10)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickPadding(10)
    ;
  distX
    .axis('x')
    ;
  distY
    .axis('y')
    ;
  
  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  var showTooltip = function(e, offsetElement) {
    //TODO: make tooltip style an option between single or dual on axes (maybe on all charts with axes?)

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        leftX = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        topX = y.range()[0] + margin.top + ( offsetElement.offsetTop || 0),
        leftY = x.range()[0] + margin.left + ( offsetElement.offsetLeft || 0 ),
        topY = e.pos[1] + ( offsetElement.offsetTop || 0),
        xVal = xAxis.tickFormat()(scatter.x()(e.point, e.pointIndex)),
        yVal = yAxis.tickFormat()(scatter.y()(e.point, e.pointIndex));

      if( tooltipX != null )
          nv.tooltip.show([leftX, topX], tooltipX(e.series.key, xVal, yVal, e, chart), 'n', 1, offsetElement, 'x-nvtooltip');
      if( tooltipY != null )
          nv.tooltip.show([leftY, topY], tooltipY(e.series.key, xVal, yVal, e, chart), 'e', 1, offsetElement, 'y-nvtooltip');
      if( tooltip != null )
          nv.tooltip.show([left, top], tooltip(e.series.key, xVal, yVal, e.point.tooltip, e, chart), e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  var controlsData = [
    { key: 'Magnify', disabled: true }
  ];

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      // background for pointer events
      gEnter.append('rect').attr('class', 'nvd3 nv-background').style("pointer-events","none");

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-scatterWrap');
      gEnter.append('g').attr('class', 'nv-regressionLinesWrap');
      gEnter.append('g').attr('class', 'nv-distWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth / 2 );

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (availableWidth / 2) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        controls.width(180).color(['#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      scatter
          .width(availableWidth)
          .height(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color(d, i);
          }).filter(function(d,i) { return !data[i].disabled }))

      wrap.select('.nv-scatterWrap')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(scatter);

      wrap.select('.nv-regressionLinesWrap')
          .attr('clip-path', 'url(#nv-edge-clip-' + scatter.id() + ')');

      var regWrap = wrap.select('.nv-regressionLinesWrap').selectAll('.nv-regLines')
                      .data(function(d) {return d });
      
      regWrap.enter().append('g').attr('class', 'nv-regLines');

      var regLine = regWrap.selectAll('.nv-regLine').data(function(d){return [d]});
      var regLineEnter = regLine.enter()
                       .append('line').attr('class', 'nv-regLine')
                       .style('stroke-opacity', 0);

      regLine
          .transition()
          .attr('x1', x.range()[0])
          .attr('x2', x.range()[1])
          .attr('y1', function(d,i) {return y(x.domain()[0] * d.slope + d.intercept) })
          .attr('y2', function(d,i) { return y(x.domain()[1] * d.slope + d.intercept) })
          .style('stroke', function(d,i,j) { return color(d,j) })
          .style('stroke-opacity', function(d,i) {
            return (d.disabled || typeof d.slope === 'undefined' || typeof d.intercept === 'undefined') ? 0 : 1 
          });

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
            .scale(x)
            .ticks( xAxis.ticks() ? xAxis.ticks() : availableWidth / 100 )
            .tickSize( -availableHeight , 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
            .scale(y)
            .ticks( yAxis.ticks() ? yAxis.ticks() : availableHeight / 36 )
            .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .call(yAxis);
      }


      if (showDistX) {
        distX
            .getData(scatter.x())
            .scale(x)
            .width(availableWidth)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionX');
        g.select('.nv-distributionX')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
      }

      if (showDistY) {
        distY
            .getData(scatter.y())
            .scale(y)
            .width(availableHeight)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionY');
        g.select('.nv-distributionY')
            .attr('transform', 'translate(' + (rightAlignYAxis ? availableWidth : -distY.size() ) + ',0)')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }

      //------------------------------------------------------------




      if (d3.fisheye) {
        g.select('.nv-background')
            .attr('width', availableWidth)
            .attr('height', availableHeight)
            ;

        g.select('.nv-background').on('mousemove', updateFisheye);
        g.select('.nv-background').on('click', function() { pauseFisheye = !pauseFisheye;});
        scatter.dispatch.on('elementClick.freezeFisheye', function() {
          pauseFisheye = !pauseFisheye;
        });
      }


      function updateFisheye() {
        if (pauseFisheye) {
          g.select('.nv-point-paths').style('pointer-events', 'all');
          return false;
        }

        g.select('.nv-point-paths').style('pointer-events', 'none' );

        var mouse = d3.mouse(this);
        x.distortion(fisheye).focus(mouse[0]);
        y.distortion(fisheye).focus(mouse[1]);

        g.select('.nv-scatterWrap')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(scatter);

        if (showXAxis)
          g.select('.nv-x.nv-axis').call(xAxis);

        if (showYAxis)
          g.select('.nv-y.nv-axis').call(yAxis);
        
        g.select('.nv-distributionX')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
        g.select('.nv-distributionY')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        fisheye = d.disabled ? 0 : 2.5;
        g.select('.nv-background') .style('pointer-events', d.disabled ? 'none' : 'all');
        g.select('.nv-point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

        if (d.disabled) {
          x.distortion(fisheye).focus(0);
          y.distortion(fisheye).focus(0);

          g.select('.nv-scatterWrap').call(scatter);
          g.select('.nv-x.nv-axis').call(xAxis);
          g.select('.nv-y.nv-axis').call(yAxis);
        } else {
          pauseFisheye = false;
        }

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });


      scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
            .attr('y1', e.pos[1] - availableHeight);
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
            .attr('x2', e.pos[0] + distX.size());

        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);

    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
        .attr('y1', 0);
    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
        .attr('x2', distY.size());
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.scatter = scatter;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.distX = distX;
  chart.distY = distY;

  d3.rebind(chart, scatter, 'id', 'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    distX.color(color);
    distY.color(color);
    return chart;
  };

  chart.showDistX = function(_) {
    if (!arguments.length) return showDistX;
    showDistX = _;
    return chart;
  };

  chart.showDistY = function(_) {
    if (!arguments.length) return showDistY;
    showDistY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.fisheye = function(_) {
    if (!arguments.length) return fisheye;
    fisheye = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltipXContent = function(_) {
    if (!arguments.length) return tooltipX;
    tooltipX = _;
    return chart;
  };

  chart.tooltipYContent = function(_) {
    if (!arguments.length) return tooltipY;
    tooltipY = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.sparkline = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 2, right: 0, bottom: 2, left: 0}
    , width = 400
    , height = 32
    , animate = true
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.getColor(['#000'])
    , xDomain
    , yDomain
    , xRange
    , yRange
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data, getX ))
          .range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(data, getY ))
          .range(yRange || [availableHeight, 0]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-sparkline').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparkline');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      //------------------------------------------------------------


      var paths = wrap.selectAll('path')
          .data(function(d) { return [d] });
      paths.enter().append('path');
      paths.exit().remove();
      paths
          .style('stroke', function(d,i) { return d.color || color(d, i) })
          .attr('d', d3.svg.line()
            .x(function(d,i) { return x(getX(d,i)) })
            .y(function(d,i) { return y(getY(d,i)) })
          );


      // TODO: Add CURRENT data point (Need Min, Mac, Current / Most recent)
      var points = wrap.selectAll('circle.nv-point')
          .data(function(data) {
              var yValues = data.map(function(d, i) { return getY(d,i); });
              function pointIndex(index) {
                  if (index != -1) {
	              var result = data[index];
                      result.pointIndex = index;
                      return result;
                  } else {
                      return null;
                  }
              }
              var maxPoint = pointIndex(yValues.lastIndexOf(y.domain()[1])),
                  minPoint = pointIndex(yValues.indexOf(y.domain()[0])),
                  currentPoint = pointIndex(yValues.length - 1);
              return [minPoint, maxPoint, currentPoint].filter(function (d) {return d != null;});
          });
      points.enter().append('circle');
      points.exit().remove();
      points
          .attr('cx', function(d,i) { return x(getX(d,d.pointIndex)) })
          .attr('cy', function(d,i) { return y(getY(d,d.pointIndex)) })
          .attr('r', 2)
          .attr('class', function(d,i) {
            return getX(d, d.pointIndex) == x.domain()[1] ? 'nv-point nv-currentValue' :
                   getY(d, d.pointIndex) == y.domain()[0] ? 'nv-point nv-minValue' : 'nv-point nv-maxValue'
          });
    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.animate = function(_) {
    if (!arguments.length) return animate;
    animate = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.sparklinePlus = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var sparkline = nv.models.sparkline();

  var margin = {top: 15, right: 100, bottom: 10, left: 50}
    , width = null
    , height = null
    , x
    , y
    , index = []
    , paused = false
    , xTickFormat = d3.format(',r')
    , yTickFormat = d3.format(',.2f')
    , showValue = true
    , alignValue = true
    , rightAlignValue = false
    , noData = "No Data Available."
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this);

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      

      chart.update = function() { chart(selection) };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      var currentValue = sparkline.y()(data[data.length-1], data.length-1);

      //------------------------------------------------------------



      //------------------------------------------------------------
      // Setup Scales

      x = sparkline.xScale();
      y = sparkline.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-sparklineplus').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparklineplus');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-sparklineWrap');
      gEnter.append('g').attr('class', 'nv-valueWrap');
      gEnter.append('g').attr('class', 'nv-hoverArea');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      var sparklineWrap = g.select('.nv-sparklineWrap');

      sparkline
        .width(availableWidth)
        .height(availableHeight);

      sparklineWrap
          .call(sparkline);

      //------------------------------------------------------------


      var valueWrap = g.select('.nv-valueWrap');
      
      var value = valueWrap.selectAll('.nv-currentValue')
          .data([currentValue]);

      value.enter().append('text').attr('class', 'nv-currentValue')
          .attr('dx', rightAlignValue ? -8 : 8)
          .attr('dy', '.9em')
          .style('text-anchor', rightAlignValue ? 'end' : 'start');

      value
          .attr('x', availableWidth + (rightAlignValue ? margin.right : 0))
          .attr('y', alignValue ? function(d) { return y(d) } : 0)
          .style('fill', sparkline.color()(data[data.length-1], data.length-1))
          .text(yTickFormat(currentValue));



      gEnter.select('.nv-hoverArea').append('rect')
          .on('mousemove', sparklineHover)
          .on('click', function() { paused = !paused })
          .on('mouseout', function() { index = []; updateValueLine(); });
          //.on('mouseout', function() { index = null; updateValueLine(); });

      g.select('.nv-hoverArea rect')
          .attr('transform', function(d) { return 'translate(' + -margin.left + ',' + -margin.top + ')' })
          .attr('width', availableWidth + margin.left + margin.right)
          .attr('height', availableHeight + margin.top);



      function updateValueLine() { //index is currently global (within the chart), may or may not keep it that way
        if (paused) return;

        var hoverValue = g.selectAll('.nv-hoverValue').data(index)

        var hoverEnter = hoverValue.enter()
          .append('g').attr('class', 'nv-hoverValue')
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0);

        hoverValue.exit()
          .transition().duration(250)
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0)
            .remove();

        hoverValue
            .attr('transform', function(d) { return 'translate(' + x(sparkline.x()(data[d],d)) + ',0)' })
          .transition().duration(250)
            .style('stroke-opacity', 1)
            .style('fill-opacity', 1);

        if (!index.length) return;

        hoverEnter.append('line')
            .attr('x1', 0)
            .attr('y1', -margin.top)
            .attr('x2', 0)
            .attr('y2', availableHeight);


        hoverEnter.append('text').attr('class', 'nv-xValue')
            .attr('x', -6)
            .attr('y', -margin.top)
            .attr('text-anchor', 'end')
            .attr('dy', '.9em')


        g.select('.nv-hoverValue .nv-xValue')
            .text(xTickFormat(sparkline.x()(data[index[0]], index[0])));

        hoverEnter.append('text').attr('class', 'nv-yValue')
            .attr('x', 6)
            .attr('y', -margin.top)
            .attr('text-anchor', 'start')
            .attr('dy', '.9em')

        g.select('.nv-hoverValue .nv-yValue')
            .text(yTickFormat(sparkline.y()(data[index[0]], index[0])));

      }


      function sparklineHover() {
        if (paused) return;

        var pos = d3.mouse(this)[0] - margin.left;

        function getClosestIndex(data, x) {
          var distance = Math.abs(sparkline.x()(data[0], 0) - x);
          var closestIndex = 0;
          for (var i = 0; i < data.length; i++){
            if (Math.abs(sparkline.x()(data[i], i) - x) < distance) {
              distance = Math.abs(sparkline.x()(data[i], i) - x);
              closestIndex = i;
            }
          }
          return closestIndex;
        }

        index = [getClosestIndex(data, Math.round(x.invert(pos)))];

        updateValueLine();
      }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.sparkline = sparkline;

  d3.rebind(chart, sparkline, 'x', 'y', 'xScale', 'yScale', 'color');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xTickFormat = function(_) {
    if (!arguments.length) return xTickFormat;
    xTickFormat = _;
    return chart;
  };

  chart.yTickFormat = function(_) {
    if (!arguments.length) return yTickFormat;
    yTickFormat = _;
    return chart;
  };

  chart.showValue = function(_) {
    if (!arguments.length) return showValue;
    showValue = _;
    return chart;
  };

  chart.alignValue = function(_) {
    if (!arguments.length) return alignValue;
    alignValue = _;
    return chart;
  };

  chart.rightAlignValue = function(_) {
    if (!arguments.length) return rightAlignValue;
    rightAlignValue = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.stackedArea = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor() // a function that computes the color
    , id = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't selet one
    , getX = function(d) { return d.x } // accessor to get the x value from a data point
    , getY = function(d) { return d.y } // accessor to get the y value from a data point
    , style = 'stack'
    , offset = 'zero'
    , order = 'default'
    , interpolate = 'linear'  // controls the line interpolation
    , clipEdge = false // if true, masks lines within x and y scale
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , scatter = nv.models.scatter()
    , dispatch =  d3.dispatch('tooltipShow', 'tooltipHide', 'areaClick', 'areaMouseover', 'areaMouseout')
    ;

  scatter
    .size(2.2) // default size
    .sizeDomain([2.2,2.2]) // all the same size by default
    ;

  /************************************
   * offset:
   *   'wiggle' (stream)
   *   'zero' (stacked)
   *   'expand' (normalize to 100%)
   *   'silhouette' (simple centered)
   *
   * order:
   *   'inside-out' (stream)
   *   'default' (input order)
   ************************************/

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      //------------------------------------------------------------

      var dataRaw = data;
      // Injecting point index into each point because d3.layout.stack().out does not give index
      data.forEach(function(aseries, i) {
        aseries.seriesIndex = i;
        aseries.values = aseries.values.map(function(d, j) {
          d.index = j;
          d.seriesIndex = i;
          return d;
        });
      });

      var dataFiltered = data.filter(function(series) {
            return !series.disabled;
      });

      data = d3.layout.stack()
               .order(order)
               .offset(offset)
               .values(function(d) { return d.values })  //TODO: make values customizeable in EVERY model in this fashion
               .x(getX)
               .y(getY)
               .out(function(d, y0, y) {
                    var yHeight = (getY(d) === 0) ? 0 : y;
                    d.display = {
                      y: yHeight,
                     y0: y0
                    };
                })
              (dataFiltered);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-stackedarea').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedarea');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-areaWrap');
      gEnter.append('g').attr('class', 'nv-scatterWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      scatter
        .width(availableWidth)
        .height(availableHeight)
        .x(getX)
        .y(function(d) { return d.display.y + d.display.y0 })
        .forceY([0])
        .color(data.map(function(d,i) {
          return d.color || color(d, d.seriesIndex);
        }));


      var scatterWrap = g.select('.nv-scatterWrap')
          .datum(data);

      scatterWrap.call(scatter);

      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');

      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');

      var area = d3.svg.area()
          .x(function(d,i)  { return x(getX(d,i)) })
          .y0(function(d) {
              return y(d.display.y0)
          })
          .y1(function(d) {
              return y(d.display.y + d.display.y0)
          })
          .interpolate(interpolate);

      var zeroArea = d3.svg.area()
          .x(function(d,i)  { return x(getX(d,i)) })
          .y0(function(d) { return y(d.display.y0) })
          .y1(function(d) { return y(d.display.y0) });


      var path = g.select('.nv-areaWrap').selectAll('path.nv-area')
          .data(function(d) { return d });

      path.enter().append('path').attr('class', function(d,i) { return 'nv-area nv-area-' + i })
          .attr('d', function(d,i){
            return zeroArea(d.values, d.seriesIndex);
          })
          .on('mouseover', function(d,i) {
            d3.select(this).classed('hover', true);
            dispatch.areaMouseover({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.areaMouseout({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })
          .on('click', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.areaClick({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })

      path.exit().remove();

      path
          .style('fill', function(d,i){
            return d.color || color(d, d.seriesIndex)
          })
          .style('stroke', function(d,i){ return d.color || color(d, d.seriesIndex) });
      path.transition()
          .attr('d', function(d,i) {
            return area(d.values,i)
          });



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      scatter.dispatch.on('elementMouseover.area', function(e) {
        g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', true);
      });
      scatter.dispatch.on('elementMouseout.area', function(e) {
        g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', false);
      });

      //============================================================
      //Special offset functions
      chart.d3_stackedOffset_stackPercent = function(stackData) {
          var n = stackData.length,    //How many series
          m = stackData[0].length,     //how many points per series
          k = 1 / n,
           i,
           j,
           o,
           y0 = [];

          for (j = 0; j < m; ++j) { //Looping through all points
            for (i = 0, o = 0; i < dataRaw.length; i++)  //looping through series'
                o += getY(dataRaw[i].values[j])   //total value of all points at a certian point in time.

            if (o) for (i = 0; i < n; i++)
               stackData[i][j][1] /= o;
            else
              for (i = 0; i < n; i++)
               stackData[i][j][1] = k;
          }
          for (j = 0; j < m; ++j) y0[j] = 0;
          return y0;
      };

    });


    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementClick.area', function(e) {
    dispatch.areaClick(e);
  })
  scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
        dispatch.tooltipShow(e);
  });
  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
  });

  //============================================================

  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.scatter = scatter;

  d3.rebind(chart, scatter, 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange',
    'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'useVoronoi','clipRadius','highlightPoint','clearHighlights');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.offset = function(_) {
    if (!arguments.length) return offset;
    offset = _;
    return chart;
  };

  chart.order = function(_) {
    if (!arguments.length) return order;
    order = _;
    return chart;
  };

  //shortcut for offset + order
  chart.style = function(_) {
    if (!arguments.length) return style;
    style = _;

    switch (style) {
      case 'stack':
        chart.offset('zero');
        chart.order('default');
        break;
      case 'stream':
        chart.offset('wiggle');
        chart.order('inside-out');
        break;
      case 'stream-center':
          chart.offset('silhouette');
          chart.order('inside-out');
          break;
      case 'expand':
        chart.offset('expand');
        chart.order('default');
        break;
      case 'stack_percent':
        chart.offset(chart.d3_stackedOffset_stackPercent);
        chart.order('default');
        break;
    }

    return chart;
  };

  chart.interpolate = function(_) {
	    if (!arguments.length) return interpolate;
	    interpolate = _;
	    return chart;
  };
  //============================================================


  return chart;
}

nv.models.stackedAreaChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var stacked = nv.models.stackedArea()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 25, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor() // a function that takes in d, i and returns color
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , useInteractiveGuideline = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' on ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , yAxisTickFormat = d3.format(',.2f')
    , state = { style: stacked.style() }
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = 250
    , cData = ['Stacked','Stream','Expanded']
    , controlLabels = {}
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(stacked.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(stacked.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = stacked.xScale();
      y = stacked.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-stackedAreaChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedAreaChart').append('g');
      var g = wrap.select('g');

      gEnter.append("rect").style("opacity",0);
      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-stackedWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');
      gEnter.append('g').attr('class', 'nv-interactive');

      g.select("rect").attr("width",availableWidth).attr("height",availableHeight);
      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        var legendWidth = (showControls) ? availableWidth - controlWidth : availableWidth;
        legend
          .width(legendWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (availableWidth-legendWidth) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          {
            key: controlLabels.stacked || 'Stacked',
            metaKey: 'Stacked',
            disabled: stacked.style() != 'stack',
            style: 'stack'
          },
          {
            key: controlLabels.stream || 'Stream',
            metaKey: 'Stream',
            disabled: stacked.style() != 'stream',
            style: 'stream'
          },
          {
            key: controlLabels.expanded || 'Expanded',
            metaKey: 'Expanded',
            disabled: stacked.style() != 'expand',
            style: 'expand'
          },
          {
            key: controlLabels.stack_percent || 'Stack %',
            metaKey: 'Stack_Percent',
            disabled: stacked.style() != 'stack_percent',
            style: 'stack_percent'
          }
        ];

        controlWidth = (cData.length/3) * 260;

        controlsData = controlsData.filter(function(d) {
          return cData.indexOf(d.metaKey) !== -1;
        })

        controls
          .width( controlWidth )
          .color(['#444', '#444', '#444']);

        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .call(controls);


        if ( margin.top != Math.max(controls.height(), legend.height()) ) {
          margin.top = Math.max(controls.height(), legend.height());
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }


        g.select('.nv-controlsWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
           .width(availableWidth)
           .height(availableHeight)
           .margin({left: margin.left, top: margin.top})
           .svgContainer(container)
           .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }

      stacked
        .width(availableWidth)
        .height(availableHeight)

      var stackedWrap = g.select('.nv-stackedWrap')
          .datum(data);

      stackedWrap.transition().call(stacked);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .ticks( availableWidth / 100 )
          .tickSize( -availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + availableHeight + ')');

        g.select('.nv-x.nv-axis')
          .transition().duration(0)
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks(stacked.offset() == 'wiggle' ? 0 : availableHeight / 36)
          .tickSize(-availableWidth, 0)
          .setTickFormat( (stacked.style() == 'expand' || stacked.style() == 'stack_percent')
                ? d3.format('%') : yAxisTickFormat);

        g.select('.nv-y.nv-axis')
          .transition().duration(0)
            .call(yAxis);
      }

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      stacked.dispatch.on('areaClick.toggle', function(e) {
        if (data.filter(function(d) { return !d.disabled }).length === 1)
          data.forEach(function(d) {
            d.disabled = false;
          });
        else
          data.forEach(function(d,i) {
            d.disabled = (i != e.seriesIndex);
          });

        state.disabled = data.map(function(d) { return !!d.disabled });
        dispatch.stateChange(state);

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;

        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        stacked.style(d.style);


        state.style = stacked.style();
        dispatch.stateChange(state);

        chart.update();
      });


      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          stacked.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];
          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              stacked.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));

              //If we are in 'expand' mode, use the stacked percent value instead of raw value.
              var tooltipValue = (stacked.style() == 'expand') ? point.display.y : chart.y()(point,pointIndex);
              allData.push({
                  key: series.key,
                  value: tooltipValue,
                  color: color(series,series.seriesIndex),
                  stackedValue: point.display
              });
          });

          allData.reverse();

          //Highlight the tooltip entry based on which stack the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var yDistMax = Infinity, indexToHighlight = null;
            allData.forEach(function(series,i) {

               //To handle situation where the stacked area chart is negative, we need to use absolute values
               //when checking if the mouse Y value is within the stack area.
               yValue = Math.abs(yValue);
               var stackedY0 = Math.abs(series.stackedValue.y0);
               var stackedY = Math.abs(series.stackedValue.y);
               if ( yValue >= stackedY0 && yValue <= (stackedY + stackedY0))
               {
                  indexToHighlight = i;
                  return;
               }
            });
            if (indexToHighlight != null)
               allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex));

          //If we are in 'expand' mode, force the format to be a percentage.
          var valueFormatter = (stacked.style() == 'expand') ?
               function(d,i) {return d3.format(".1%")(d);} :
               function(d,i) {return yAxis.tickFormat()(d); };
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(valueFormatter)
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          stacked.clearHighlights();
      });


      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.style !== 'undefined') {
          stacked.style(e.style);
        }

        chart.update();
      });

    });


    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  stacked.dispatch.on('tooltipShow', function(e) {
    //disable tooltips when value ~= 0
    //// TODO: consider removing points from voronoi that have 0 value instead of this hack
    /*
    if (!Math.round(stacked.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
      setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
      return false;
    }
   */

    e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
    dispatch.tooltipShow(e);
  });

  stacked.dispatch.on('tooltipHide', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.stacked = stacked;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, stacked, 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'interactive', 'useVoronoi', 'offset', 'order', 'style', 'clipEdge', 'forceX', 'forceY', 'forceSize', 'interpolate');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    stacked.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  chart.controlsData = function(_) {
    if (!arguments.length) return cData;
    cData = _;
    return chart;
  };

  chart.controlLabels = function(_) {
    if (!arguments.length) return controlLabels;
    if (typeof _ !== 'object') return controlLabels;
    controlLabels = _;
    return chart;
  };

  yAxis.setTickFormat = yAxis.tickFormat;

  yAxis.tickFormat = function(_) {
    if (!arguments.length) return yAxisTickFormat;
    yAxisTickFormat = _;
    return yAxis;
  };


  //============================================================

  return chart;
}
})();