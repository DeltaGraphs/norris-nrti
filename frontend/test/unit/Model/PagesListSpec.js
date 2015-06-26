/*jshint node: true */
'use strict';

/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.3			2015-06-26	Maria Giovanna Chinellato   Fix code
*
* 0.1.2         2015-05-19  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-19	Francesco Rossetto			Completato anche addPage
* 
* 0.1.0			2015-05-17	Maria Giovanna Chinellato	Add test on Model::PagesList.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('PagesList', function(){

	var PagesList;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_PagesList_){
		PagesList = _PagesList_;
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			PagesList = new PagesList();
		});

		afterEach(function(){
			PagesList = null;
		});

		it('instance defined', function(){
			expect(PagesList).toBeDefined();
		});
		it('constructor create an array with the exactly number of pages', function(){
			expect(PagesList.getPagesList().length).toEqual(0);
		});

	});

	describe('Constructor', function(){

		var json = {
			'data' : [
				{ 'properties': {'ID' : '1' }},
				{ 'properties' : { 'ID' : '2' }},
				{ 'properties' : { 'ID' : '3' }}
			]
		};
		
		beforeEach(function(){
			PagesList = new PagesList(json);
		});

		afterEach(function(){
			PagesList = null;
		});

		it('instance defined', function(){
			expect(PagesList).toBeDefined();
		});
		it('constructor create an array with the exactly number of pages', function(){
			expect(PagesList.getPagesList().length).toEqual(3);
		});

	});

	describe('#addPage', function(){
		var json = {
			'properties' : {
				'ID' : '4'
			}
		};

		beforeEach(function(){
			PagesList = new PagesList();
			PagesList.addPage(json);
		});

		afterEach(function(){
			PagesList = null;
		});

		it('page added to the pagesList', function(){
			expect(PagesList.getPagesList().length).toEqual(1);
		});

	});
	
});