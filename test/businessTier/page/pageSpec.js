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
var nor = new Norris(app, io, '/norris');

function ParamMock() {
    this._app = null;
    this._io = null;
    this._networkHandler = null;
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

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new Page({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new Page({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('set param values to properties', function() {
        var page1=new Page({ID:'page1'}, new ParamMock(), new ParamMock());
        assert.deepEqual(page1._page, new PageModel({ID:'page1'}));
        assert.deepEqual(page1._networkHandler, new ParamMock());
        assert.deepEqual(page1._norris, new ParamMock());
        assert.strictEqual(page1._pageNamespace, '/page1');
        assert.deepEqual(page1._pageSocket, new ParamMock());
        assert.strictEqual(page1._graphs.length, 0);
    });

    describe('#getConfigJSON', function() {
        it('returns the JSON to send to clients when they connect', function() {
            var page1=new Page({ID:'page1', name:'page1', description:'page one', graphsPerRow: 3, graphsPerCol: 5}, new ParamMock(), new ParamMock());
            page1.createMapChart({ID:'map1'});
            page1.createLineChart({ID:'line1'});
            var expectedJSON = {
                properties: {
                    ID: 'page1',
                    name: 'page1',
                    description: 'page one',
                    graphsPerRow: 3,
                    graphsPerCol: 5
                },
                data: [
                    {
                        ID: 'map1',
                        title: '',
                        socketURL: 'page1/map1'
                    },
                    {
                        ID: 'line1',
                        title: '',
                        socketURL: 'page1/line1'
                    }
                ]
            };
            assert.deepEqual(page1.getConfigJSON(), expectedJSON);
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
            var nor=new Norris(app, io, '/norris');
            var pg = nor.createPage({ID:'page1'});
            assert.deepEqual(pg.createMapChart(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            var nor=new Norris(app, io, '/norris');
            var pg = nor.createPage({ID:'page1'});
            assert.deepEqual(pg.createMapChart({p: 'abvs'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            var nor=new Norris(app, io, '/norris');
            var pg = nor.createPage({ID:'page1'});
            pg.createMapChart({ID: 'm1'});
            assert.deepEqual(pg.createMapChart({ID: 'm1'}), null);
        });

        it('returns null if the mapChartModel is not created', function() {
            var nor=new Norris(app, io, '/norris');
            var pg = nor.createPage({ID:'page1'});
            pg.createMapChart({ID: 'm1'});
            assert.deepEqual(pg.createMapChart({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor=new Norris(app, io, '/norris');
            var socketURL = 'http://0.0.0.0:5000/page1';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var expJSON = {
                ID: 'page1',
                graph: {
                    ID: 'map1',
                    title: '',
                    type: 'MapChart',
                    socketURL: '/page1/map1'
                }
            };
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            var pg = nor.createPage({ID:'page1'});
            assert.deepEqual(pg.createMapChart({ID: 'map1'}) instanceof MapChart, true);
            assert.strictEqual(nor._pages[0]._graphs.length, 1);
            assert.strictEqual(nor._pageList._pages[0]._graphs.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertGraph', function(message) {
                assert.strictEqual(message, expJSON);
            });
        });
    });
});