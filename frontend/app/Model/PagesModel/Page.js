/*jshint node: true */
'use strict';

/*
* Name :  Page.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model/PagesModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.4         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.3         2015-05-14  Francesco Rossetto          Fix addGraph
*
* 0.1.2         2015-05-13  Francesco Rossetto          Fix constructor
*
* 0.1.1         2015-05-12  Francesco Rossetto          Fix methods
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code     
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('PageFactory', function(){

    // Costruttore di page
    function Page(info){
        // campi dati di Page e valori di default
        this._graphsList = [];
        this._name = 'Titolo di default';
        this._description = '';
        this._graphsPerRow = 1;
        this._graphsPerCol = 5;
        this._url = null;


        if (info !== undefined) { // controlla che un json sia definito, se non lo è non modifica nessun campo dati
            if (info.properties.name !== undefined) { // controlla che il campo 'name' sia definito
                this._name = info.properties.name; // imposta la proprietà name
            }
            if (info.properties.description !== undefined) { // controlla che il campo 'description' sia definito
                this._description = info.properties.description; // imposta la proprietà description
            }
            if (info.properties.graphsPerRow !== undefined) { // controlla che il campo 'graphsPerRow' sia definito
                this._graphsPerRow = info.properties.graphsPerRow; // imposta la proprietà graphsPerRow
            }
            if (info.properties.graphsPerCol !== undefined) { // controlla che il campo 'graphsPerCol' sia definito
                this._graphsPerCol = info.properties.graphsPerCol; // imposta la proprietà graphsPerCol
            }
            if (info.properties.socketURL !== undefined) { // controlla che il campo 'socketURL' sia definito
                this._url = info.properties.socketURL; // imposta la proprietà socketURL
            }
            if (info.data !== undefined) { // controlla che il campo 'data' sia definito
                for (var i=0; i<info.data.length; i++){
                    this.addGraph(info.data[i]); // aggiunge un grafico alla graphsList
                }
            }
        }
    }

    // funzione che aggiorna i campi dati prsenti nel JSON info
    Page.prototype.updateParameters = function(info){
        if (info !== undefined) {
            if (info.name !== undefined) {
                this._name = info.name;
            }
            if (info.description !== undefined) {
                this._description = info.description;
            }
            if (info.graphsPerRow !== undefined) {
                this._graphsPerRow = info.graphsPerRow;
            }
            if (info.graphsPerCol !== undefined) {
                this._graphsPerCol = info.graphsPerCol;
            }
        }
    };

    // funzione che inizializza i dati della pagina aggiungendo i grafici presenti nel JSON data alla lista dei grafici
    Page.prototype.initializeData = function(data) {
        if (data !== undefined) {
            for (var i=0; i<data.length; i++) {
                this.addGraph(data[i]);
            }
        }
    },
    // funzione che aggiunge un grafico a graphsList
    Page.prototype.addGraph = function(graph){
        if (graph !== undefined) { // controlla che il JSON sia definito
            var count = 0;
            for (var j=0; j<this._graphsList.length; j++) { // conta i grafici presenti nella lista che hanno lo stesso id del nuovo grafico
                if (this._graphsList[j].id === graph.ID){
                    count++;
                }
            }
            if (count === 0){ // controlla che non sia già presente nella lista un grafico con lo stesso id
                this._graphsList.push( {'id' : graph.ID, 'type' : graph.type, 'url' : graph.socketURL} );          
            }
        // error
        }
        // error
    };

    Page.prototype.getGraphsList = function(){
        return this._graphsList; // ritorna la lista dei grafici
    };
    Page.prototype.getName = function(){
        return this._name; // ritorna il nome della pagina
    };
    Page.prototype.getDescription = function(){
        return this._description; // ritorna la descrizione della pagina
    };
    Page.prototype.getGraphsPerRow = function(){
        return  this._graphsPerRow; // ritorna il numero di grafici visualizzabili per riga
    };
    Page.prototype.getGraphsPerCol = function(){
        return  this._graphsPerCol; // ritorna il numero di grafici visualizzabili per colonna
    };
    Page.prototype.getUrl = function(){
        return this._url; // ritorna l'url che invia i dati relativi alla pagina
    };

    // costruttore di default di PageFactory
    function PageFactory() {}

    PageFactory.build = function(info) {
        return new Page(info); // ritorna un'istanza di Page
    };

    return PageFactory;
});