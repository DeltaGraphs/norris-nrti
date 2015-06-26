"use strict";
var __cov_wBoC1Y5MKBtzn3o3NWFtfA = (Function('return this'))();
if (!__cov_wBoC1Y5MKBtzn3o3NWFtfA.__coverage__) { __cov_wBoC1Y5MKBtzn3o3NWFtfA.__coverage__ = {}; }
__cov_wBoC1Y5MKBtzn3o3NWFtfA = __cov_wBoC1Y5MKBtzn3o3NWFtfA.__coverage__;
if (!(__cov_wBoC1Y5MKBtzn3o3NWFtfA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/legendModel.js'])) {
   __cov_wBoC1Y5MKBtzn3o3NWFtfA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/legendModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/legendModel.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0,0,0,0,0,0,0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"LegendModel","line":19,"loc":{"start":{"line":19,"column":0},"end":{"line":19,"column":29}}},"2":{"name":"(anonymous_2)","line":28,"loc":{"start":{"line":28,"column":36},"end":{"line":28,"column":46}}},"3":{"name":"(anonymous_3)","line":37,"loc":{"start":{"line":37,"column":39},"end":{"line":37,"column":55}}}},"statementMap":{"1":{"start":{"line":16,"column":0},"end":{"line":16,"column":56}},"2":{"start":{"line":19,"column":0},"end":{"line":25,"column":1}},"3":{"start":{"line":20,"column":1},"end":{"line":20,"column":21}},"4":{"start":{"line":21,"column":1},"end":{"line":21,"column":27}},"5":{"start":{"line":22,"column":1},"end":{"line":22,"column":33}},"6":{"start":{"line":24,"column":1},"end":{"line":24,"column":31}},"7":{"start":{"line":28,"column":0},"end":{"line":34,"column":2}},"8":{"start":{"line":29,"column":1},"end":{"line":33,"column":3}},"9":{"start":{"line":37,"column":0},"end":{"line":57,"column":2}},"10":{"start":{"line":38,"column":1},"end":{"line":56,"column":2}},"11":{"start":{"line":39,"column":2},"end":{"line":49,"column":3}},"12":{"start":{"line":48,"column":3},"end":{"line":48,"column":34}},"13":{"start":{"line":50,"column":2},"end":{"line":52,"column":3}},"14":{"start":{"line":51,"column":3},"end":{"line":51,"column":36}},"15":{"start":{"line":53,"column":2},"end":{"line":55,"column":3}},"16":{"start":{"line":54,"column":3},"end":{"line":54,"column":48}},"17":{"start":{"line":59,"column":0},"end":{"line":59,"column":29}}},"branchMap":{"1":{"line":38,"type":"if","locations":[{"start":{"line":38,"column":1},"end":{"line":38,"column":1}},{"start":{"line":38,"column":1},"end":{"line":38,"column":1}}]},"2":{"line":39,"type":"if","locations":[{"start":{"line":39,"column":2},"end":{"line":39,"column":2}},{"start":{"line":39,"column":2},"end":{"line":39,"column":2}}]},"3":{"line":39,"type":"binary-expr","locations":[{"start":{"line":39,"column":5},"end":{"line":39,"column":32}},{"start":{"line":40,"column":4},"end":{"line":40,"column":27}},{"start":{"line":41,"column":4},"end":{"line":41,"column":27}},{"start":{"line":42,"column":4},"end":{"line":42,"column":27}},{"start":{"line":43,"column":4},"end":{"line":43,"column":27}},{"start":{"line":44,"column":4},"end":{"line":44,"column":28}},{"start":{"line":45,"column":4},"end":{"line":45,"column":28}},{"start":{"line":46,"column":4},"end":{"line":46,"column":28}},{"start":{"line":47,"column":4},"end":{"line":47,"column":28}}]},"4":{"line":50,"type":"if","locations":[{"start":{"line":50,"column":2},"end":{"line":50,"column":2}},{"start":{"line":50,"column":2},"end":{"line":50,"column":2}}]},"5":{"line":50,"type":"binary-expr","locations":[{"start":{"line":50,"column":5},"end":{"line":50,"column":33}},{"start":{"line":50,"column":37},"end":{"line":50,"column":67}}]},"6":{"line":53,"type":"if","locations":[{"start":{"line":53,"column":2},"end":{"line":53,"column":2}},{"start":{"line":53,"column":2},"end":{"line":53,"column":2}}]},"7":{"line":53,"type":"binary-expr","locations":[{"start":{"line":53,"column":5},"end":{"line":53,"column":39}},{"start":{"line":53,"column":43},"end":{"line":53,"column":79}}]}}};
}
__cov_wBoC1Y5MKBtzn3o3NWFtfA = __cov_wBoC1Y5MKBtzn3o3NWFtfA['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/graph/legendModel.js'];
__cov_wBoC1Y5MKBtzn3o3NWFtfA.s['1']++;
var Helper = require('../../helpers/functionHelper.js');
function LegendModel(params) {
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.f['1']++;
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['3']++;
    this._position = 'NE';
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['4']++;
    this._fontColor = '#000000';
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['5']++;
    this._backgroundColor = '#FFFFFF';
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['6']++;
    this.updateProperties(params);
}
__cov_wBoC1Y5MKBtzn3o3NWFtfA.s['7']++;
LegendModel.prototype.getProperties = function () {
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.f['2']++;
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['8']++;
    return {
        position: this._position,
        fontColor: this._fontColor,
        backgroundColor: this._backgroundColor
    };
};
__cov_wBoC1Y5MKBtzn3o3NWFtfA.s['9']++;
LegendModel.prototype.updateProperties = function (params) {
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.f['3']++;
    __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['10']++;
    if (params !== undefined) {
        __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['1'][0]++;
        __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['11']++;
        if ((__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][0]++, params.position !== undefined) && ((__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][1]++, params.position === 'N') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][2]++, params.position === 'E') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][3]++, params.position === 'W') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][4]++, params.position === 'S') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][5]++, params.position === 'NE') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][6]++, params.position === 'NW') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][7]++, params.position === 'SE') || (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['3'][8]++, params.position === 'SW'))) {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['2'][0]++;
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['12']++;
            this._position = params.position;
        } else {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['2'][1]++;
        }
        __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['13']++;
        if ((__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['5'][0]++, params.fontColor !== undefined) && (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['5'][1]++, Helper.isHEX(params.fontColor))) {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['4'][0]++;
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['14']++;
            this._fontColor = params.fontColor;
        } else {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['4'][1]++;
        }
        __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['15']++;
        if ((__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['7'][0]++, params.backgroundColor !== undefined) && (__cov_wBoC1Y5MKBtzn3o3NWFtfA.b['7'][1]++, Helper.isHEX(params.backgroundColor))) {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['6'][0]++;
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.s['16']++;
            this._backgroundColor = params.backgroundColor;
        } else {
            __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['6'][1]++;
        }
    } else {
        __cov_wBoC1Y5MKBtzn3o3NWFtfA.b['1'][1]++;
    }
};
__cov_wBoC1Y5MKBtzn3o3NWFtfA.s['17']++;
module.exports = LegendModel;
