/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartFlowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-03   Samuele Zanella    Initial code
* =========================================================
*/

var BarChartFlow = require('../../../lib/businessTier/flow/barChartFlow.js');
var assert = require('assert');

describe('BarChartFlow', function() {
    var socketMock=function(){
        this.p1=null;
        this.p2=null;
        this._namespace='flow1';
        this.sendMessage=function(p1, p2){
            this.p1=p1;
            this.p2=p2;
        };
    };
    it('returns null when there are no params', function() {
        assert.strictEqual((new BarChartFlow()).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new BarChartFlow({ID: 'flow1'}, 3, [{index: 1, value: 2}])).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new BarChartFlow(2, new socketMock(), [{index: 1, value: 2}])).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('calls the parent constructor with the specified params', function() {
        var flow1=new BarChartFlow({ID: 'flow1'}, new socketMock(), []);
        assert.strictEqual(flow1._dataBarChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#getReplaceDataJSON', function() {
        it('returns the correct JSON', function() {            
            var flow1=new BarChartFlow({ID: 'flow1', indexKey: 'index', valueKey: 'value'}, new socketMock(), [{index: 1, value: 3}, {index: 2, value: 5}]);
            console.log('printing JSON');
            console.dir(flow1.getReplaceDataJSON());
            var expJSON = {
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {
                        norrisRecordID: flow1._dataBarChartFlow._records[0].norrisRecordID,
                        value: [1, 3]
                    },
                    {
                        norrisRecordID: flow1._dataBarChartFlow._records[1].norrisRecordID,
                        value: [2, 5]
                    }
                ]
            };
            assert.deepEqual(flow1.getReplaceDataJSON(), expJSON);
        });
    });
});