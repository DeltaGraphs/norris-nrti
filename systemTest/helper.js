/*jshint node: true, -W106 */
'use strict';

/*
* Name : helper.js
* Module : SystemTest
* Location : /SystemTest
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-27   Filippo Rampado    Initial code
* =========================================================
*/

module.exports.newPage=function(norris, ID, title){
    var page=norris.createPage({
        ID: ID,
        name: title,
        description: title,
        graphsPerRow: 2,
        graphsPerCol: 10
    });
    return page;
};
module.exports.newBarChart=function(page, title){
    var barChart=page.createBarChart({
        ID: 'barChart',
        title: title,
        xAxis:{name: 'tempo'},
        yAxis:{name: 'pressione'},
        headers: ['h1','h2','h3','h4','h5'],
        enableLegend: true
    });
    return barChart;
};
module.exports.newLineChart=function(page, title){
    var lineChart=page.createLineChart({
        ID: 'lineChart',
        title: title,
        xAxis:{name: 'tempo'},
        yAxis:{name: 'temperatura'},
        enableLegend: true
    });
    return lineChart;
};
module.exports.newMapChart=function(page, title){
    var mapChart=page.createMapChart({
        ID: 'mapChart',
        title: title,
        latitude: 45.417467,
        longitude: 11.907246,
        enableLegend: true,
        mapWidth: 15000,
        mapHeight: 15000,
    });
    return mapChart;
};
module.exports.newTable=function(page, title){
    var table=page.createTable({
        ID: 'table',
        title: title,
        maxItemsPage: 20,
        headers: ['Col1', 'Col2', 'Col3'],
        enableLegend: true
    });
    return table;
};