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

describe('Norris', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new Norris()).hasOwnProperty('_app'), false);
    });

    it('returns null when passed invalid parameters', function() {
        assert.strictEqual((new Norris('abc', 'def', 2)).hasOwnProperty('_app'), false);
    });

    it('set param values to properties', function() {
        var nor=new Norris(app, io, '/norris');
        assert.deepEqual(nor._app, app);
        assert.deepEqual(nor._io, io);
        assert.deepEqual(nor._pageList, new PageListModel('norris'));
        assert.deepEqual(nor._networkHandler, new NetworkHandler(app, io, '/norris'));
        assert.deepEqual(nor._pageListSocket, ((new NetworkHandler(app, io, '/norris')).createSocket('/norris')).attachObject(nor, 'configPageList'));
        assert.strictEqual(nor._pages.length, 0);
    });
});