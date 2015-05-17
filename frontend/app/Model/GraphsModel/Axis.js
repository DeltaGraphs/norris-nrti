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
        name : null,
        color : '#FFF',
        minValue : null,
        maxValue : null,
        ticks : 10,
        scale : 'linear',

        // methods
        Axis : function(info){
            if (info.name !== undefined) {
                Axis.name = info.name;
            }
            if (info.color !== undefined) {
                Axis.color = info.color;
            }
            if (info.minValue !== undefined) {
                Axis.minValue = info.minValue;
            }
            if (info.maxValue !== undefined) {
                Axis.maxValue = info.maxValue;
            }
            if (info.ticks !== undefined) {
                Axis.ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                Axis.scale = info.scale;
            }
        },

        updateParameters : function(info){
            if (info.name !== undefined) {
                Axis.name = info.name;
            }
            if (info.color !== undefined) {
                Axis.color = info.color;
            }
            if (info.minValue !== undefined) {
                Axis.minValue = info.minValue;
            }
            if (info.maxValue !== undefined) {
                Axis.maxValue = info.maxValue;
            }
            if (info.ticks !== undefined) {
                Axis.ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                Axis.scale = info.scale;
            }
        },

        getName : function(){
            return Axis.name;
        },
        getColor : function(){
            return Axis.color;
        },
        getMinValue : function(){
            return Axis.minValue;
        },
        getMaxValue : function(){
            return Axis.maxValue;
        },
        getTicks : function(){
            return Axis.ticks;
        },
        getScale : function(){
            return Axis.scale;
        }
    };

    return Axis;
});