/*jshint node: true, -W106 */
'use strict';

/*
* Name : norrisSpec.js
* Module : UnitTest
* Location : /test/businessTier/norris
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-30   Samuele Zanella    Initial code
* =========================================================
*/

var Norris = require('../../../lib/businessTier/norris/norris.js');
var Page = require('../../../lib/businessTier/page/page.js');
//var Socket=require('../../../lib/presentationTier/socket.js');
var NetworkHandler = require('../../../lib/businessTier/networkHandler/networkHandler.js');
var PageListModel = require('../../../lib/dataTier/pageList/pageListModel.js');
var assert = require('assert');
//var request = require('superagent');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
io.listen(5000);
var ioclient = require('socket.io-client');

describe('Norris', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new Norris()).hasOwnProperty('_app'), false);
    });

    it('returns null when passed invalid parameters', function() {
        assert.strictEqual((new Norris('abc', 'def', 2, 'baseURL')).hasOwnProperty('_app'), false);
    });

    it('returns null when passed invalid route', function() {
        assert.strictEqual((new Norris(app, io, '/', 'baseURL')).hasOwnProperty('_app'), false);
    });

    it('returns null if the pagelistmodel is not created', function() {
        assert.strictEqual((new Norris(app, io, '/  ', 'baseURL')).hasOwnProperty('_app'), false);
    });

    it('set param values to properties', function() {
        var nor=new Norris(app, io, '/norris', 'baseURL');
        assert.deepEqual(nor._app, app);
        assert.deepEqual(nor._io, io);
        assert.deepEqual(nor._pageList, new PageListModel('norris'));
        assert.deepEqual(nor._networkHandler, new NetworkHandler(app, io, '/norris', 'baseURL'));
        var plm = (new NetworkHandler(app, io, '/norris')).createSocket('/norris');
        plm.attachObject(nor, 'configPageList');
        assert.deepEqual(nor._pageListSocket, plm);
        assert.strictEqual(nor._pages.length, 0);
    });

    describe('#createPage', function() {
        it('returns null if no parameter is passed', function() {
            var nor=new Norris(app, io, '/norris');
            assert.deepEqual(nor.createPage(), null);
        });

        it('returns null if the passed parameter does not contain an ID', function() {
            var nor=new Norris(app, io, '/norris');
            assert.strictEqual(nor.createPage({p: 'abc'}), null);
        });

        it('returns null if the passed ID is already used', function() {
            var nor=new Norris(app, io, '/norris', 'baseURL');
            nor._pages.push({_page: {_ID: 'abc'}});
            assert.strictEqual(nor.createPage({ID: 'abc'}), null);
        });

        it('returns null if the PageModel is not created', function() {
            var nor=new Norris(app, io, '/norris');
            assert.strictEqual(nor.createPage({ID: ''}), null);
        });

        it('behaves correctly with the right parameters', function() {
            var nor=new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var socketURL = 'http://0.0.0.0:5000/norris';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            /*var expJSON = {
                ID: 'page1',
                name: '',
                description: '',
                socketURL: 'http://0.0.0.0:5000/page1',
                graphs: []
            };*/
            //var stPage = new Page({ID: 'page1'}, nor._networkHandler, nor);
            assert.deepEqual(nor.createPage({ID: 'page1'}) instanceof Page, true);
            assert.strictEqual(nor._pages.length, 1);
            assert.strictEqual(nor._pageList._pages.length, 1);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('insertPage', function(message) {
                console.dir('Received message');
                console.dir(message);
                //assert.strictEqual(message, expJSON);
                assert.strictEqual(message, 'ciao');
            });
        });
    });

    describe('#getConfigJSON', function() {
        it('returns the correct JSON', function() {
            var nor = new Norris(app, io, '/norris', 'baseURL');
            var p1=nor.createPage({ID: 'page1', name:'Page one'});
            nor.createPage({ID: 'page2', name:'Page two'});

            p1.createMapChart({
                ID: 'map1',
                title: 'APS',
                height: 600,
                width: 1000,
                enableLegend: true,
                legend: {
                    position: 'NE',
                },
                latitude: 45.42533493042,
                longitude: 45.42533493042,
                mapType: 'roadMap',
                mapWidth: 2000,
                mapHeight: 2000,
                legendOnPoint: true
            });

            p1.createLineChart({
                ID: 'line1',
                title: 'LINEE',
                height: 600,
                width: 1000,
                enableLegend: true,
                legend: {
                    position: 'NE',
                },
                xAxis:{
                    name: 'tempo',
                    color: '#000000'
                    //ecc
                },
                yAxis:{
                    name: 'temperatura',
                    color: '#000000'
                    //ecc
                },
                backGroundColor: '#FFFFFF',
                viewFinde: true,
                horizontalGrid: true,
                verticalGrid: true,
                legendOnPoint: true,
                scale: 'linear'
            });

            var expJSON = {'name':'norris',
                'data':[
                    {
                        'properties': {
                            'ID':'page1',
                            'name':'Page one',
                            'description':'',
                            'socketURL':'baseURL/norris/page1'
                        },
                        'data':[
                            {
                                'ID':'map1',
                                'title':'APS',
                                'type':'MapChart',
                                'socketURL':'baseURL/norris/page1/map1'
                            },
                            {
                                'ID':'line1',
                                'title':'LINEE',
                                'type':'LineChart',
                                'socketURL':'baseURL/norris/page1/line1'
                            }
                        ]
                    },
                    {
                        'properties': {
                            'ID':'page2',
                            'name':'Page two',
                            'description': '',
                            'socketURL':'baseURL/norris/page2'
                        },
                        'data':[]
                    }
                ]
            };
            assert.deepEqual(nor.getConfigJSON(), expJSON);
        });
    });

    describe('#pageChanged', function() {
        it('sends the message over the socket', function() {
            var nor = new Norris(app, io, '/norris', 'http://0.0.0.0:5000');
            var socketURL = 'http://0.0.0.0:5000/norris';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var params = {
                eventType: 'updatePage',
                params: {
                    name: 'page1',
                    description: 'newDesc'
                }
            };
            nor.pageChanged(params);
            var client1 = ioclient.connect(socketURL, options);
            client1.on('updatePage', function(message) {
                assert.strictEqual(message, params);
            });
        });
    });
});