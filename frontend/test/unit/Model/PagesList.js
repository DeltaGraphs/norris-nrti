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
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-14	Francesco Rossetto			Completato anche addPage
* 
* 0.1.0			2015-05-13	Maria Giovanna Chinellato	Codifica del test sul Model
*														PagesList.js
*
* 0.0.1			2015-05-13	Maria Giovanna Chinellato	Creazione file
* =================================================================================================
*
*/

describe('PagesList', function(){

	var PagesList;
	var Page;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_PagesList_,$injector){
		PagesList = _PagesList_;
		Page = $injector.get('Page');
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
			'name' : 'name',
			'data' : [
				{ 'ID' : '1' },
				{ 'ID' : '2' },
				{ 'ID' : '3' }
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

	describe('addPage', function(){
		var json = {
			'ID' : '4'
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