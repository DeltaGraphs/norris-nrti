/*jshint node: true, -W106 */
'use strict';

/*
* Name : flowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

var Flow = require('../../../lib/businessTier/flow/flow.js');
var assert = require('assert');

describe('Flow', function() {
    it('returns if socket passed is invalid', function() {
        assert.strictEqual((new Flow()).hasOwnProperty('_graphSocket'), false);
        assert.strictEqual((new Flow(3)).hasOwnProperty('_graphSocket'), false);
    });
    it('creates the object if graphSocket is valid', function() {
        assert.strictEqual((new Flow({_namespace: 2})).hasOwnProperty('_graphSocket'), true);
    });
});