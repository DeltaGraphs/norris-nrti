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

    function Axis(info){
        this.name = null;
        this.color = '#FFF';
        this.minValue = null;
        this.maxValue = null;
        this.ticks = 10;
        this.scale = 'linear';

        if (info.name !== undefined) {
            this.name = info.name;
        }
        if (info.color !== undefined) {
            this.color = info.color;
        }
        if (info.minValue !== undefined) {
            this.minValue = info.minValue;
        }
        if (info.maxValue !== undefined) {
            this.maxValue = info.maxValue;
        }
        if (info.ticks !== undefined) {
            this.ticks = info.ticks;
        }
        if (info.scale !== undefined) {
            this.scale = info.scale;
        }
    }

    Axis.prototype = {
        updateParameters : function(info){
            if (info.name !== undefined) {
                this.name = info.name;
            }
            if (info.color !== undefined) {
                this.color = info.color;
            }
            if (info.minValue !== undefined) {
                this.minValue = info.minValue;
            }
            if (info.maxValue !== undefined) {
                this.maxValue = info.maxValue;
            }
            if (info.ticks !== undefined) {
                this.ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this.scale = info.scale;
            }
        },

        getName : function(){
            return this.name;
        },
        getColor : function(){
            return this.color;
        },
        getMinValue : function(){
            return this.minValue;
        },
        getMaxValue : function(){
            return this.maxValue;
        },
        getTicks : function(){
            return this.ticks;
        },
        getScale : function(){
            return this.scale;
        }

    };

    return( Axis );
});