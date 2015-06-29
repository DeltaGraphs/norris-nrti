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

module.exports.newPage=function(norris, title){
    var page=norris.createPage({
        ID:'page1',
        name: title,
        description: 'Test Page',
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
        headers: ['h1','h2','h3','h4','h5']
    });
    return barChart;
};
module.exports.newLineChart=function(page, title){
    var lineChart=page.createLineChart({
        ID: 'lineChart',
        title: title,
        xAxis:{name: 'tempo'},
        yAxis:{name: 'temperatura'}
    });
    return lineChart;
};
module.exports.newMapChart=function(page, title){
    var lineChart=page.createLineChart({
        ID: 'mapChart',
        title: title,
        latitude: 45.4113311,
        longitude: 11.8876318
    });
    return lineChart;
};
module.exports.newTable=function(page, title){
    var lineChart=page.createLineChart({
        ID: 'table',
        title: title,
        maxItemsPage: 20,
        headers: ['1', '2', '3'],
    });
    return lineChart;
};