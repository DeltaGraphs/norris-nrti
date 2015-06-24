/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageSpec.js
* Module : UnitTest
* Location : /test/businessTier/page
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-23   Samuele Zanella    Initial code
* =========================================================
*/

var Page = require('../../../lib/businessTier/page/page.js');
var PageModel = require('../../../lib/dataTier/page/pageModel.js');
var MapChart = require('../../../lib/businessTier/graph/mapChart.js');
var LineChart = require('../../../lib/businessTier/graph/lineChart.js');
var BarChart = require('../../../lib/businessTier/graph/barChart.js');
var Table = require('../../../lib/businessTier/graph/table.js');
var assert = require('assert');

var Norris = require('../../../lib/businessTier/norris/norris.js');
var Page = require('../../../lib/businessTier/page/page.js');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
io.listen(5000);
var ioclient = require('socket.io-client');
var nor = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
var page1 = nor.createPage({ID: 'page1'});

function ParamMock() {
    this._app = null;
    this._io = null;
    this._networkHandler = null;
    this._norrisNamespace = 'norris';
    this._pageListSocket = null;
    this._pageList = null;
}

ParamMock.prototype.createSocket = function(param) {
    param = null;
    return this;
};

ParamMock.prototype.attachObject = function(param1, param2) {
    param1 = param2;
    return null;
};

ParamMock.prototype.addPageToRouting = function(param1, param2) {
    return param1 + ' ' + param2;
};

ParamMock.prototype.sendMessage = function(param1, param2) {
    return param1 + ' ' + param2;
};

ParamMock.prototype.pageChanged = function(param1) {
    return param1;
};

