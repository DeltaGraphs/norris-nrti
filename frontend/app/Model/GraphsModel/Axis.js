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
* 1.0.0         2015-05-21  Maria Giovanna Chinellato   Tested
*
* 0.1.3         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
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

angular.module('norris-nrti')
.factory('AxisFactory', function(){

    // costruttore di Axis
    function Axis(info){
        // campi dati di axis e valori di default
        this._name = null;
        this._color = '#FFF';
        this._minValue = null;
        this._maxValue = null;
        this._ticks = 10;
        this._scale = 'linear';

        // controlla se ci sono dei campi dati da impostare, altrimenti crea un asse di default
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.color !== undefined) {
                this._color = info.color;
            }
            if (info.minIndex !== undefined) {
                this._minValue = info.minIndex;
            }
            if (info.maxIndex !== undefined) {
                this._maxValue = info.maxIndex;
            }
            if (info.ticks !== undefined) {
                this._ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this._scale = info.scale;
            }
        }
    }

    // funzine che aggiorna i campi dati di un asse
    Axis.prototype.updateParameters = function(info){
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.color !== undefined) {
                this._color = info.color;
            }
            if (info.minIndex !== undefined) {
                this._minValue = info.minIndex;
            }
            if (info.maxIndex !== undefined) {
                this._maxValue = info.maxIndex;
            }
            if (info.ticks !== undefined) {
                this._ticks = info.ticks;
            }
            if (info.scale !== undefined) {
                this._scale = info.scale;
            }
        }
    };

    Axis.prototype.getName = function(){
        return this._name; // ritorna il nome dell'asse
    };
    Axis.prototype.getColor = function(){
        return this._color; // ritona il colore dell'asse
    };
    Axis.prototype.getMinValue = function(){
        return this._minValue; // ritorna il minimo valore dell'asse
    };
    Axis.prototype.getMaxValue = function(){
        return this._maxValue; // ritorna il massimo valore dell'asse
    };
    Axis.prototype.getTicks = function(){
        return this._ticks; // ritorna il valore dei tick
    };
    Axis.prototype.getScale = function(){
        return this._scale; // ritorna la scale dell'asse
    };

    // costruttore di default di AxisFactory
    function AxisFactory() {}

    AxisFactory.build = function(info) {
        return new Axis(info); // ritorna l'istanza di un nuovo asse
    };
    return( AxisFactory );
});