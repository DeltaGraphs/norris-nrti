/*jshint node: true */
'use strict';

/*
* Name :  Page.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
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

angular.module('app')
.factory('PageFactory', ['LineChartFactory', 'BarChartFactory', 'MapChartFactory', 'TableFactory', function(LineChartFactory, BarChartFactory, MapChartFactory, TableFactory){

    function Page(info){
        this._graphsList = [];
        this._name = 'Titolo di default';
        this._description = '';
        this._graphsPerRow = 1;
        this._graphsPerCol = 5;
        this._url = null;

        if (info !== undefined) {
            if (info.properties.name !== undefined) {
                this._name = info.properties.name;
            }
            if (info.properties.description !== undefined) {
                this._description = info.properties.description;
            }
            if (info.properties.graphsPerRow !== undefined) {
                this._graphsPerRow = info.properties.graphsPerRow;
            }
            if (info.properties.graphsPerCol !== undefined) {
                this._graphsPerCol = info.properties.graphsPerCol;
            }
            if (info.properties.socketURL !== undefined) {
                this._url = info.properties.socketURL;
            }
            if (info.data !== undefined) {
                for (var i=0; i<info.data.length; i++){
                    this.addGraph(info.data[i]);
                }
            }
        }
    }

    Page.prototype = {

        constructor : Page,

        updateParameters: function(info){
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
        },
        initializeData: function(data) {
            if (data !== undefined) {
                for (var i=0; i<data.length; i++) {
                    this.addGraph(data[i]);
                }
            }
        },
        addGraph: function(graph){
            if (graph !== undefined) {
                var count = 0;
                for (var j=0; j<this._graphsList.length; j++) {
                    if (this._graphsList[j].id === graph.ID){
                        count++;
                    }
                }
                if (count === 0){
                    var newGraph;
                    switch (graph.type) {
                        case 'LineChart': 
                            newGraph = LineChartFactory.build(graph);
                            this._graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'BarChart': 
                            newGraph = BarChartFactory.build(graph);
                            this._graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'MapChart': 
                            newGraph = MapChartFactory.build(graph);
                            this._graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'Table': 
                            newGraph = TableFactory.build(graph);
                            this._graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                    }
                }
            // error
            }
            // error
        },

        getGraphsList: function(){
            return this._graphsList;
        },
        getName: function(){
            return this._name;
        },
        getDescription: function(){
            return this._description;
        },
        getGraphsPerRow: function(){
            return  this._graphsPerRow;
        },
        getGraphsPerCol: function(){
            return  this._graphsPerCol;
        },
        getUrl: function(){
            return this._url;
        }
    };

    function PageFactory() {}

    PageFactory.build = function(info) {
        return new Page(info);
    };

    return PageFactory;
}]);