describe('Page', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new Page()).hasOwnProperty('_page'), false);
    });

    it('returns null when there is no valid params object in params', function() {
        assert.strictEqual((new Page(1, new ParamMock(), new ParamMock())).hasOwnProperty('_name'), false);
    });

    it('returns null if the PageModel is not created', function() {
        assert.strictEqual((new Page({ID:' '}, new ParamMock(), new ParamMock())).hasOwnProperty('_name'), false);
    });

    it('set param values to properties', function() {
        var page1=new Page({ID:'page1'}, new ParamMock(), new ParamMock());
        assert.deepEqual(page1._page, new PageModel({ID:'page1'}));
        assert.deepEqual(page1._networkHandler, new ParamMock());
        assert.deepEqual(page1._norris, new ParamMock());
        assert.strictEqual(page1._pageNamespace, 'norris/page1');
        assert.deepEqual(page1._pageSocket, new ParamMock());
        assert.strictEqual(page1._graphs.length, 0);
    });

    describe('#getConfigJSON', function() {
        it('returns the JSON to send to clients when they connect', function() {
            var page2 = nor.createPage({ID:'page2', name:'page2', description:'page two', graphsPerRow: 3, graphsPerCol: 5});
            page2.createMapChart({ID:'map1'});
            page2.createLineChart({ID:'line1'});
            var expectedJSON = {
                properties: {
                    ID: 'page2',
                    name: 'page2',
                    description: 'page two',
                    graphsPerRow: 3,
                    graphsPerCol: 5
                },
                data: [
                    {
                        ID: 'map1',
                        title: '',
                        socketURL: 'http://0.0.0.0:5000/norris/page2/map1'
                    },
                    {
                        ID: 'line1',
                        title: '',
                        socketURL: 'http://0.0.0.0:5000/norris/page2/line1'
                    }
                ]
            };
            assert.deepEqual(page2.getConfigJSON(), expectedJSON);
        });
    });

    describe('#updateProperties', function() {
        it('does nothing when passed no valid parameter', function() {
            var page1=new Page({ID:'page1'}, nor._networkHandler, nor);
            page1.updateProperties();
            assert.deepEqual(page1._page, new PageModel({ID:'page1'}));
        });
        it('updates the properties to the passed parameters', function() {
            var page1=new Page({ID:'page1'}, nor._networkHandler, nor);
            var pSocketURL = 'http://0.0.0.0:5000/page1';
            var nSocketURL = 'http://0.0.0.0:5000/norris';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var params = {
                name:'p1', 
                description:'ppp', 
                graphsPerRow: 5, 
                graphsPerCol: 7
            };
            page1.updateProperties(params);
            var client1 = ioclient.connect(pSocketURL, options);
            var client2 = ioclient.connect(nSocketURL, options);
            client1.on('updatePageProp', function(message) {
                assert.strictEqual(message, params);
            });
            client2.on('updatePage', function(message) {
                assert.strictEqual(message, params);
            });
            assert.deepEqual(page1._page._ID, 'page1');
            assert.deepEqual(page1._page._name, 'p1');
            assert.deepEqual(page1._page._description, 'ppp');
            assert.deepEqual(page1._page._graphsPerRow, 5);
            assert.deepEqual(page1._page._graphsPerCol, 7);
        });
    });

    describe('#graphChanged', function() {
        it('sends the message over the socket', function() {
            var page1=new Page({ID:'page1'}, nor._networkHandler, nor);
            var pSocketURL = 'http://0.0.0.0:5000/page1';
            var nSocketURL = 'http://0.0.0.0:5000/norris';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var params = {
                eventType: 'updateGraph',
                params: {
                    name: 'newName'
                }
            };
            page1.graphChanged(params);
            var client1 = ioclient.connect(pSocketURL, options);
            var client2 = ioclient.connect(nSocketURL, options);
            client1.on('updateGraph', function(message) {
                assert.strictEqual(message, params.params);
            });
            client2.on('updateGraph', function(message) {
                assert.strictEqual(message, params.params);
            });
        });
    });

    describe('#createMapChart', function() {
        it('returns null if no parameter is passed', function() {
            assert.deepEqual(page1.createMapChart(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            assert.deepEqual(page1.createMapChart({p: 'abvs'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            page1.createMapChart({ID: 'm1'});
            assert.deepEqual(page1.createMapChart({ID: 'm1'}), null);
        });

        it('returns null if the mapChartModel is not created', function() {
            assert.deepEqual(page1.createMapChart({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor2 = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var page4 = nor2.createPage({ID: 'page4'});
            var socketURL = 'http://0.0.0.0:5000/page4';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var expJSON = {
                ID: 'page4',
                graph: {
                    ID: 'map1',
                    title: '',
                    type: 'MapChart',
                    socketURL: '/page4/map1'
                }
            };
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            assert.deepEqual(page4.createMapChart({ID: 'map1'}) instanceof MapChart, true);
            assert.strictEqual(nor2._pages[0]._graphs.length, 1);
            assert.strictEqual(nor2._pageList._pages[0]._graphs.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertGraph', function(message) {
                assert.strictEqual(message, expJSON);
            });
        });
    });

    describe('#createLineChart', function() {
        it('returns null if no parameter is passed', function() {
            assert.deepEqual(page1.createLineChart(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            assert.deepEqual(page1.createLineChart({p: 'abvs'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            page1.createMapChart({ID: 'l1'});
            assert.deepEqual(page1.createLineChart({ID: 'l1'}), null);
        });

        it('returns null if the lineChartModel is not created', function() {
            assert.deepEqual(page1.createLineChart({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor3 = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var page3 = nor3.createPage({ID: 'page3'});
            var socketURL = 'http://0.0.0.0:5000/page3';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var expJSON = {
                ID: 'page3',
                graph: {
                    ID: 'line1',
                    title: '',
                    type: 'LineChart',
                    socketURL: '/page3/line1'
                }
            };
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            assert.deepEqual(page3.createLineChart({ID: 'line1'}) instanceof LineChart, true);
            assert.strictEqual(nor3._pages[0]._graphs.length, 1);
            assert.strictEqual(nor3._pageList._pages[0]._graphs.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertGraph', function(message) {
                assert.strictEqual(message, expJSON);
            });
        });
    });

    describe('#createBarChart', function() {
        it('returns null if no parameter is passed', function() {
            assert.deepEqual(page1.createBarChart(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            assert.deepEqual(page1.createBarChart({p: 'abvs'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            page1.createMapChart({ID: 'l1'});
            assert.deepEqual(page1.createBarChart({ID: 'l1'}), null);
        });

        it('returns null if the barChartModel is not created', function() {
            assert.deepEqual(page1.createBarChart({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor4 = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var page4 = nor4.createPage({ID: 'page4'});
            var socketURL = 'http://0.0.0.0:5000/page3';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var expJSON = {
                ID: 'page4',
                graph: {
                    ID: 'bar1',
                    title: '',
                    type: 'BarChart',
                    socketURL: '/page4/bar1'
                }
            };
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            assert.deepEqual(page4.createBarChart({ID: 'bar1'}) instanceof BarChart, true);
            assert.strictEqual(nor4._pages[0]._graphs.length, 1);
            assert.strictEqual(nor4._pageList._pages[0]._graphs.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertGraph', function(message) {
                assert.strictEqual(message, expJSON);
            });
        });
    });

    describe('#createTable', function() {
        it('returns null if no parameter is passed', function() {
            assert.deepEqual(page1.createTable(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            assert.deepEqual(page1.createTable({p: 'abvs'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            page1.createTable({ID: 'm1'});
            assert.deepEqual(page1.createTable({ID: 'm1'}), null);
        });

        it('returns null if the tableModel is not created', function() {
            assert.deepEqual(page1.createTable({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor5 = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var page5 = nor5.createPage({ID: 'page3'});
            var socketURL = 'http://0.0.0.0:5000/page5';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var expJSON = {
                ID: 'page5',
                graph: {
                    ID: 'table1',
                    title: '',
                    type: 'Table',
                    socketURL: '/page5/table1'
                }
            };
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            assert.deepEqual(page5.createTable({ID: 'table1'}) instanceof Table, true);
            assert.strictEqual(nor5._pages[0]._graphs.length, 1);
            assert.strictEqual(nor5._pageList._pages[0]._graphs.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertGraph', function(message) {
                assert.strictEqual(message, expJSON);
            });
        });
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
            var page1=new Page(properties, nor._networkHandler, nor);
            var prop=page1.getProperties();
            assert.strictEqual(prop.ID, 'page1');
            assert.strictEqual(prop.name, 'page one');
            assert.strictEqual(prop.description, 'page with many graphs');
            assert.strictEqual(prop.graphsPerRow, 2);
            assert.strictEqual(prop.graphsPerCol, 3);
        });
    });
});