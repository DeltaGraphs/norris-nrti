/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartSpec.js
* Module : UnitTest
* Location : /test/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-29   Filippo Rampado    Initial code
* =========================================================
*/

var MapChart = require('../../../lib/businessTier/graph/mapChart.js');
var assert = require('assert');

var socketMock=function(){
    this.p1=null;
    this.p2=null;
    this._namespace='flow1';
    this.attachObject=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
    this.sendMessage=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
};

var socketMockHistory=function(){
    this.p1=[];
    this.p2=[];
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1.push(p1);
        this.p2.push(p2);
    };
    this.attachObject=function(p1, p2){
        this.p1.push(p1);
        this.p2.push(p2);
    };
};
var pageMock=function(){
    this._page='';
    this._p1 = '';
    this._p2 = '';

    this.graphChanged=function(params) {
        this._p1 = params.eventType;
        this._p2 = params.params;
    };
};

describe('MapChart', function() {    
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChart()).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid page in params', function() {
        assert.strictEqual((new MapChart(2, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChart(2, {_page:2}, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChart(2, {_page:2}, new socketMock())).hasOwnProperty('_dataMapChart'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
        assert.strictEqual(mp._dataMapChart._ID, 'map1');
        assert.strictEqual(mp._graphSocket._namespace, 'flow1');
    });

    describe('#createMapChartFlow', function() {
        it ('returns 232 if are passed no valid params', function(){
            var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(mp.createMapChartFlow(0), 232);
        });
        it ('adds and returns a mapChartFlow', function(){
            var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(mp.createMapChartFlow({ID: 'flow1'}).hasOwnProperty('_dataMapChartFlow'), true);
            assert.strictEqual(mp._flows[0].hasOwnProperty('_dataMapChartFlow'), true);
        });

        it('adds and returns a mapChartFlow', function() {
            var mock = new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            var lc=mapChart.createMapChartFlow({
                'ID':'flow1',
                'name': 'linea 22',
                'marker':{
                    'type': 'shape',
                    'shape': 'circle',
                    'icon': 'null',
                    'text': 'null',
                    'color' : '#000'
                },
                'trace':{
                    'type':'poly',
                    'coordinates': [[45.42946, 11.94090],[45.42941, 11.94081],[45.43054, 11.93937],[45.43131, 11.93773],[45.43268, 11.93539],[45.34719, 11.81996]],
                    'strokeColor': '#DC271C',
                    'fillColor': '#3a6d99'
                },
                'trailLength': 3,
                'latitudeKey': '1',
                'longitudeKey': '2',
                'objectKey': '0'
            });
            assert.strictEqual(lc.hasOwnProperty('_dataMapChartFlow'),true);
            assert.strictEqual(mock.p1,'insertFlow');
            assert.strictEqual(mock.p2.properties.ID, 'flow1');
            assert.strictEqual(mock.p2.properties.name, 'linea 22');
        });
    });
    describe('#getFlowByID', function() {
        it('returns 282 if there is no valid ID', function(){
            var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(mp.getFlowByID(0), 282);
        });
        it('return 282 - no ID in flows', function() {
            var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            mp.createMapChartFlow({ID: 'flow1'}).hasOwnProperty('_dataMapChartFlow');
            assert.strictEqual(mp.getFlowByID('fl1'),282);
        });
        it('return correct flow', function() {
            var mp=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            mp.createMapChartFlow({ID: 'flow1'});
            mp.createMapChartFlow({ID: 'flow2'});
            assert.strictEqual(mp.getFlowByID('flow2')._dataMapChartFlow._ID,'flow2');
        });
    });
    describe('#deleteFlow', function() {
        it('return 283 - ID is not a string', function() {
            var mock=new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createMapChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow(34),283);
        });
        it('return 283 - no ID in flows', function() {
            var mock=new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createMapChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow('flow123'),283);
        });
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createMapChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2.ID, 'flow1');
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all flows and sends right message', function() {
            var mock = new socketMockHistory();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createMapChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            mp.createMapChartFlow({ ID:'flow2', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            mp.deleteAllFlows();
            assert.strictEqual(mock.p1[mock.p1.length-2],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-2], {ID: 'flow1'});
            assert.strictEqual(mock.p1[mock.p1.length-1],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-1], {ID: 'flow2'});
            assert.strictEqual(mp._flows.length,0);
        });
    });
    describe('#addRecord', function() {
        it('returned 282 - undefined flowID', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(mapChart.addRecord(),282);
        });
        it('returned 133 - undefined record', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            assert.strictEqual(mapChart.addRecord('flow1'),133);
        });
        it('returned correct ID - record added correctly', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            assert.strictEqual(typeof mapChart.addRecord('flow1',{'lat': 1, 'long': 25}),'string');
        });
    });
    describe('#deleteRecord', function() {
        it('returned 282 - undefined flowID', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(mapChart.deleteRecord(),282);
        });
        it('returned true - correctly deleted', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            var recID=mapChart.addRecord('flow1',{'lat': 1, 'long': 25});
            assert.strictEqual(mapChart.deleteRecord('flow1',recID),true);
        });
    });
    describe('#updateRecord', function() {
        it('returned error - undefined record', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(typeof mapChart.updateRecord(),'number');
        });
        it('returned true - correctly updated', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            var recID=mapChart.addRecord('flow1',{'lat': 1, 'long': 25});
            assert.strictEqual(mapChart.updateRecord('flow1',recID,{'lat': 3, 'long': 7}),true);
        });
    });
    describe('#updateMovie', function() {
        it('returned error - undefined record', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(typeof mapChart.updateMovie(),'number');
        });
        it('returned array with recID - correctly updated', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            mapChart.addRecord('flow1',{'lat': 1, 'long': 25});
            assert.strictEqual(Array.isArray(mapChart.updateMovie('flow1',[{'lat': 3, 'long': 7}])), true);
        });
    });
    describe('#updateProperties', function() {
        it('no update - invalid params', function() {
            var mock = new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mock.p1=null;
            mock.p2=null;
            mapChart.updateProperties();
            assert.strictEqual(mock.p1,null);
            assert.strictEqual(mock.p2,null);
        });
        it('updated properties', function() {
            var mock = new socketMock();
            var pMock = new pageMock();
            var mapChart=new MapChart({ID: 'dada'}, pMock, mock);
            mapChart.updateProperties({title: 'graph one'});
            assert.strictEqual(mock.p1,'updateGraphProp');
            assert.deepEqual(mock.p2,{ID: 'dada', 'title':'graph one'});
        });
    });
    describe('#getProperties', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            assert.deepEqual(mapChart.getProperties(),{
                'ID': 'dada',
                'enableLegend': false,
                'height': 400,
                'legend': {
                    'backgroundColor': '#FFFFFF',
                    'fontColor': '#000000',
                    'position': 'NE'
                },
                'legendOnPoint': false,
                'longitude': 0,
                'latitude': 0,
                'mapHeight': 2000,
                'mapType': 'roadmap',
                'mapWidth': 3000,
                'title': '',
                'type': 'MapChart',
                'width': 500
            });
        });
    });
    describe('#getConfigJSON', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var mapChart=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mapChart.createMapChartFlow({ ID:'flow1', name: 'grafico', latitudeKey: 'lat', longitudeKey:'long'});
            var ID=mapChart.addRecord('flow1',{'lat': 1, 'long': 25});
            assert.deepEqual(mapChart.getConfigJSON(),{
                'data':[{
                    'ID':'flow1',
                    'records':[{
                        'markerID':undefined,
                        'norrisRecordID':ID,
                        'value':[1,25]
                    }]
                }],
                'properties':{
                    'ID':'dada',
                    'enableLegend':false,
                    'flows':[{
                        'ID':'flow1',
                        'filters':null,
                        'latitudeFormat':'coordinates',
                        'latitudeKey':'lat',
                        'longitudeFormat':'coordinates',
                        'longitudeKey':'long',
                        'marker':{
                            'shape':'circle',
                            'type':'shape',
                        },
                        'maxItemsSaved':500,
                        'name':'grafico',
                        'objectKey':null,
                        'trace':{
                            'coordinates':[],
                            'type':'none'
                        },
                        'trailLength':3,
                    }],
                    'height':400,
                    'latitude':0,
                    'legend':{
                        'backgroundColor':'#FFFFFF',
                        'fontColor':'#000000',
                        'position':'NE',
                    },
                    'legendOnPoint':false,
                    'longitude':0,
                    'mapHeight':2000,
                    'mapType':'roadmap',
                    'mapWidth':3000,
                    'title':'',
                    'type':'MapChart',
                    'width':500
                }
            });
        });
    });

});