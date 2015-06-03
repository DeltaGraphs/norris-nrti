"use strict";
var __cov_FjxvoEgl7h8udhQ0nHtsYg = (Function('return this'))();
if (!__cov_FjxvoEgl7h8udhQ0nHtsYg.__coverage__) { __cov_FjxvoEgl7h8udhQ0nHtsYg.__coverage__ = {}; }
__cov_FjxvoEgl7h8udhQ0nHtsYg = __cov_FjxvoEgl7h8udhQ0nHtsYg.__coverage__;
if (!(__cov_FjxvoEgl7h8udhQ0nHtsYg['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/graphModel.js'])) {
   __cov_FjxvoEgl7h8udhQ0nHtsYg['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/graphModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/graphModel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"GraphModel","line":17,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":44}}},"2":{"name":"(anonymous_2)","line":40,"loc":{"start":{"line":40,"column":38},"end":{"line":40,"column":48}}},"3":{"name":"(anonymous_3)","line":49,"loc":{"start":{"line":49,"column":41},"end":{"line":49,"column":58}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":61,"column":2}},"2":{"start":{"line":18,"column":1},"end":{"line":18,"column":9}},"3":{"start":{"line":19,"column":1},"end":{"line":19,"column":15}},"4":{"start":{"line":20,"column":1},"end":{"line":20,"column":22}},"5":{"start":{"line":21,"column":1},"end":{"line":21,"column":13}},"6":{"start":{"line":25,"column":1},"end":{"line":27,"column":2}},"7":{"start":{"line":26,"column":2},"end":{"line":26,"column":14}},"8":{"start":{"line":28,"column":1},"end":{"line":28,"column":15}},"9":{"start":{"line":30,"column":1},"end":{"line":32,"column":2}},"10":{"start":{"line":31,"column":2},"end":{"line":31,"column":22}},"11":{"start":{"line":33,"column":1},"end":{"line":35,"column":2}},"12":{"start":{"line":34,"column":2},"end":{"line":34,"column":36}},"13":{"start":{"line":36,"column":1},"end":{"line":38,"column":2}},"14":{"start":{"line":37,"column":2},"end":{"line":37,"column":24}},"15":{"start":{"line":40,"column":1},"end":{"line":47,"column":3}},"16":{"start":{"line":41,"column":2},"end":{"line":46,"column":4}},"17":{"start":{"line":49,"column":1},"end":{"line":60,"column":3}},"18":{"start":{"line":51,"column":2},"end":{"line":53,"column":3}},"19":{"start":{"line":52,"column":3},"end":{"line":52,"column":23}},"20":{"start":{"line":54,"column":2},"end":{"line":56,"column":3}},"21":{"start":{"line":55,"column":3},"end":{"line":55,"column":37}},"22":{"start":{"line":57,"column":2},"end":{"line":59,"column":3}},"23":{"start":{"line":58,"column":3},"end":{"line":58,"column":25}}},"branchMap":{"1":{"line":25,"type":"if","locations":[{"start":{"line":25,"column":1},"end":{"line":25,"column":1}},{"start":{"line":25,"column":1},"end":{"line":25,"column":1}}]},"2":{"line":25,"type":"binary-expr","locations":[{"start":{"line":25,"column":4},"end":{"line":25,"column":25}},{"start":{"line":25,"column":29},"end":{"line":25,"column":45}}]},"3":{"line":30,"type":"if","locations":[{"start":{"line":30,"column":1},"end":{"line":30,"column":1}},{"start":{"line":30,"column":1},"end":{"line":30,"column":1}}]},"4":{"line":33,"type":"if","locations":[{"start":{"line":33,"column":1},"end":{"line":33,"column":1}},{"start":{"line":33,"column":1},"end":{"line":33,"column":1}}]},"5":{"line":36,"type":"if","locations":[{"start":{"line":36,"column":1},"end":{"line":36,"column":1}},{"start":{"line":36,"column":1},"end":{"line":36,"column":1}}]},"6":{"line":51,"type":"if","locations":[{"start":{"line":51,"column":2},"end":{"line":51,"column":2}},{"start":{"line":51,"column":2},"end":{"line":51,"column":2}}]},"7":{"line":54,"type":"if","locations":[{"start":{"line":54,"column":2},"end":{"line":54,"column":2}},{"start":{"line":54,"column":2},"end":{"line":54,"column":2}}]},"8":{"line":57,"type":"if","locations":[{"start":{"line":57,"column":2},"end":{"line":57,"column":2}},{"start":{"line":57,"column":2},"end":{"line":57,"column":2}}]}}};
}
__cov_FjxvoEgl7h8udhQ0nHtsYg = __cov_FjxvoEgl7h8udhQ0nHtsYg['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/graphModel.js'];
__cov_FjxvoEgl7h8udhQ0nHtsYg.s['1']++;
module.export = function GraphModel(params) {
    __cov_FjxvoEgl7h8udhQ0nHtsYg.f['1']++;
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['2']++;
    var _ID;
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['3']++;
    var _title = '';
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['4']++;
    var _enableLegend = '';
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['5']++;
    var _legend;
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['6']++;
    if ((__cov_FjxvoEgl7h8udhQ0nHtsYg.b['2'][0]++, params.ID === undefined) || (__cov_FjxvoEgl7h8udhQ0nHtsYg.b['2'][1]++, params.ID === '')) {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['1'][0]++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['7']++;
        return null;
    } else {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['1'][1]++;
    }
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['8']++;
    _ID = params.ID;
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['9']++;
    if (params.title !== undefined) {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['3'][0]++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['10']++;
        _title = params.title;
    } else {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['3'][1]++;
    }
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['11']++;
    if (params.enableLegend !== undefined) {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['4'][0]++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['12']++;
        _enableLegend = params.enableLegend;
    } else {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['4'][1]++;
    }
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['13']++;
    if (params.legend !== undefined) {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['5'][0]++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['14']++;
        _legend = params.legend;
    } else {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.b['5'][1]++;
    }
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['15']++;
    GraphModel.prototype.getProperties = function () {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.f['2']++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['16']++;
        return {
            ID: _ID,
            title: _title,
            enableLegend: _enableLegend,
            legend: _legend
        };
    };
    __cov_FjxvoEgl7h8udhQ0nHtsYg.s['17']++;
    GraphModel.prototype.updateProperties = function (params) {
        __cov_FjxvoEgl7h8udhQ0nHtsYg.f['3']++;
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['18']++;
        if (params.title !== undefined) {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['6'][0]++;
            __cov_FjxvoEgl7h8udhQ0nHtsYg.s['19']++;
            _title = params.title;
        } else {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['6'][1]++;
        }
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['20']++;
        if (params.enableLegend !== undefined) {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['7'][0]++;
            __cov_FjxvoEgl7h8udhQ0nHtsYg.s['21']++;
            _enableLegend = params.enableLegend;
        } else {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['7'][1]++;
        }
        __cov_FjxvoEgl7h8udhQ0nHtsYg.s['22']++;
        if (params.legend !== undefined) {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['8'][0]++;
            __cov_FjxvoEgl7h8udhQ0nHtsYg.s['23']++;
            _legend = params.legend;
        } else {
            __cov_FjxvoEgl7h8udhQ0nHtsYg.b['8'][1]++;
        }
    };
};
