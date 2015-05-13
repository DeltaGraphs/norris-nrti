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
//var assert = require('chai').assert;
var assert = require('assert');

describe('PageListModel', function() {
    it('returns null when passed a non-valid string', function() {
        assert.strictEqual((new PageListModel(12)).hasOwnProperty('_name'), false);
        assert.strictEqual((new PageListModel(' ')).hasOwnProperty('_name'), false);
    });
    
    it('create object with the right name', function() {
        assert.strictEqual((new PageListModel('name')).name, 'name');
    });

    function PageModel(prop, data){
        this.getData=function(){
            return data;
        };
        this.getProperties=function(){
            return prop;
        };
    }

    var page1=new PageModel('testProp1', 'testData1');
    var page2=new PageModel('testProp2', 'testData2');

    describe('#addPage', function() {
        it('returns true and pushes the page if page is valid', function() {
            var pageList1=new PageListModel('name');
            assert.strictEqual(pageList1.addPage(page1), true);
            assert.strictEqual(pageList1._pages.length, 1);
        });
        it('returns false if page is invalid', function() {
            var pageList1=new PageListModel('name');
            assert.strictEqual(pageList1.addPage(2), false);
        });
    });

    describe('#getName', function() {
        it('returns the right name', function() {
            var pageList1=new PageListModel('name');
            assert.strictEqual(pageList1.getName(), 'name');
        });
    });

    describe('#getData', function() {
        it('returns empty json if it has no pages', function() {
            var pageList2=new PageListModel('name2');
            assert.strictEqual(pageList2.getData().length, 0);
        });
       
        it('returns json with one page', function() {
            var pageList2=new PageListModel('name2');
            pageList2.addPage(page1);
            var data=pageList2.getData();
            assert.strictEqual(data.length, 1);
            assert.strictEqual(data[0].properties, 'testProp1');
            assert.strictEqual(data[0].data, 'testData1');
        });
        it('returns json with two pages', function() {
            var pageList2=new PageListModel('name2');
            pageList2.addPage(page1);
            pageList2.addPage(page2);
            var data=pageList2.getData();
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].properties, 'testProp1');
            assert.strictEqual(data[0].data, 'testData1');
            assert.strictEqual(data[1].properties, 'testProp2');
            assert.strictEqual(data[1].data, 'testData2');
        });
    });
    
});