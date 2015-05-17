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
    });

    function RandomObj() {
        this.prop1 = 'prop1';
        this.prop2 = 'prop2';
    }
    describe('#attachObject', function() {
        it('does nothing if there are no params', function() {
            var socket1 = new Socket(nsp);
            socket1.attachObject();
            assert.strictEqual(socket1._attachedObj, null);
        });
        it('attach the object in params', function() {
            var socket1 = new Socket(nsp);
            var obj1 = new RandomObj();
            socket1.attachObject(obj1);
            assert.strictEqual(socket1._attachedObj, http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/);
        });
    });
});