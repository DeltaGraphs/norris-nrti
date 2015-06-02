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
var assert = require('assert');

var Norris = require('../../../lib/businessTier/norris/norris.js');
var Page = require('../../../lib/businessTier/page/page.js');
var NetworkHandler = require('../../../lib/businessTier/networkHandler/networkHandler.js');
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
            var expectedJSON = {
                properties: {
                    ID: 'page1',
                    name: 'page1',
                    description: 'page one',
                    graphsPerRow: 3,
                    graphsPerCol: 5
                },
                data: []
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
});