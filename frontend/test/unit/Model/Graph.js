/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-14	Francesco Rossetto			Codifica del test sul Model Graph.js
*
* 0.0.1			2015-05-14	Francesco Rossetto			Creazione file
* =================================================================================================
*
*/

describe('Graph', function(){
	'use strict';

	var Graph;

	beforeEach(module('app'));

	beforeEach(inject(function(_Graph_){
		Graph = _Graph_;
	}));

	describe('Constructor', function(){

		var json = {
			"title" : "grafico1",
			"URLSocket" : "http://localhost/page1/grafico1"
		};

		beforeEach(function(){
			Graph = new Graph(json);
		});

		it('constructor create the graph with the correct title', function(){
			expect(Graph.getTitle()).toBeEqual("grafico1");
		});
		it('constructor create the graph with the correct url', function(){
			expect(Graph.getUrl()).toBeEqual("http://localhost/page1/grafico1");
		});

	});

	/*describe('updateParameters', function(){
		var json = {
			"ID" : "4"
		};

		spyOn(Page.prototype, "Page").and.returnValue({ "mery" : "ross" });

		beforeEach(function(){
			PagesList.addPage(json);
		});

		it('page added to the pagesList', function(){
			expect(PagesList.getPagesList().length).toBeEqual(4);
		});

	});*/
	
});