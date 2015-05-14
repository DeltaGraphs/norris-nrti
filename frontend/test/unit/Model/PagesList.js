/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1			2015-05-14	Francesco Rossetto			Modifiche alle descrizioni degli it
* 
* 0.1.0			2015-05-13	Maria Giovanna Chinellato	Codifica del test sul Model
*														PagesList.js
*
* 0.0.1			2015-05-13	Maria Giovanna Chinellato	Creazione file
*
* =================================================================================================
*
*/

describe('PagesList', function(){
	
	var PagesList;

	beforEach(module('app'));

	beforeEach(inject(function(_PagesList_){
		PagesList = _PagesList_;
	}));

	describe('Constructor', function(){

		var json = {
			"name" : "name"
			"data" : [
				{ "id" : "1" },
				{ "id" : "2" },
				{ "id" : "3" }
			]
		}
		spyOn(window, "Page").and.returnValue({ "mery" : "ross" });
		var pagesList;
		beforeEach(function(){
			pagesList = new PagesList(json);
		});

		it('constructor create an array with the exactly number of pages', function(){
			expect(pagesList.getPagesList().length).toBeEqual(3);
		});

	});

	describe('addPage', function(){

		it('page added to the pagesList', function(){
			expect(PagesList.addPage());
		});

	});
	
});