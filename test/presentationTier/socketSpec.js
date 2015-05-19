/*jshint node: true, -W106 */
'use strict';

/*
* Name : socketSpec.js
* Module : UnitTest
* Location : /test/presentationTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-17   Samuele Zanella    Initial code
* =========================================================
*/

var Socket = require('../../lib/presentationTier/socket.js');
var io = require('socket.io-client');

var assert = require('assert');

describe('Socket', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new Socket()).hasOwnProperty('_namespace'), false);
    });

    it('returns null when there is a non-valid namespace in params', function() {
        assert.strictEqual((new Socket('wrong')).hasOwnProperty('_title'), false);
    });

    var nsp = require('socket.io')().of('/namespace');
    it('set param values to properties', function() {
        var socket1 = new Socket(nsp);
        assert.strictEqual(socket1._namespace, nsp);
        assert.strictEqual(socket1._attachedObj, null);
        assert.strictEqual(socket1._onConnectionEvent, '');
    });

    describe('#sendMessage', function() {

        var server = require('socket.io')();
        server.listen(5000);

        var socketURL = 'http://0.0.0.0:5000/namespace';
        var options ={
            transports: ['websocket'],
            'force new connection': true
        };
        var client1 = io.connect(socketURL, options);

        function Mock() {}
        Mock.prototype.getConfigJSON = function() {
            return 'configJSON';
        };

        it('emits a message if given valid params', function() {
            var socket1 = new Socket(server, '/namespace');
            var object = new Mock();
            socket1.attachObject(object, 'onEvent');
            socket1.sendMessage('event', 'message');
            client1.on('connection', function(configJSON) {
                assert.strictEqual(configJSON, object.getConfigJSON());
            });
            client1.on('event', function(message) {
                assert.strictEqual(message, 'message');
            });
        });
    });

    function RandomObj() {
        this.prop1 = 'prop1';
        this.prop2 = 'prop2';
    }
    describe('#attachObject', function() {
        it('does nothing if there are no params', function() {
            var socket1 = new Socket('/namespace');
            socket1.attachObject();
            assert.strictEqual(socket1._attachedObj, null);
            assert.strictEqual(socket1._onConnectionEvent, '');
        });
        it('attach the object in params', function() {
            var socket1 = new Socket('/namespace');
            var obj1 = new RandomObj();
            socket1.attachObject(obj1, 'onEvent');
            assert.strictEqual(socket1._attachedObj, obj1);
            assert.strictEqual(socket1._onConnectionEvent, 'onEvent');
        });
    });
});