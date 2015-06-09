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

angular.module('norris-nrti')
.factory('CellFactory', function(){

    function Cell(info){

        this._background = '#FFF';
        this._fontColor = '#000';
        if (info !== undefined) {
            if (info.background !== undefined) {
                this._background = info.background;
            }
            if (info.fontColor !== undefined) {
                this._fontColor = info.fontColor;
            }
        }
    }

    Cell.prototype = {

        updateParameters : function(info){
            if (info !== undefined) {
                if (info.background) {
                    this._background = info.background;
                }
                if (info.fontColor) {
                    this._fontColor = info.fontColor;
                }
            }

            return this;
        },

        getBackground : function(){
            return this._background;
        },
        getFontColor : function(){
            return this._fontColor;
        }

    };

    function CellFactory() {}

    CellFactory.build = function(info){
        return new Cell(info);
    };

    return CellFactory;
});