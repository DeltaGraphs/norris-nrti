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
    var Axis = function(info){
        if (info.name) {
            this.name = info.name;
        }
        if (info.color) {
            this.color = info.color;
        }
        if (info.minValue) {
            this.minValue = info.minValue;
        }
        if (info.maxValue) {
            this.maxValue = info.maxValue;
        }
        if (info.ticks) {
            this.ticks = info.ticks;
        }
        if (info.scale) {
            this.scale = info.scale;
        }
    };

    this.updateParameters = function(info){
        if (info.name) {
            name = info.name;
        }
        if (info.color) {
            color = info.color;
        }
        if (info.minValue) {
            minValue = info.minValue;
        }
        if (info.maxValue) {
            maxValue = info.maxValue;
        }
        if (info.ticks) {
            ticks = info.ticks;
        }
        if (info.scale) {
            scale = info.scale;
        }
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

    return Axis;
});