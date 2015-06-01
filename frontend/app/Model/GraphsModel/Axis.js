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

angular.module('services')
.factory('AxisFactory', function(){

    function Axis(info){
        this._name = null;
        this._color = '#FFF';
        this._minValue = null;
        this._maxValue = null;
        this._ticks = 10;
        this._scale = 'linear';

        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.color !== undefined) {
                this._color = info.color;
            }
            if (info.minIndex !== undefined) {
                this._minValue = info.minIndex;
            }
            if (info.maxIndex !== undefined) {
                this._maxValue = info.maxIndex;
            }
            if (info.ticks !== undefined) {
                this._ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this._scale = info.scale;
            }
        }
    }

    Axis.prototype = {
        updateParameters : function(info){
            if (info !== undefined) {
                if (info.name !== undefined) {
                    this._name = info.name;
                }
                if (info.color !== undefined) {
                    this._color = info.color;
                }
                if (info.minIndex !== undefined) {
                    this._minValue = info.minIndex;
                }
                if (info.maxIndex !== undefined) {
                    this._maxValue = info.maxIndex;
                }
                if (info.ticks !== undefined) {
                    this._ticks = info.ticks;
                }
                if (info.scale !== undefined) {
                    this._scale = info.scale;
                }
            }
        },

        getName : function(){
            return this._name;
        },
        getColor : function(){
            return this._color;
        },
        getMinValue : function(){
            return this._minValue;
        },
        getMaxValue : function(){
            return this._maxValue;
        },
        getTicks : function(){
            return this._ticks;
        },
        getScale : function(){
            return this._scale;
        }

    };

    function AxisFactory() {}

    AxisFactory.build = function(info) {
        return new Axis(info);
    };
    return( AxisFactory );
});