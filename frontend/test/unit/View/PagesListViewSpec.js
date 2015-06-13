/*jshint node: true */
'use strict';

/*
* Name :  PagesListViewSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('PagesListView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var element, scope;
	var PageFactory;

	beforeEach(inject(function($rootScope, $compile, $injector) {
    	scope = $rootScope.$new();
    	PageFactory = $injector.get('PageFactory');
    	var page1 = PageFactory.build(),
    		page2 = PageFactory.build(),
    		page3 = PageFactory.build();

    	scope.pagesList = [
    		{ 'id': 1, 'page' : page1 },
    		{ 'id': 2, 'page' : page2 },
    		{ 'id': 3, 'page' : page3 }
    	];

    	element = angular.element('<div id="pagesList">' + 
					'<ul>' +
					'<li ng-repeat="page in pagesList">' +
						'<a ng-href="#/page/{{$index}}"> {{ page.page.getName() }} </a>' +
						'<p> {{ page.page.getDescription() }} </p>' +
					'</li>' +
					'</ul>' +
			'</div>');

    	element = $compile(element)(scope);
    	scope.$digest();

  	}));

  	describe('template', function() {
		it('works fine', function() {
			var elm = element.find('ul');
			expect(elm.list.length).toBe(3);
		});
	});

});