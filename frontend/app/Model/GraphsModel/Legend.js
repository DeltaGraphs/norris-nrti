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

angular.module("services")
.factory('Legend', function(){
    var position = "right";
    var fontColor = "#000";
    var background = "#FFF";

    return {
        Legend : function(info){
            if (info.position) {
                position = info.position;
            }
            if (info.fontColor) {
                fontColor = info.fontColor;
            }
            if (info.background) {
                background = info.background;
            }
        },

        updateParameters : function(info){
            if (info.position) {
                position = info.position;
            }
            if (info.fontColor) {
                fontColor = info.fontColor;
            }
            if (info.background) {
                background = info.background;
            }
        },

        getPosition : function(){
            return position;
        },
        getFontColor : function(){
            return fontColor;
        },
        getBackground : function(){
            return background;
        }
    };
});