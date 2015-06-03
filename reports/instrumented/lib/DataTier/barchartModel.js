"use strict";
var __cov_xQMGVZyBJoRic1MbL0B2XA = (Function('return this'))();
if (!__cov_xQMGVZyBJoRic1MbL0B2XA.__coverage__) { __cov_xQMGVZyBJoRic1MbL0B2XA.__coverage__ = {}; }
__cov_xQMGVZyBJoRic1MbL0B2XA = __cov_xQMGVZyBJoRic1MbL0B2XA.__coverage__;
if (!(__cov_xQMGVZyBJoRic1MbL0B2XA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/barchartModel.js'])) {
   __cov_xQMGVZyBJoRic1MbL0B2XA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/barchartModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/barchartModel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"BarChartModel","line":19,"loc":{"start":{"line":19,"column":16},"end":{"line":19,"column":47}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":41}},"2":{"start":{"line":19,"column":0},"end":{"line":44,"column":2}},"3":{"start":{"line":21,"column":1},"end":{"line":21,"column":50}},"4":{"start":{"line":23,"column":1},"end":{"line":23,"column":14}},"5":{"start":{"line":24,"column":1},"end":{"line":24,"column":24}},"6":{"start":{"line":25,"column":1},"end":{"line":25,"column":18}},"7":{"start":{"line":26,"column":1},"end":{"line":26,"column":12}},"8":{"start":{"line":27,"column":1},"end":{"line":27,"column":12}},"9":{"start":{"line":29,"column":1},"end":{"line":31,"column":2}},"10":{"start":{"line":30,"column":2},"end":{"line":30,"column":26}},"11":{"start":{"line":32,"column":1},"end":{"line":34,"column":2}},"12":{"start":{"line":33,"column":2},"end":{"line":33,"column":40}},"13":{"start":{"line":35,"column":1},"end":{"line":37,"column":2}},"14":{"start":{"line":36,"column":2},"end":{"line":36,"column":28}},"15":{"start":{"line":38,"column":1},"end":{"line":40,"column":2}},"16":{"start":{"line":39,"column":2},"end":{"line":39,"column":22}},"17":{"start":{"line":41,"column":1},"end":{"line":43,"column":2}},"18":{"start":{"line":42,"column":2},"end":{"line":42,"column":22}}},"branchMap":{"1":{"line":29,"type":"if","locations":[{"start":{"line":29,"column":1},"end":{"line":29,"column":1}},{"start":{"line":29,"column":1},"end":{"line":29,"column":1}}]},"2":{"line":32,"type":"if","locations":[{"start":{"line":32,"column":1},"end":{"line":32,"column":1}},{"start":{"line":32,"column":1},"end":{"line":32,"column":1}}]},"3":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":1},"end":{"line":35,"column":1}},{"start":{"line":35,"column":1},"end":{"line":35,"column":1}}]},"4":{"line":38,"type":"if","locations":[{"start":{"line":38,"column":1},"end":{"line":38,"column":1}},{"start":{"line":38,"column":1},"end":{"line":38,"column":1}}]},"5":{"line":41,"type":"if","locations":[{"start":{"line":41,"column":1},"end":{"line":41,"column":1}},{"start":{"line":41,"column":1},"end":{"line":41,"column":1}}]}}};
}
__cov_xQMGVZyBJoRic1MbL0B2XA = __cov_xQMGVZyBJoRic1MbL0B2XA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/barchartModel.js'];
__cov_xQMGVZyBJoRic1MbL0B2XA.s['1']++;
var GraphModel = require('./graphModel');
__cov_xQMGVZyBJoRic1MbL0B2XA.s['2']++;
module.export = function BarChartModel(params) {
    __cov_xQMGVZyBJoRic1MbL0B2XA.f['1']++;
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['3']++;
    BarChartModel.prototype = new GraphModel(params);
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['4']++;
    var _headers;
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['5']++;
    var _barOrientation = '';
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['6']++;
    var _sortable = '';
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['7']++;
    var _xAxis;
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['8']++;
    var _yAxis;
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['9']++;
    if (params.headers !== undefined) {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['1'][0]++;
        __cov_xQMGVZyBJoRic1MbL0B2XA.s['10']++;
        _headers = params.headers;
    } else {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['1'][1]++;
    }
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['11']++;
    if (params.barOrientation !== undefined) {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['2'][0]++;
        __cov_xQMGVZyBJoRic1MbL0B2XA.s['12']++;
        _barOrientation = params.barOrientation;
    } else {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['2'][1]++;
    }
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['13']++;
    if (params.sortable !== undefined) {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['3'][0]++;
        __cov_xQMGVZyBJoRic1MbL0B2XA.s['14']++;
        _sortable = params.sortable;
    } else {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['3'][1]++;
    }
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['15']++;
    if (params.xAxis !== undefined) {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['4'][0]++;
        __cov_xQMGVZyBJoRic1MbL0B2XA.s['16']++;
        _xAxis = params.xAxis;
    } else {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['4'][1]++;
    }
    __cov_xQMGVZyBJoRic1MbL0B2XA.s['17']++;
    if (params.yAxis !== undefined) {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['5'][0]++;
        __cov_xQMGVZyBJoRic1MbL0B2XA.s['18']++;
        _yAxis = params.yAxis;
    } else {
        __cov_xQMGVZyBJoRic1MbL0B2XA.b['5'][1]++;
    }
};
