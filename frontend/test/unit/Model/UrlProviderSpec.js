/*jshint node: true */
'use strict';

/*
* Name :  UrlProviderSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('UrlProvider', function(){
	'use strict';

	var UrlProvider;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_UrlProvider_){
		UrlProvider = _UrlProvider_;
	}));

	describe('Constructor', function(){

		var urlProvider;

		beforeEach(function(){
			urlProvider = new UrlProvider();
		});

		afterEach(function(){
			urlProvider = null;
		});

		it('urlProvider created', function(){
			expect(urlProvider).toBeDefined();
		});

	});

	describe('#Update', function(){

		var urlProvider;

		beforeEach(function(){
			urlProvider = new UrlProvider();
		});

		afterEach(function(){
			urlProvider = null;
		});

		it('urlProvider updated', function(){
			expect(urlProvider.getUrl()).toEqual('');
			urlProvider.setUrl('localhost/page/map');
			expect(urlProvider.getUrl()).toEqual('localhost/page/map');
		});

	});

});