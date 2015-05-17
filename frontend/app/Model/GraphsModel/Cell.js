/*jshint node: true */
'use strict';

/*
* Name :  Cell.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('app')
.factory('Cell', function(){

    function Cell(info){
        this.background = '#FFF';
        this.fontColor = '#000';

        if (info !== undefined) {
            if (info.background !== undefined) {
                this.background = info.background;
            }
            if (info.fontColor !== undefined) {
                this.fontColor = info.fontColor;
            }
        }
    }

    Cell.prototype = {

        updateParameters : function(info){
            if (info !== undefined) {
                if (info.background) {
                    this.background = info.background;
                }
                if (info.fontColor) {
                    this.fontColor = info.fontColor;
                }
            }
        },

        getBackground : function(){
            return this.background;
        },
        getFontColor : function(){
            return this.fontColor;
        }

    };

    return( Cell );
});