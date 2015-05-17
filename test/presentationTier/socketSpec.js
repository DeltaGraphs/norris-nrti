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

    var nsp = require('socket.io')().of('/namespace');
    it('returns null when there are no params', function() {
        var socket1 = new Socket(nsp);
        assert.strictEqual(socket1._namespace, nsp);
    });
});