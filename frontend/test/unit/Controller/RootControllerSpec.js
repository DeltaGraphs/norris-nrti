/*
* Name :  RootControllerSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
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

describe('RootController', function(){

	var scope;

	beforeEach(angular.mock.module('norris-nrti'));

	 beforeEach(inject(function($rootScope, $controller){
    	scope = $rootScope.$new();
        controller = $controller('RootController', { $scope : scope });
    }));

	describe('#watch', function(){
		it('works fine', function(){
			expect(scope.url).toBe('');
			scope.$apply('url="localhost/page/map"');
			expect(scope.url).toBe('localhost/page/map');
		});
	});

});