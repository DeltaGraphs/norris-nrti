/*jshint node: true */
'use strict';

/*
* Name :  TableViewSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-28  Maria Giovanna Chinellato   Fix test
*
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('TableView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, table, TableFactory, controller;
	beforeEach(inject(function($rootScope, $compile, $injector, $controller) {
		TableFactory = $injector.get('TableFactory');
		table = TableFactory.build();
    	scope = $rootScope.$new();
    	controller = $controller('TableController', { $scope : scope });
    	html = angular.element('<table-chart url="http://example/table.com"></table-chart>');

    	scope.tableChart = table;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  //'addRowOn':'top','flows':[{'ID':'flow1','name':'autobus','filters':null,'columnKeys':['0','1','2'],'columnFormats':null,'maxItems':50,'maxItemsSaved':500}]},'data':[{'ID':'flow1','records':[{'norrisRecordID':'flow1_1435498798643_1','value':[837,45.39281463623,11.871248245239]},{'norrisRecordID':'flow1_1435498803644_2','value':[875,45.426074981689,11.907616615295]},{'norrisRecordID':'flow1_1435498808785_3','value':[805,45.386032104492,11.865413665771]},{'norrisRecordID':'flow1_1435498813785_4','value':[837,45.397495269775,11.874231338501],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFFFFF','text':'#000000'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498818785_5','value':[837,45.397689819336,11.874346733093]},{'norrisRecordID':'flow1_1435498823786_6','value':[880,45.412399291992,11.878684997559],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFAAFF','text':'#FFABBA'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498828787_7','value':[875,45.431159973145,11.914177894592],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFAAFF','text':'#FFABBA'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498834145_8','value':[805,45.387706756592,11.868689537048]},{'norrisRecordID':'flow1_1435498839596_9','value':[814,45.43616104126,11.917216300964]},{'norrisRecordID':'flow1_1435498846600_10','value':[814,45.43616104126,11.917216300964]},{'norrisRecordID':'flow1_1435498851602_11','value':[875,45.43480682373,11.916501998901]},{'norrisRecordID':'flow1_1435498856652_12','value':[837,45.399394989014,11.877456665039],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFAAFF','text':'#FFABBA'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498861856_13','value':[835,45.420070648193,11.878535270691],'appearance':[{'bg':'#FFFFFF','text':'#F299AC'},{'bg':'#F299AC','text':'#FFFFFF'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498866857_14','value':[867,45.389148712158,11.869828224182]},{'norrisRecordID':'flow1_1435498871858_15','value':[814,45.434585571289,11.913011550903]},{'norrisRecordID':'flow1_1435498876859_16','value':[867,45.386985778809,11.86462688446],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFAAFF','text':'#FFABBA'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498881862_17','value':[835,45.413475036621,11.87677192688]},{'norrisRecordID':'flow1_1435498887184_18','value':[814,45.425636291504,11.903347969055]},{'norrisRecordID':'flow1_1435498892187_19','value':[867,45.379734039307,11.852473258972]},{'norrisRecordID':'flow1_1435498897250_20','value':[814,45.424877166748,11.897101402283],'appearance':[{'bg':'#FFAAFF','text':'#FFAAAA'},{'bg':'#FFFFFF','text':'#000000'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498902251_21','value':[814,45.423728942871,11.890828132629]},{'norrisRecordID':'flow1_1435498907253_22','value':[835,45.406368255615,11.877844810486]},{'norrisRecordID':'flow1_1435498912255_23','value':[835,45.406368255615,11.877844810486],'appearance':[{'bg':'#000000','text':'#FFFFFF'},{'bg':'#FFAAFF','text':'#FFABBA'},{'bg':'#FFAAFF','text':'#FFAACC'}]},{'norrisRecordID':'flow1_1435498917256_24','value':[814,45.423042297363,11.88371181488]}]}]}


	describe('#init', function() {

  		var info = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'headers':['IDMezzo','WGS84Fi','WGS84La'],
			'sortable' : true,
			'maxItemsPage': 20,
			'socketURL' : 'http://example.com',
			'backgroundColor' : '#F0F',
			'grid' : false
		};

  		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'sortable' :false,
			'appearance':{
				'horizontalGrid':{'color':'#00AA00','width':1},
				'verticalGrid':{'color':'#00AA00','width':1},
				'rowEven':{'textColor':['#1F3D99','#000000'],'backgroundColor':['#99E2F2','#F2E899']},
				'rowOdd':{'textColor':['#000000','#1F3D99'],'backgroundColor':['#99F2DF','#D9F299']},
				'headers':{'textColor':['#FFFFFF','#FFFFFF'],'backgroundColor':['#2FBA38','#2F3ABA']}
			},
			'headers':['IDMezzo','WGS84Fi','WGS84La'],
			'sort' : {'column':['IDMezzo','WGS84Fi'],'ordering':['DESC','ASC']},
			'socketURL' : 'http://example.com',
			'backgroundColor' : '#F0F',
			'grid' : false,
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var data = [
			{
				'ID':'f1',
				'records':[
					{'norrisRecordID':'flow1_1435482609499_1','value':[1,3]},
					{'norrisRecordID':'flow1_1435482609499_2','value':[2,2]},
					{'norrisRecordID':'flow1_1435482609499_3','value':[3,1]}
				]
			}
		];

		beforeEach(function(){
			scope.table = TableFactory.build();
		});

		afterEach(function(){
			scope.table = null;
		});

		it('works fine', function() {
			scope.table.updateParameters(info);
			scope.changed = !scope.changed;
    		scope.$digest();
			var tableChart = element.find('table-chart');
			expect(tableChart).toBeDefined();
			var tag = element.find('table');
			expect(tag).toBeDefined();
			table.updateParameters(json);
			scope.changed = !scope.changed;
		});

		it('works fine', function() {
			scope.table.updateParameters(json);
			scope.table.initializeData(data);
			scope.changedP = true;
			scope.changed = !scope.changed;
    		scope.$digest();
			var tableChart = element.find('table-chart');
			expect(tableChart).toBeDefined();
			var tag = element.find('table');
			expect(tag).toBeDefined();
			table.updateParameters(json);
			scope.changed = !scope.changed;
		});

	});

	describe('#setData', function() {

  		var json = {
  			'title' : 'json',
			'flows' : [{'ID' : 'f1', 'flowColor' : '#000000'},{ 'ID' : 'f2'},{'ID' : 'f3', 'flowColor' : '#B9D3EE'}]
		};

		var data = [
			{
				'ID':'f1',
				'records':[
					{'norrisRecordID':'flow1_1435482609499_1','value':[1,3]},
					{'norrisRecordID':'flow1_1435482609499_2','value':[2,2]},
					{'norrisRecordID':'flow1_1435482609499_3','value':[3,1]}
				]
			}
		];

		it('works fine', function() {
			scope.table.updateParameters(json);
			scope.table.initializeData(data);
			scope.changed = !scope.changed;
    		scope.$digest();
		});

		/*it('set the correct flow color', function() {
			var colorArray = scope.colorFunction();
			expect(colorArray[0]).toEqual('#000000');
			expect(colorArray[0]).toEqual('#BAAAEE');
			expect(colorArray[0]).toEqual('#B9D3EE');
		});*/

	});

});