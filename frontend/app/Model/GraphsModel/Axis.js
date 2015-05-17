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

        return this;
    };

    this.updateParameters = function(info){
        if (info.name) {
            Axis.name = info.name;
        }
        if (info.color) {
            Axis.color = info.color;
        }
        if (info.minValue) {
            Axis.minValue = info.minValue;
        }
        if (info.maxValue) {
            Axis.maxValue = info.maxValue;
        }
        if (info.ticks) {
            Axis.ticks = info.ticks;
        }
        if (info.scale) {
            Axis.scale = info.scale;
        }
    };

    this.getName = function(){
        return Axis.name;
    };
    this.getColor = function(){
        return Axis.color;
    };
    this.getMinValue = function(){
        return Axis.minValue;
    };
    this.getMaxValue = function(){
        return Axis.maxValue;
    };
    this.getTicks = function(){
        return Axis.ticks;
    };
    this.getScale = function(){
        return Axis.scale;
    };

    return Axis;
});