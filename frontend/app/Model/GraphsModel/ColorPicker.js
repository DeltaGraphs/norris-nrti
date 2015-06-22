/*jshint node: true */
'use strict';

/*
* Name :  ColorPicker.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-22  Maria GiovannaChinellato    Add all attributes and add initial code for methods 
*
* 0.0.1         2015-06-22  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.factory('ColorPicker', function(){
	var defaultColorFlow = [
        '#1f77b4',
        '#aec7e8',
        '#ff7f0e',
        '#ffbb78',
        '#2ca02c',
        '#98df8a',
        '#d62728',
        '#ff9896',
        '#9467bd',
        '#c5b0d5',
        '#8c564b',
        '#c49c94',
        '#e377c2',
        '#f7b6d2',
        '#7f7f7f',
        '#c7c7c7',
        '#bcbd22',
        '#dbdb8d',
        '#17becf',
        '#9edae5'
    ];

    return {
    	getDefaultColor : function(){
    		return defaultColorFlow;
    	}
    };

});