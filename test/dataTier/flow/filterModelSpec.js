/*jshint node: true, -W106 */
'use strict';

/*
* Name : filterModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

var FilterModel = require('../../../lib/dataTier/flow/filterModel.js');
var assert = require('assert');

describe('FilterModel', function() {
    it('returns 621 if no textRules are specified', function() {
		var filters=new FilterModel();
		var filters2=new FilterModel(2);
		assert.strictEqual(filters.hasOwnProperty('_filterText'), false);
		assert.strictEqual(filters2.hasOwnProperty('_filterText'), false);
    });
	it('returns 622 if filterText is not valid', function() {
		var filters=new FilterModel('asd');
		assert.strictEqual(filters.hasOwnProperty('_filterText'), false);
    });
    it('returns the right object if filterText is valid', function() {
		var filters=new FilterModel('temperature > 2');
		var filters2=new FilterModel('temperature > 2, pressure != 2');
		var filters3=new FilterModel('temperature > 2, pressure');
		assert.strictEqual(filters._conditions.length, 1);
		assert.strictEqual(filters2._conditions.length, 2);
		assert.strictEqual(filters3._conditions.length, 1);
    });
    describe('#validateRecord', function() {
		it('returns true if record is valid', function() {
			var filters=new FilterModel('temperature > 2, pressure != 2');
			assert.strictEqual(filters.validateRecord({temperature: 3, pressure: 3}), true);
		});
		it('returns false if record is valid', function() {
			var filters=new FilterModel('temperature > 2, pressure != 2');
			assert.strictEqual(filters.validateRecord({temperature: 3, pressure: 2}), false);
			assert.strictEqual(filters.validateRecord({temperature: 2, pressure: 2}), false);
			assert.strictEqual(filters.validateRecord({temperature: 2}), false);
		});
    });
    describe('#getFilterText', function() {
		it('returns the right string', function() {
			var filters=new FilterModel('temperature > 2, pressure != 2');
			assert.strictEqual(filters.getFilterText(), 'temperature > 2, pressure != 2');
		});
    });
});
