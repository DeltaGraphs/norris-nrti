/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
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
	'use strict';

	var PagesList;

	beforeEach(module('app'));

	beforeEach(inject(function(_PagesList_){
		PagesList = _PagesList_;
	}));

	describe('Constructor', function(){

		var json = {
			"name" : "name"
			"data" : [
				{ "ID" : "1" },
				{ "ID" : "2" },
				{ "ID" : "3" }
			]
		}
		
		var page = mock( Page );
		spyOn(window, "Page").and.returnValue(page);

		beforeEach(function(){
			PagesList = new PagesList(json);
		});

		it('constructor create an array with the exactly number of pages', function(){
			expect(PagesList.getPagesList().length).toBeEqual(3);
		});

	});

	describe('addPage', function(){
		var json = {
			"ID" : "4"
		}

		var page = mock( Page );
		spyOn(window, "Page").and.returnValue(page);

		beforeEach(function(){
			PagesList.addPage(json);
		});

		it('page added to the pagesList', function(){
			expect(PagesList.getPagesList().length).toBeEqual(4);
		});

	});
	
});