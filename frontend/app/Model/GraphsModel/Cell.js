/*jshint node: true */
'use strict';

/*
* Name :  Cell.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.1         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('services')
.factory('Cell', function(){

    var background = '#FFF';
    var fontColor = '#000';

    function Cell(info){

        if (info !== undefined) {
            if (info.background !== undefined) {
                background = info.background;
            }
            if (info.fontColor !== undefined) {
                fontColor = info.fontColor;
            }
        }
    }

    Cell.prototype = {

        updateParameters : function(info){
            if (info !== undefined) {
                if (info.background) {
                    background = info.background;
                }
                if (info.fontColor) {
                    fontColor = info.fontColor;
                }
            }

            return this;
        },

        getBackground : function(){
            return background;
        },
        getFontColor : function(){
            return fontColor;
        }

    };

    return( Cell );
});