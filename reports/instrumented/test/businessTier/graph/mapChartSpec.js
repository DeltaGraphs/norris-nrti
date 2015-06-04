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

describe('MapChart', function() {
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
            assert.strictEqual(mock.p2.ID, 'flow1');
            assert.strictEqual(mock.p2.name, 'grafico tempo-temperatura');
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
            mp.createMapChartFlow({ID: 'flow1'}).hasOwnProperty('_dataMapChartFlow');
            mp.createMapChartFlow({ID: 'flow2'}).hasOwnProperty('_dataMapChartFlow');
            assert.strictEqual(mp.getFlowByID('flow2')._dataMapChartFlow._ID,'flow2');
        });
    });
    describe('#deleteFlow', function() {
        it('return 283 - ID is not a string', function() {
            var mock=new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createLineChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow(34),283);
        });
        it('return 283 - no ID in flows', function() {
            var mock=new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createLineChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow('flow123'),283);
        });
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createLineChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            assert.strictEqual(mp.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2.ID, 'flow1');
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all flows and sends right message', function() {
            var mock = new socketMockHistory();
            var mp=new MapChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mp.createLineChartFlow({ ID:'flow1', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            mp.createLineChartFlow({ ID:'flow2', name: 'linea 22', 'latitudeKey': '1', 'longitudeKey': '2', 'objectKey': '0'});
            mp.deleteAllFlows();
            assert.strictEqual(mock.p1[mock.p1.length-2],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-2], {ID: 'flow1'});
            assert.strictEqual(mock.p1[mock.p1.length-1],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-1], {ID: 'flow2'});
            assert.strictEqual(mp._flows.length,0);
        });
    });
});