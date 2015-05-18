/*jshint node: true */
'use strict';

/*
* Name :  Legend.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.1         2015-05-15  Francesco Rossetto          Variuos Fix
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('app')
.factory('Legend', function(){

    function Legend(info){
        this.position = 'right';
        this.fontColor = '#000';
        this.background = '#FFF';

        if (info !== undefined){
            if (info.position !== undefined) {
                this.position = info.position;
            }
            if (info.fontColor !== undefined) {
                this.fontColor = info.fontColor;
            }
            if (info.background !== undefined) {
                this.background = info.background;
            }
        }
    }

    Legend.prototype = {

        updateParameters : function(info){
            if (info !== undefined) {
                if (info.position !== undefined) {
                    this.position = info.position;
                }
                if (info.fontColor !== undefined) {
                    this.fontColor = info.fontColor;
                }
                if (info.background !== undefined) {
                    this.background = info.background;
                }
            }
            return this;
        },

        getPosition : function(){
            return this.position;
        },
        getFontColor : function(){
            return this.fontColor;
        },
        getBackground : function(){
            return this.background;
        }
    };

    return( Legend );
});