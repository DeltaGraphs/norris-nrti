/*jshint node: true */
'use strict';

/*
* Name :  Axis.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================7
* 0.1.3         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
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

    var name = null;
    var color = '#FFF';
    var minValue = null;
    var maxValue = null;
    var ticks = 10;
    var scale = 'linear';


    function Axis(info){

        if (info !== undefined) {
            if (info.name !== undefined) {
                name = info.name;
            }
            if (info.color !== undefined) {
                color = info.color;
            }
            if (info.minValue !== undefined) {
                minValue = info.minValue;
            }
            if (info.maxValue !== undefined) {
                maxValue = info.maxValue;
            }
            if (info.ticks !== undefined) {
                ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                scale = info.scale;
            }
        }
    }

    Axis.prototype = {
        updateParameters : function(info){
            if (info !== undefined) {
                if (info.name !== undefined) {
                    name = info.name;
                }
                if (info.color !== undefined) {
                    color = info.color;
                }
                if (info.minValue !== undefined) {
                    minValue = info.minValue;
                }
                if (info.maxValue !== undefined) {
                    maxValue = info.maxValue;
                }
                if (info.ticks !== undefined) {
                    ticks = info.ticks;
                }
                if (info.scale !== undefined) {
                    scale = info.scale;
                }
            }
            return this;
        },

        getName : function(){
            return name;
        },
        getColor : function(){
            return color;
        },
        getMinValue : function(){
            return minValue;
        },
        getMaxValue : function(){
            return maxValue;
        },
        getTicks : function(){
            return ticks;
        },
        getScale : function(){
            return scale;
        }

    };

    return( Axis );
});