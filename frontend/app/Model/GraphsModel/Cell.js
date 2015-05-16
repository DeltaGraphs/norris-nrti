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

app.factory('Cell', function(){
    var background = "#FFF";
    var fontColor = "#000";

    return {
        Cell : function(info){
            if (info.background) {
                background = info.background;
            }
            if (info.fontColor) {
                fontColor = info.fontColor;
            }
        };

        updateParameters : function(info){
            if (info.background) {
                background = info.background;
            }
            if (info.fontColor) {
                fontColor = info.fontColor;
            }
        };

        getBackground : function(){
            return background;
        }
        getFontColor : function(){
            return fontColor;
        }
        
    };
});