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

function Legend(info){
    this._position = 'right';
    this._fontColor = '#000';
    this._backgroundColor = '#FFF';

    if (info !== undefined){
        if (info.position !== undefined) {
            this._position = info.position;
        }
        if (info.fontColor !== undefined) {
            this._fontColor = info.fontColor;
        }
        if (info.backgroundColor !== undefined) {
            this._backgroundColor = info.backgroundColor;
        }
    }
}

Legend.prototype = {

    contructor : Legend,

    updateParameters : function(info){
        if (info !== undefined) {
            if (info.position !== undefined) {
                this._position = info.position;
            }
            if (info.fontColor !== undefined) {
                this._fontColor = info.fontColor;
            }
            if (info.backgroundColor !== undefined) {
                this._backgroundColor = info.backgroundColor;
            }
        }
    },

    getPosition : function(){
        return this._position;
    },
    getFontColor : function(){
        return this._fontColor;
    },
    getBackgroundColor : function(){
        return this._backgroundColor;
    }
};