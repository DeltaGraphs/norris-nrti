/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageListModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/pageList
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-11   Filippo Rampado    Initial code
* =========================================================
*/

var PageListModel = require('../../../lib/dataTier/pageList/pageListModel.js');
var PageModel = require('../../../lib/dataTier/page/pageModel.js');
var assert = require('assert');

describe('PageListModel', function() {
    it('returns null when passed a non-valid string', function() {
        assert.strictEqual((new PageListModel(12)).hasOwnProperty('_name'), false);
    });

    it('returns null when passed a empty string', function() {
        assert.strictEqual((new PageListModel(' ')).hasOwnProperty('_name'), false);
    });
    
    it('create object with the right name', function() {
        assert.strictEqual((new PageListModel('name'))._name, 'name');
    });

    var page1=new PageModel({ID: 'page1'});
    var page2=new PageModel({ID: 'page2'});

    describe('#addPage', function() {
        it('returns true and pushes the page if page is valid', function() {
            var pageList=new PageListModel('name');
            assert.strictEqual(pageList.addPage(page1), true);
            assert.strictEqual(pageList._pages.length, 1);
        });
        it('returns false if page is invalid', function() {
            var pageList=new PageListModel('name');
            assert.strictEqual(pageList.addPage(2), 511);
        });
    });

    describe('#getName', function() {
        it('returns the right name', function() {
            var pageList=new PageListModel('name');
            assert.strictEqual(pageList.getName(), 'name');
        });
    });

    describe('#getData', function() {
        it('returns empty json if it has no pages', function() {
            var pageList=new PageListModel('name');
            assert.strictEqual(pageList.getData().length, 0);
        });
       
        it('returns json with one page', function() {
            var pageList=new PageListModel('name');
            pageList.addPage(page1);
            var data=pageList.getData();
            assert.strictEqual(data.length, 1);
            assert.strictEqual(data[0].properties.ID, 'page1');
        });
        it('returns json with two pages', function() {
            var pageList=new PageListModel('name');
            pageList.addPage(page1);
            pageList.addPage(page2);
            var data=pageList.getData();
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].properties.ID, 'page1');
            assert.strictEqual(data[1].properties.ID, 'page2');
        });
    });
    
});