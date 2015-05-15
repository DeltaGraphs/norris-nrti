/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/page
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-11   Filippo Rampado    Initial code
* =========================================================
*/

var PageModel = require('../../../lib/dataTier/page/pageModel.js');
var BarChartModel = require('../../../lib/dataTier/graph/barChartModel.js');
var assert = require('assert');

describe('PageModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new PageModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new PageModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new PageModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('set default values to property not specified', function() {
        var page1=new PageModel({ID:'page1'});
        assert.strictEqual(page1._ID, 'page1');
        assert.strictEqual(page1._name, '');
        assert.strictEqual(page1._description, '');
        assert.strictEqual(page1._graphsPerRow, 1);
        assert.strictEqual(page1._graphsPerCol, -1);
        assert.strictEqual(page1._graphs.length, 0);

    });

    it('set default values to wrong properties', function() {
        var page1=new PageModel({
            ID: 'page1',
            name: 1,
            description: 1,
            graphsPerRow: 'a',
            graphsPerCol: 'b',
        });
        assert.strictEqual(page1._ID, 'page1');
        assert.strictEqual(page1._name, '');
        assert.strictEqual(page1._description, '');
        assert.strictEqual(page1._graphsPerRow, 1);
        assert.strictEqual(page1._graphsPerCol, -1);
        assert.strictEqual(page1._graphs.length, 0);
    });

    it('set param values to properties', function() {
        var page1=new PageModel({
            ID: 'page1',
            name: 'page one',
            description: 'page with many graphs',
            graphsPerRow: 2,
            graphsPerCol: 3,
        });
        assert.strictEqual(page1._ID, 'page1');
        assert.strictEqual(page1._name, 'page one');
        assert.strictEqual(page1._description, 'page with many graphs');
        assert.strictEqual(page1._graphsPerRow, 2);
        assert.strictEqual(page1._graphsPerCol, 3);
        assert.strictEqual(page1._graphs.length, 0);
    });
    
    describe('#getProperties', function() {
        it('returns the JSON with the properties', function() {
            var properties={
                ID: 'page1',
                name: 'page one',
                description: 'page with many graphs',
                graphsPerRow: 2,
                graphsPerCol: 3,
            };
            var page1=new PageModel(properties);
            var prop=page1.getProperties();
            assert.strictEqual(prop.ID, 'page1');
            assert.strictEqual(prop.name, 'page one');
            assert.strictEqual(prop.description, 'page with many graphs');
            assert.strictEqual(prop.graphsPerRow, 2);
            assert.strictEqual(prop.graphsPerCol, 3);
        });
    });

    describe('#updateProperties', function() {
        it('does nothing if there are no params', function() {
            var page1=new PageModel({ID: 'page1', name: 'page one'});
            page1.updateProperties();
            assert.strictEqual(page1._ID, 'page1');
            assert.strictEqual(page1._title, 'page one');
        });
        it('updates the properties passed as param', function() {
            var properties={
                ID: 'page1',
                name: 'page one',
                description: 'page with many graphs',
                graphsPerRow: 2,
                graphsPerCol: 3,
            };
            var page1=new PageModel({ID: 'page1'});
            page1.updateProperties(properties);
            assert.strictEqual(page1._name, 'page one');
            assert.strictEqual(page1._description, 'page with many graphs');
            assert.strictEqual(page1._graphsPerRow, 2);
            assert.strictEqual(page1._graphsPerCol, 3);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'page1',
                name: 1,
                description: 1,
                graphsPerRow: 'a',
                graphsPerCol: 'b',
            };
            var page1=new PageModel({ID: 'page1'});
            page1.updateProperties(properties);
            assert.strictEqual(page1._name, '');
            assert.strictEqual(page1._description, '');
            assert.strictEqual(page1._graphsPerRow, 1);
            assert.strictEqual(page1._graphsPerCol, -1);
            assert.strictEqual(page1._graphs.length, 0);
        });
    });

    var graph1=new BarChartModel({ID: 'graph1'});
    console.dir('GRAPH1 HEIGHT ' + graph1.getProperties().height);
    var graph2=new BarChartModel({ID: 'graph2'});

    describe('#addGraph', function() {
        it('returns true and pushes the page if graph is valid', function() {
            var page1=new PageModel({ID: 'page1'});
            assert.strictEqual(page1.addGraph(graph1), true);
            assert.strictEqual(page1._graphs.length, 1);
        });
        it('returns false if graph is invalid', function() {
            var page1=new PageModel({ID: 'page1'});
            assert.strictEqual(page1.addGraph(2), 411);
        });
    });

    describe('#getData', function() {
        it('returns empty json if it has no graphs', function() {
            var page1=new PageModel({ID: 'page1'});
            assert.strictEqual(page1.getData().length, 0);
        });
       
        it('returns json with one graph', function() {
            var page1=new PageModel({ID: 'page1'});
            page1.addGraph(graph1);
            var data=page1.getData();
            assert.strictEqual(data.length, 1);
            assert.strictEqual(data[0].properties.ID, 'graph1');
        });
        it('returns json with two graphs', function() {
            var page1=new PageModel({ID: 'page1'});
            page1.addGraph(graph1);
            page1.addGraph(graph2);
            var data=page1.getData();
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].properties.ID, 'graph1');
            assert.strictEqual(data[1].properties.ID, 'graph2');
        });
    });
    
});