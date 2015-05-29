/*jshint node: true, -W106 */
'use strict';

/*
* Name : networkHandlerSpec.js
* Module : UnitTest
* Location : /test/businessTier/networkHandler
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-29   Samuele Zanella    Initial code
* =========================================================
*/

var NetworkHandler = require('../../../lib/businessTier/networkHandler/networkHandler.js');
var Socket=require('../../../presentationTier/socket.js');
var assert = require('assert');
var request = require('superagent');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
io.listen(5000);
var Routes=require('../../presentationTier/routes.js');

describe('NetworkHandler', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new NetworkHandler()).hasOwnProperty('_app'), false);
    });

    it('returns null when passed invalid parameters', function() {
        assert.strictEqual((new NetworkHandler('abc', 'def', 2)).hasOwnProperty('_app'), false);
    });

    it('set param values to properties', function() {
        var nh1=new NetworkHandler(app, io, '/norris');
        assert.deepEqual(nh1._app, app);
        assert.deepEqual(nh1._io, io);
        assert.deepEqual(nh1._norrisNamespace, '/norris');
        assert.strictEqual(nh1._routes, new Routes(app, '/norris'));
    });

    describe('#createSocket', function() {
        it('returns the created socket object', function() {
            var nh1=new NetworkHandler(app, io, '/norris');
            assert.deepEqual(nh1.createSocket('/page1'), new Socket(io, '/page1'));
        });
    });
    describe('#addPageToRouting', function() {
        it('adds the given page to the application routing', function() {
            var nh1=new NetworkHandler(app, io, '/norris');
            nh1.addPageToRouting('/page1');
            request.post('localhost:3000/page').end(function(res){
                assert.strictEqual(res.status,200);
            });
        });
    });
});