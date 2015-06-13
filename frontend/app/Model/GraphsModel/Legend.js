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

angular.module('norris-nrti')
.factory('LegendFactory', function(){

    // costruttore di Legend
    function Legend(info){
        this._position = 'E';
        this._fontColor = '#000';
        this._backgroundColor = '#FFF';

        // imposta i valori dei campi dati se il JSON 'info' è definito, altrimenti lascia i valori di default
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

    // funzione che aggiorna i valori dei campi dati della legenda
    Legend.prototype.updateParameters = function(info){
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
    };

    Legend.prototype.getPosition = function(){
        return this._position; // ritorna la posizione della legenda
    };
    Legend.prototype.getFontColor = function(){
        return this._fontColor; // ritorna il colore del testo della legenda
    };
    Legend.prototype.getBackgroundColor = function(){
        return this._backgroundColor; // ritorna il colore di background della legenda
    };

    // costruttore di default di LegendFactory
    function LegendFactory() {}

    LegendFactory.build = function(info) {
        return new Legend(info); // ritorna una nuova istanza di Legend
    };
    
    return( LegendFactory );
});