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
* 0.1.2         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.1         2015-05-15  Francesco Rossetto          Variuos Fix
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('services')
.factory('Legend', function(){

    var position = 'right';
    var fontColor = '#000';
    var backgroundColor = '#FFF';

    function Legend(info){

        if (info !== undefined){
            if (info.position !== undefined) {
                position = info.position;
            }
            if (info.fontColor !== undefined) {
                fontColor = info.fontColor;
            }
            if (info.backgroundColor !== undefined) {
                backgroundColor = info.backgroundColor;
            }
        }
    }

    Legend.prototype = {

        contructor : Legend,

        updateParameters : function(info){
            if (info !== undefined) {
                if (info.position !== undefined) {
                    position = info.position;
                }
                if (info.fontColor !== undefined) {
                    fontColor = info.fontColor;
                }
                if (info.backgroundColor !== undefined) {
                    backgroundColor = info.backgroundColor;
                }
            }
        },

        getPosition : function(){
            return position;
        },
        getFontColor : function(){
            return fontColor;
        },
        getBackgroundColor : function(){
            return backgroundColor;
        }
    };

    return( Legend );
});