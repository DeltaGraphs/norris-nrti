/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphSpec.js
* Module : UnitTest
* Location : /test/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-29   Filippo Rampado    Initial code
* =========================================================
*/

var Graph = require('../../../lib/businessTier/graph/graph.js');
var assert = require('assert');

describe('Graph', function() {
	var paramMock={
		_page:null,
		_namespace:null,
        attachObject: function(){}
	};

    it('returns if params passed are invalid', function() {
        assert.strictEqual((new Graph()).hasOwnProperty('_graphSocket'), false);
        assert.strictEqual((new Graph(3)).hasOwnProperty('_graphSocket'), false);
        assert.strictEqual((new Graph(paramMock, 3)).hasOwnProperty('_graphSocket'), false);
    });
    it('creates the object params passed are valid', function() {
        assert.strictEqual((new Graph(paramMock, paramMock)).hasOwnProperty('_graphSocket'), true);
    });
});