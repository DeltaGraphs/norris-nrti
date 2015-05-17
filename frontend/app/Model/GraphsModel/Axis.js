/*jshint node: true */
'use strict';

/*
* Name :  Axis.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1         2015-05-15  Francesco Rossetto          Fix attributes and methods
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('app')
.factory('Axis', function(){
    var Axis = function(){

        // data member
        var name = null;
        var color = '#FFF';
        var minValue = null;
        var maxValue = null;
        var ticks = 10;
        var scale = 'linear';

        // methods
        Axis = function(info){
            //if (info.name !== undefined) {
                name = info.name;
            //}
            //if (info.color !== undefined) {
                color = info.color;
            //}
            //if (info.minValue !== undefined) {
                minValue = info.minValue;
            //}
            //if (info.maxValue !== undefined) {
                maxValue = info.maxValue;
            //}
            //if (info.ticks !== undefined) {
                ticks = info.ticks;
            //}
            //if (info.scale !== undefined) {
                scale = info.scale;
            //}
        };

        this.updateParameters = function(info){
            //if (info.name !== undefined) {
                name = info.name;
            //}
            //if (info.color !== undefined) {
                color = info.color;
            //}
            //if (info.minValue !== undefined) {
                minValue = info.minValue;
            //}
            //if (info.maxValue !== undefined) {
                maxValue = info.maxValue;
            //}
            //if (info.ticks !== undefined) {
                ticks = info.ticks;
            //}
            //if (info.scale !== undefined) {
                scale = info.scale;
            //}
        };

        this.getName = function(){
            return name;
        };
        this.getColor = function(){
            return color;
        };
        this.getMinValue = function(){
            return minValue;
        };
        this.getMaxValue = function(){
            return maxValue;
        };
        this.getTicks = function(){
            return ticks;
        };
        this.getScale = function(){
            return scale;
        };
    };

    return Axis;
});