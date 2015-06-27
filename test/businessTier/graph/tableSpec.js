/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableSpec.js
* Module : UnitTest
* Location : /test/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-06   Filippo Rampado    Initial code
* =========================================================
*/

var Table = require('../../../lib/businessTier/graph/table.js');
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

var pageMock=function(){
    this.p1=null;
    this._page='flow1';
    this.graphChanged=function(p1){
        this.p1=p1;
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

describe('Table', function() {
    it('returns 391 when there are no params', function() {
        assert.strictEqual((new Table()).hasOwnProperty('_dataTable'),false);
    });

    it('returns 392 when there is no valid graphsocket in params', function() {
        assert.strictEqual((new Table({is: 1}, {_page: 'dssada'}, {})).hasOwnProperty('_dataTable'),false);
    });

    it('returns 393 when page is not valid', function() {
        var mock=new socketMock();
        assert.strictEqual((new Table({is: 1}, {}, mock)).hasOwnProperty('_dataTable'),false);
    });

    it('returns 342 - not create a TableModel', function() {
        var mock=new socketMock();
        assert.strictEqual((new Table({is: 1}, {_page: 'dssada'}, mock)).hasOwnProperty('_dataTable'),false);
    });

    it('returns a correct Table', function() {
        var mock=new socketMock();
        var lc=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
        assert.strictEqual(lc.hasOwnProperty('_dataTable'),true);
    });

    describe('#getFlowByID', function() {
        it('return 292 - no ID in flows', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(table.getFlowByID('fl1'),292);
        });
        it('return correct flow', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            table.createTableFlow({ ID:'flow2', name: 'tabella', columnKeys: ['col1','col2']});
            assert.deepEqual(table.getFlowByID('flow2')._dataTableFlow._ID, 'flow2');
        });
    });

    describe('#createTableFlow', function() {
        it('return 242 on creation of flow', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(table.createTableFlow(),242);
        });
        it('return correct object', function() {
            var mock = new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            var lc=table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(lc.hasOwnProperty('_dataTableFlow'),true);
            assert.strictEqual(mock.p1,'insertFlow');
            assert.strictEqual(mock.p2.properties.ID, 'flow1');
            assert.strictEqual(mock.p2.properties.name, 'tabella');
        });
    });
    describe('#deleteFlow', function() {
        it('return 293 - ID is not a string', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(table.deleteFlow(34),293);
        });
        it('return 293 - no ID in flows', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(table.deleteFlow('flow123'),293);
        });
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(table.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2.ID, 'flow1');
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all flows and sends right message', function() {
            var mock = new socketMockHistory();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            table.createTableFlow({ ID:'flow2', name: 'tabella', columnKeys: ['col1','col2']});
            table.deleteAllFlows();
            assert.strictEqual(mock.p1[mock.p1.length-2],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-2], {ID: 'flow1'});
            assert.strictEqual(mock.p1[mock.p1.length-1],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-1], {ID: 'flow2'});
            assert.strictEqual(table._flows.length,0);
        });
    });
    describe('#addRecord', function() {
        it('returned 292 - undefined flowID', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(table.addRecord(),292);
        });
        it('returned 143 - undefined record', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(table.addRecord('flow1'),143);
        });
        it('returned correct ID - record added correctly', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.strictEqual(typeof table.addRecord('flow1',{'col1': 1, 'col2': 25}),'string');
        });
    });
    describe('#updateRecord', function() {
        it('returned error - undefined record', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(typeof table.updateRecord(),'number');
        });
        it('returned true - correctly updated', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            var recID=table.addRecord('flow1',{'col1': 1, 'col2': 25});
            assert.strictEqual(table.updateRecord('flow1',recID,{'col1': 4, 'col2': 25}),true);
        });
    });
    describe('#updateProperties', function() {
        it('no update - invalid params', function() {
            var mock = new socketMock();
            var table=new Table({ID: 'dada'}, {_page: 'dssada'}, mock);
            mock.p1=null;
            mock.p2=null;
            table.updateProperties();
            assert.strictEqual(mock.p1,null);
            assert.strictEqual(mock.p2,null);
        });
        it('updated properties', function() {
            var mock = new socketMock();
            var pMock = new pageMock();
            var table=new Table({ID: 'dada'}, pMock, mock);
            table.updateProperties({title: 'graph one', height: 200, width: 350, sortable: true, addRowOn: 'top', headers: ['column1','h2'], sort:{column: ['col1'], ordering: ['ASC']}});
            assert.strictEqual(mock.p1,'updateGraphProp');
            assert.deepEqual(mock.p2,{ID: 'dada', title: 'graph one', height: 200, width: 350, sortable: true, addRowOn: 'top', headers: ['column1','h2'], sort:{column: ['col1'], ordering: ['ASC']}});
        });
    });
    describe('#getProperties', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'table1', title: 'graph one', height: 200, width: 350, sortable: true, addRowOn: 'top', headers: ['column1','h2'], sort:{column: ['col1'], ordering: ['ASC']}}, new pageMock(), mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            assert.deepEqual(table.getProperties(),{'ID':'table1','title':'graph one','type':'Table','height':200,'width':350,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'sortable':true,'sort':{column: ['col1'], ordering: ['ASC']},'maxItemsPage':10,'headers':['column1','h2'],'appearance':{'horizontalGrid': {'color': '#000000','width': 1},'verticalGrid': {'color': '#000000','width': 1},'rowEven':{'textColor':['#000000','#000000'],'backgroundColor':['#FFFFFF','#FFFFFF']},'rowOdd':{'textColor':['#000000','#000000'],'backgroundColor':['#FFFFFF','#FFFFFF']},'headers':{'textColor':['#000000','#000000'],'backgroundColor':['#FFFFFF','#FFFFFF']}},'addRowOn':'top'});
        });
    });
    describe('#getConfigJSON', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var table=new Table({ID: 'dada'}, new pageMock(), mock);
            table.createTableFlow({ ID:'flow1', name: 'tabella', columnKeys: ['col1','col2']});
            var recID=table.addRecord('flow1',{'col1': 1, 'col2': 25, appearance: [{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]});
            assert.deepEqual(table.getConfigJSON(),{'properties':{'ID':'dada','title':'','type':'Table','height':400,'width':500,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'sortable':false,'sort':null,'maxItemsPage':10,'headers':[],'appearance':{'horizontalGrid': {'color': '#000000','width': 1},'verticalGrid': {'color': '#000000','width': 1},'rowEven':{'textColor':[],'backgroundColor':[]},'rowOdd':{'textColor':[],'backgroundColor':[]},'headers':{'textColor':[],'backgroundColor':[]}},'addRowOn':'bottom','flows':[{'ID':'flow1','name':'tabella','filters':null,'columnKeys':['col1','col2'],'columnFormats':null,'maxItems':50,'maxItemsSaved':500}]},'data':[{'ID':'flow1','records':[{norrisRecordID: recID, value: [1,25], appearance: [{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]}]}]});
        });
    });

});