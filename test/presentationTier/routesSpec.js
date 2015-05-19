/*jshint node: true, -W106 */
'use strict';

/*
* Name : routesSpec.js
* Module : UnitTest
* Location : /test/presentationTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Samuele Zanella    Initial code
* =========================================================
*/

var Routes = require('../../lib/presentationTier/routes.js');

var assert = require('assert');
var Express = require('express');

describe('Routes', function() {
    var expr = new Express();
    console.dir('printing express type');
    console.dir(expr);
    it('returns null when there are no params', function() {
        assert.strictEqual((new Routes()).hasOwnProperty('_app'), false);
    });
});