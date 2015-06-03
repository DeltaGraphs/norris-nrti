"use strict";
var __cov_JrFijNJSailtec4MEVZEnA = (Function('return this'))();
if (!__cov_JrFijNJSailtec4MEVZEnA.__coverage__) { __cov_JrFijNJSailtec4MEVZEnA.__coverage__ = {}; }
__cov_JrFijNJSailtec4MEVZEnA = __cov_JrFijNJSailtec4MEVZEnA.__coverage__;
if (!(__cov_JrFijNJSailtec4MEVZEnA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/barChartModel.js'])) {
   __cov_JrFijNJSailtec4MEVZEnA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/barChartModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/barChartModel.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"BarChartModel","line":19,"loc":{"start":{"line":19,"column":0},"end":{"line":19,"column":31}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":41}},"2":{"start":{"line":19,"column":0},"end":{"line":44,"column":1}},"3":{"start":{"line":21,"column":1},"end":{"line":21,"column":50}},"4":{"start":{"line":23,"column":1},"end":{"line":23,"column":15}},"5":{"start":{"line":24,"column":1},"end":{"line":24,"column":25}},"6":{"start":{"line":25,"column":1},"end":{"line":25,"column":19}},"7":{"start":{"line":26,"column":1},"end":{"line":26,"column":13}},"8":{"start":{"line":27,"column":1},"end":{"line":27,"column":13}},"9":{"start":{"line":29,"column":1},"end":{"line":31,"column":2}},"10":{"start":{"line":30,"column":2},"end":{"line":30,"column":31}},"11":{"start":{"line":32,"column":1},"end":{"line":34,"column":2}},"12":{"start":{"line":33,"column":2},"end":{"line":33,"column":45}},"13":{"start":{"line":35,"column":1},"end":{"line":37,"column":2}},"14":{"start":{"line":36,"column":2},"end":{"line":36,"column":33}},"15":{"start":{"line":38,"column":1},"end":{"line":40,"column":2}},"16":{"start":{"line":39,"column":2},"end":{"line":39,"column":27}},"17":{"start":{"line":41,"column":1},"end":{"line":43,"column":2}},"18":{"start":{"line":42,"column":2},"end":{"line":42,"column":27}},"19":{"start":{"line":46,"column":0},"end":{"line":46,"column":31}}},"branchMap":{"1":{"line":29,"type":"if","locations":[{"start":{"line":29,"column":1},"end":{"line":29,"column":1}},{"start":{"line":29,"column":1},"end":{"line":29,"column":1}}]},"2":{"line":32,"type":"if","locations":[{"start":{"line":32,"column":1},"end":{"line":32,"column":1}},{"start":{"line":32,"column":1},"end":{"line":32,"column":1}}]},"3":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":1},"end":{"line":35,"column":1}},{"start":{"line":35,"column":1},"end":{"line":35,"column":1}}]},"4":{"line":38,"type":"if","locations":[{"start":{"line":38,"column":1},"end":{"line":38,"column":1}},{"start":{"line":38,"column":1},"end":{"line":38,"column":1}}]},"5":{"line":41,"type":"if","locations":[{"start":{"line":41,"column":1},"end":{"line":41,"column":1}},{"start":{"line":41,"column":1},"end":{"line":41,"column":1}}]}}};
}
__cov_JrFijNJSailtec4MEVZEnA = __cov_JrFijNJSailtec4MEVZEnA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/barChartModel.js'];
__cov_JrFijNJSailtec4MEVZEnA.s['1']++;
var GraphModel = require('./graphModel');
function BarChartModel(params) {
    __cov_JrFijNJSailtec4MEVZEnA.f['1']++;
    __cov_JrFijNJSailtec4MEVZEnA.s['3']++;
    BarChartModel.prototype = new GraphModel(params);
    __cov_JrFijNJSailtec4MEVZEnA.s['4']++;
    this._headers;
    __cov_JrFijNJSailtec4MEVZEnA.s['5']++;
    this._barOrientation = '';
    __cov_JrFijNJSailtec4MEVZEnA.s['6']++;
    this._sortable = '';
    __cov_JrFijNJSailtec4MEVZEnA.s['7']++;
    this._xAxis;
    __cov_JrFijNJSailtec4MEVZEnA.s['8']++;
    this._yAxis;
    __cov_JrFijNJSailtec4MEVZEnA.s['9']++;
    if (params.headers !== undefined) {
        __cov_JrFijNJSailtec4MEVZEnA.b['1'][0]++;
        __cov_JrFijNJSailtec4MEVZEnA.s['10']++;
        this._headers = params.headers;
    } else {
        __cov_JrFijNJSailtec4MEVZEnA.b['1'][1]++;
    }
    __cov_JrFijNJSailtec4MEVZEnA.s['11']++;
    if (params.barOrientation !== undefined) {
        __cov_JrFijNJSailtec4MEVZEnA.b['2'][0]++;
        __cov_JrFijNJSailtec4MEVZEnA.s['12']++;
        this._barOrientation = params.barOrientation;
    } else {
        __cov_JrFijNJSailtec4MEVZEnA.b['2'][1]++;
    }
    __cov_JrFijNJSailtec4MEVZEnA.s['13']++;
    if (params.sortable !== undefined) {
        __cov_JrFijNJSailtec4MEVZEnA.b['3'][0]++;
        __cov_JrFijNJSailtec4MEVZEnA.s['14']++;
        this._sortable = params.sortable;
    } else {
        __cov_JrFijNJSailtec4MEVZEnA.b['3'][1]++;
    }
    __cov_JrFijNJSailtec4MEVZEnA.s['15']++;
    if (params.xAxis !== undefined) {
        __cov_JrFijNJSailtec4MEVZEnA.b['4'][0]++;
        __cov_JrFijNJSailtec4MEVZEnA.s['16']++;
        this._xAxis = params.xAxis;
    } else {
        __cov_JrFijNJSailtec4MEVZEnA.b['4'][1]++;
    }
    __cov_JrFijNJSailtec4MEVZEnA.s['17']++;
    if (params.yAxis !== undefined) {
        __cov_JrFijNJSailtec4MEVZEnA.b['5'][0]++;
        __cov_JrFijNJSailtec4MEVZEnA.s['18']++;
        this._yAxis = params.yAxis;
    } else {
        __cov_JrFijNJSailtec4MEVZEnA.b['5'][1]++;
    }
}
__cov_JrFijNJSailtec4MEVZEnA.s['19']++;
module.exports = BarChartModel;
