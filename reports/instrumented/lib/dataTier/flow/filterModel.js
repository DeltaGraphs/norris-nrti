"use strict";
var __cov_JA31cq5t5uVfkWmXx4Lrbg = (Function('return this'))();
if (!__cov_JA31cq5t5uVfkWmXx4Lrbg.__coverage__) { __cov_JA31cq5t5uVfkWmXx4Lrbg.__coverage__ = {}; }
__cov_JA31cq5t5uVfkWmXx4Lrbg = __cov_JA31cq5t5uVfkWmXx4Lrbg.__coverage__;
if (!(__cov_JA31cq5t5uVfkWmXx4Lrbg['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterModel.js'])) {
   __cov_JA31cq5t5uVfkWmXx4Lrbg['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterModel.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"FilterModel","line":18,"loc":{"start":{"line":18,"column":0},"end":{"line":18,"column":32}}},"2":{"name":"(anonymous_2)","line":42,"loc":{"start":{"line":42,"column":37},"end":{"line":42,"column":53}}},"3":{"name":"(anonymous_3)","line":50,"loc":{"start":{"line":50,"column":36},"end":{"line":50,"column":46}}}},"statementMap":{"1":{"start":{"line":16,"column":0},"end":{"line":16,"column":64}},"2":{"start":{"line":18,"column":0},"end":{"line":40,"column":1}},"3":{"start":{"line":19,"column":1},"end":{"line":22,"column":2}},"4":{"start":{"line":20,"column":2},"end":{"line":20,"column":28}},"5":{"start":{"line":21,"column":2},"end":{"line":21,"column":9}},"6":{"start":{"line":23,"column":1},"end":{"line":23,"column":30}},"7":{"start":{"line":24,"column":1},"end":{"line":24,"column":15}},"8":{"start":{"line":25,"column":1},"end":{"line":33,"column":2}},"9":{"start":{"line":26,"column":2},"end":{"line":26,"column":27}},"10":{"start":{"line":27,"column":2},"end":{"line":32,"column":3}},"11":{"start":{"line":28,"column":3},"end":{"line":28,"column":46}},"12":{"start":{"line":29,"column":3},"end":{"line":31,"column":4}},"13":{"start":{"line":30,"column":4},"end":{"line":30,"column":21}},"14":{"start":{"line":34,"column":1},"end":{"line":37,"column":2}},"15":{"start":{"line":35,"column":2},"end":{"line":35,"column":28}},"16":{"start":{"line":36,"column":2},"end":{"line":36,"column":9}},"17":{"start":{"line":38,"column":1},"end":{"line":38,"column":28}},"18":{"start":{"line":39,"column":1},"end":{"line":39,"column":25}},"19":{"start":{"line":42,"column":0},"end":{"line":49,"column":2}},"20":{"start":{"line":43,"column":1},"end":{"line":47,"column":2}},"21":{"start":{"line":44,"column":2},"end":{"line":46,"column":3}},"22":{"start":{"line":45,"column":3},"end":{"line":45,"column":16}},"23":{"start":{"line":48,"column":1},"end":{"line":48,"column":13}},"24":{"start":{"line":50,"column":0},"end":{"line":52,"column":2}},"25":{"start":{"line":51,"column":1},"end":{"line":51,"column":25}},"26":{"start":{"line":53,"column":0},"end":{"line":53,"column":29}}},"branchMap":{"1":{"line":19,"type":"if","locations":[{"start":{"line":19,"column":1},"end":{"line":19,"column":1}},{"start":{"line":19,"column":1},"end":{"line":19,"column":1}}]},"2":{"line":27,"type":"if","locations":[{"start":{"line":27,"column":2},"end":{"line":27,"column":2}},{"start":{"line":27,"column":2},"end":{"line":27,"column":2}}]},"3":{"line":29,"type":"if","locations":[{"start":{"line":29,"column":3},"end":{"line":29,"column":3}},{"start":{"line":29,"column":3},"end":{"line":29,"column":3}}]},"4":{"line":34,"type":"if","locations":[{"start":{"line":34,"column":1},"end":{"line":34,"column":1}},{"start":{"line":34,"column":1},"end":{"line":34,"column":1}}]},"5":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":2},"end":{"line":44,"column":2}},{"start":{"line":44,"column":2},"end":{"line":44,"column":2}}]}}};
}
__cov_JA31cq5t5uVfkWmXx4Lrbg = __cov_JA31cq5t5uVfkWmXx4Lrbg['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterModel.js'];
__cov_JA31cq5t5uVfkWmXx4Lrbg.s['1']++;
var FilterConditionModel = require('./filterConditionModel.js');
function FilterModel(textRules) {
    __cov_JA31cq5t5uVfkWmXx4Lrbg.f['1']++;
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['3']++;
    if (typeof textRules !== 'string') {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.b['1'][0]++;
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['4']++;
        console.log('Error: 621');
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['5']++;
        return;
    } else {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.b['1'][1]++;
    }
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['6']++;
    var arr = textRules.split(',');
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['7']++;
    var condit = [];
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['8']++;
    for (var key in arr) {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['9']++;
        arr[key] = arr[key].trim();
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['10']++;
        if (arr[key] !== '') {
            __cov_JA31cq5t5uVfkWmXx4Lrbg.b['2'][0]++;
            __cov_JA31cq5t5uVfkWmXx4Lrbg.s['11']++;
            var fcm = new FilterConditionModel(arr[key]);
            __cov_JA31cq5t5uVfkWmXx4Lrbg.s['12']++;
            if (fcm.hasOwnProperty('_operator')) {
                __cov_JA31cq5t5uVfkWmXx4Lrbg.b['3'][0]++;
                __cov_JA31cq5t5uVfkWmXx4Lrbg.s['13']++;
                condit.push(fcm);
            } else {
                __cov_JA31cq5t5uVfkWmXx4Lrbg.b['3'][1]++;
            }
        } else {
            __cov_JA31cq5t5uVfkWmXx4Lrbg.b['2'][1]++;
        }
    }
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['14']++;
    if (condit.length === 0) {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.b['4'][0]++;
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['15']++;
        console.log('Error: 622');
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['16']++;
        return;
    } else {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.b['4'][1]++;
    }
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['17']++;
    this._filterText = textRules;
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['18']++;
    this._conditions = condit;
}
__cov_JA31cq5t5uVfkWmXx4Lrbg.s['19']++;
FilterModel.prototype.validateRecord = function (record) {
    __cov_JA31cq5t5uVfkWmXx4Lrbg.f['2']++;
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['20']++;
    for (var key in this._conditions) {
        __cov_JA31cq5t5uVfkWmXx4Lrbg.s['21']++;
        if (this._conditions[key].validateRecord(record) === false) {
            __cov_JA31cq5t5uVfkWmXx4Lrbg.b['5'][0]++;
            __cov_JA31cq5t5uVfkWmXx4Lrbg.s['22']++;
            return false;
        } else {
            __cov_JA31cq5t5uVfkWmXx4Lrbg.b['5'][1]++;
        }
    }
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['23']++;
    return true;
};
__cov_JA31cq5t5uVfkWmXx4Lrbg.s['24']++;
FilterModel.prototype.getFilterText = function () {
    __cov_JA31cq5t5uVfkWmXx4Lrbg.f['3']++;
    __cov_JA31cq5t5uVfkWmXx4Lrbg.s['25']++;
    return this._filterText;
};
__cov_JA31cq5t5uVfkWmXx4Lrbg.s['26']++;
module.exports = FilterModel;
