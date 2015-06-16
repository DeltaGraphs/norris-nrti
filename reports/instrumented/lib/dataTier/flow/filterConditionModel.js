"use strict";
var __cov_CMxrj7p_8tL2u_sxZ9v1_g = (Function('return this'))();
if (!__cov_CMxrj7p_8tL2u_sxZ9v1_g.__coverage__) { __cov_CMxrj7p_8tL2u_sxZ9v1_g.__coverage__ = {}; }
__cov_CMxrj7p_8tL2u_sxZ9v1_g = __cov_CMxrj7p_8tL2u_sxZ9v1_g.__coverage__;
if (!(__cov_CMxrj7p_8tL2u_sxZ9v1_g['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterConditionModel.js'])) {
   __cov_CMxrj7p_8tL2u_sxZ9v1_g['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterConditionModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterConditionModel.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},"b":{"1":[0,0],"2":[0,0,0],"3":[0,0],"4":[0,0],"5":[0,0,0],"6":[0,0,0,0,0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"FilterConditionModel","line":19,"loc":{"start":{"line":19,"column":0},"end":{"line":19,"column":36}}},"2":{"name":"(anonymous_2)","line":34,"loc":{"start":{"line":34,"column":46},"end":{"line":34,"column":62}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":52}},"2":{"start":{"line":19,"column":0},"end":{"line":32,"column":1}},"3":{"start":{"line":20,"column":1},"end":{"line":23,"column":2}},"4":{"start":{"line":21,"column":2},"end":{"line":21,"column":28}},"5":{"start":{"line":22,"column":2},"end":{"line":22,"column":9}},"6":{"start":{"line":24,"column":1},"end":{"line":24,"column":36}},"7":{"start":{"line":25,"column":1},"end":{"line":28,"column":2}},"8":{"start":{"line":26,"column":2},"end":{"line":26,"column":28}},"9":{"start":{"line":27,"column":2},"end":{"line":27,"column":9}},"10":{"start":{"line":29,"column":1},"end":{"line":29,"column":22}},"11":{"start":{"line":30,"column":1},"end":{"line":30,"column":32}},"12":{"start":{"line":31,"column":1},"end":{"line":31,"column":26}},"13":{"start":{"line":34,"column":0},"end":{"line":52,"column":2}},"14":{"start":{"line":35,"column":1},"end":{"line":37,"column":2}},"15":{"start":{"line":36,"column":2},"end":{"line":36,"column":15}},"16":{"start":{"line":38,"column":1},"end":{"line":51,"column":2}},"17":{"start":{"line":40,"column":2},"end":{"line":40,"column":41}},"18":{"start":{"line":42,"column":2},"end":{"line":42,"column":42}},"19":{"start":{"line":44,"column":2},"end":{"line":44,"column":41}},"20":{"start":{"line":46,"column":2},"end":{"line":46,"column":42}},"21":{"start":{"line":48,"column":2},"end":{"line":48,"column":43}},"22":{"start":{"line":50,"column":2},"end":{"line":50,"column":43}},"23":{"start":{"line":53,"column":0},"end":{"line":53,"column":38}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":1},"end":{"line":20,"column":1}},{"start":{"line":20,"column":1},"end":{"line":20,"column":1}}]},"2":{"line":20,"type":"binary-expr","locations":[{"start":{"line":20,"column":4},"end":{"line":20,"column":20}},{"start":{"line":20,"column":24},"end":{"line":20,"column":48}},{"start":{"line":20,"column":52},"end":{"line":20,"column":72}}]},"3":{"line":25,"type":"if","locations":[{"start":{"line":25,"column":1},"end":{"line":25,"column":1}},{"start":{"line":25,"column":1},"end":{"line":25,"column":1}}]},"4":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":1},"end":{"line":35,"column":1}},{"start":{"line":35,"column":1},"end":{"line":35,"column":1}}]},"5":{"line":35,"type":"binary-expr","locations":[{"start":{"line":35,"column":4},"end":{"line":35,"column":22}},{"start":{"line":35,"column":26},"end":{"line":35,"column":39}},{"start":{"line":35,"column":43},"end":{"line":35,"column":72}}]},"6":{"line":38,"type":"switch","locations":[{"start":{"line":39,"column":1},"end":{"line":40,"column":41}},{"start":{"line":41,"column":1},"end":{"line":42,"column":42}},{"start":{"line":43,"column":1},"end":{"line":44,"column":41}},{"start":{"line":45,"column":1},"end":{"line":46,"column":42}},{"start":{"line":47,"column":1},"end":{"line":48,"column":43}},{"start":{"line":49,"column":1},"end":{"line":50,"column":43}}]}}};
}
__cov_CMxrj7p_8tL2u_sxZ9v1_g = __cov_CMxrj7p_8tL2u_sxZ9v1_g['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/flow/filterConditionModel.js'];
__cov_CMxrj7p_8tL2u_sxZ9v1_g.s['1']++;
var HF = require('../../helpers/functionHelper.js');
function FilterConditionModel(cond) {
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.f['1']++;
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['3']++;
    if ((__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['2'][0]++, cond === undefined) || (__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['2'][1]++, typeof cond !== 'string') || (__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['2'][2]++, cond.trim().length < 3)) {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['1'][0]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['4']++;
        console.log('Error: 611');
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['5']++;
        return;
    } else {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['1'][1]++;
    }
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['6']++;
    var parsed = HF.parseCondition(cond);
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['7']++;
    if (typeof parsed === 'number') {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['3'][0]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['8']++;
        console.log('Error: 612');
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['9']++;
        return;
    } else {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['3'][1]++;
    }
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['10']++;
    this._key = parsed.key;
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['11']++;
    this._operator = parsed.operator;
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['12']++;
    this._value = parsed.value;
}
__cov_CMxrj7p_8tL2u_sxZ9v1_g.s['13']++;
FilterConditionModel.prototype.validateRecord = function (record) {
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.f['2']++;
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['14']++;
    if ((__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['5'][0]++, record === undefined) || (__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['5'][1]++, record === null) || (__cov_CMxrj7p_8tL2u_sxZ9v1_g.b['5'][2]++, record[this._key] === undefined)) {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['4'][0]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['15']++;
        return false;
    } else {
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['4'][1]++;
    }
    __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['16']++;
    switch (this._operator) {
    case '>':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][0]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['17']++;
        return record[this._key] > this._value;
    case '>=':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][1]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['18']++;
        return record[this._key] >= this._value;
    case '<':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][2]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['19']++;
        return record[this._key] < this._value;
    case '<=':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][3]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['20']++;
        return record[this._key] <= this._value;
    case '==':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][4]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['21']++;
        return record[this._key] === this._value;
    case '!=':
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.b['6'][5]++;
        __cov_CMxrj7p_8tL2u_sxZ9v1_g.s['22']++;
        return record[this._key] !== this._value;
    }
};
__cov_CMxrj7p_8tL2u_sxZ9v1_g.s['23']++;
module.exports = FilterConditionModel;
