/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartSpec.js
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

var BarChart = require('../../../lib/businessTier/graph/barChart.js');
var assert = require('assert');

var socketMock=function(){
    this.p1=null;
    this.p2=null;
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
    this.attachObject=function(p1, p2){
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
    this.p1 = '';
    this.p2 = '';

    this.graphChanged=function(params) {
        this.p1 = params.eventType;
        this.p2 = params.params;
    };
};

describe('BarChart', function() {
    it('returns 361 when there are no params', function() {
        assert.strictEqual(new BarChart().hasOwnProperty('_dataBarChart'),false);
    });

    it('returns 362 when there is no valid graphsocket in params', function() {
        assert.strictEqual(new BarChart({is: 1}, {_page: 'dssada'}, {}).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns 393 when page is not valid', function() {
        assert.strictEqual(new BarChart({is: 1}, {}, {_namespace:'bababa'}).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns null if it does not create a BarChartModel', function() {
        assert.strictEqual(new BarChart({is: 1}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns a correct BarChart', function() {
        assert.strictEqual(new BarChart({ID: 'dada'}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),true);
    });

    describe('#getFlowByID', function() {
        it('return 262 - no ID in flows', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(barChart.getFlowByID('fl1'),262);
        });
        it('return correct flow', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            barChart.createBarChartFlow({ ID:'flow2', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.deepEqual(barChart.getFlowByID('flow2')._dataBarChartFlow._ID, 'flow2');
        });
    });

    describe('#createBarChartFlow', function() {
        it('return 212 on creation of flow', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(barChart.createBarChartFlow(),212);
        });
        it('return correct object', function() {
            var mock = new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            var bc=barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura', flowColor: '#EEEEEE'});
            assert.strictEqual(bc.hasOwnProperty('_dataBarChartFlow'),true);
            assert.strictEqual(mock.p1,'insertFlow');
            assert.strictEqual(mock.p2.properties.ID, 'flow1');
            assert.strictEqual(mock.p2.properties.name, 'grafico tempo-temperatura');
            assert.strictEqual(mock.p2.properties.flowColor, '#EEEEEE');
        });
    });

    describe('#deleteFlow', function() {
        it('return 263 - ID is not a string', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(barChart.deleteFlow(34),263);
        });
        it('return 263 - no ID in flows', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(barChart.deleteFlow('flow123'),263);
        });
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(barChart.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2.ID, 'flow1');
        });
    });

    describe('#deleteAllFlows', function() {
        it('deletes all flows and sends right message', function() {
            var mock = new socketMockHistory();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            barChart.createBarChartFlow({ ID:'flow2', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            barChart.deleteAllFlows();
            assert.strictEqual(mock.p1[mock.p1.length-2],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-2], {ID: 'flow1'});
            assert.strictEqual(mock.p1[mock.p1.length-1],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-1], {ID: 'flow2'});
            assert.strictEqual(barChart._flows.length,0);
        });
    });

    describe('#updateRecord', function() {
        it('returned true - correctly updated', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'}, [{'tempo': 1, 'temperatura': 25}]);
            assert.strictEqual(barChart.updateRecord('flow1',0,{'tempo': 3, 'temperatura': 7}),true);
        });
    });

    describe('#updateProperties', function() {
        it('no update - invalid params', function() {
            var mock = new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mock.p1=null;
            mock.p2=null;
            barChart.updateProperties();
            assert.strictEqual(mock.p1,null);
            assert.strictEqual(mock.p2,null);
        });
        it('updated properties', function() {
            var pMock = new pageMock();
            var mock = new socketMock();
            var barChart=new BarChart({ID: 'dada'}, pMock, mock);
            barChart.updateProperties({title: 'graph one', height: 200, width: 350, enableLegend: true, backgroundColor: '#EEEEEE', legendOnPoint: true, sortable: true, grid: true, barOrientation: 'H', groupingControl:true});
            assert.strictEqual(mock.p1,'updateGraphProp');
            assert.deepEqual(mock.p2,{ID: 'dada', 'title':'graph one','height':200,'width':350,'enableLegend':true,'backgroundColor':'#EEEEEE','grid':true,'legendOnPoint':true, 'groupingControl':true,'sortable':true,'barOrientation':'H'});
            assert.strictEqual(pMock.p1,'updateGraph');
            assert.deepEqual(pMock.p2, {ID: 'dada', title: 'graph one', height: 200, width: 350, enableLegend: true, backgroundColor: '#EEEEEE', legendOnPoint: true, sortable: true, grid: true, barOrientation: 'H', groupingControl:true});
        });
    });

    describe('#getProperties', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.deepEqual(barChart.getProperties(),{'ID':'dada','title':'','type':'BarChart','height':400,'width':500,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'grid':false,'xAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'yAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'backgroundColor':'#FFFFFF','legendOnPoint':false,'sortable':false,'groupingControl':false,'barOrientation':'V', 'headers':[]});
        });
    });

    describe('#getConfigJSON', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'}, [{'tempo': 1, 'temperatura': 25}]);
            var ID = barChart.getFlowByID('flow1')._dataBarChartFlow.getRecordByIndex(0).norrisRecordID;
            assert.deepEqual(barChart.getConfigJSON(),{'properties':{'ID':'dada','title':'','type':'BarChart','sortable': false,'height':400,'width':500,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'grid':false,'barOrientation':'V','groupingControl':false,'headers':[],'xAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'yAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'backgroundColor':'#FFFFFF','legendOnPoint':false,'flows':[{'ID':'flow1','name':'grafico tempo-temperatura','filters':null,'indexKey':'tempo','valueKey':'temperatura','indexFormat':null,'valueFormat':null,'flowColor':null, 'sortable': false}]},'data':[{'ID':'flow1','records':[{norrisRecordID: ID, value: [1,25]}]}]});
        });
    });
});