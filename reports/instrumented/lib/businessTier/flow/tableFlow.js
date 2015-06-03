"use strict";
var __cov_os6SKsuY__8LJzZG1Boexw = (Function('return this'))();
if (!__cov_os6SKsuY__8LJzZG1Boexw.__coverage__) { __cov_os6SKsuY__8LJzZG1Boexw.__coverage__ = {}; }
__cov_os6SKsuY__8LJzZG1Boexw = __cov_os6SKsuY__8LJzZG1Boexw.__coverage__;
if (!(__cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'])) {
   __cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js","s":{"1":0,"2":0,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"TableFlow","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":40}}},"2":{"name":"(anonymous_2)","line":37,"loc":{"start":{"line":37,"column":32},"end":{"line":37,"column":48}}},"3":{"name":"(anonymous_3)","line":41,"loc":{"start":{"line":41,"column":35},"end":{"line":41,"column":55}}},"4":{"name":"(anonymous_4)","line":45,"loc":{"start":{"line":45,"column":41},"end":{"line":45,"column":51}}},"5":{"name":"(anonymous_5)","line":49,"loc":{"start":{"line":49,"column":39},"end":{"line":49,"column":55}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":68}},"2":{"start":{"line":18,"column":0},"end":{"line":18,"column":30}},"3":{"start":{"line":20,"column":0},"end":{"line":31,"column":1}},"4":{"start":{"line":21,"column":1},"end":{"line":24,"column":2}},"5":{"start":{"line":22,"column":2},"end":{"line":22,"column":28}},"6":{"start":{"line":23,"column":2},"end":{"line":23,"column":9}},"7":{"start":{"line":25,"column":1},"end":{"line":25,"column":35}},"8":{"start":{"line":26,"column":1},"end":{"line":28,"column":2}},"9":{"start":{"line":27,"column":2},"end":{"line":27,"column":9}},"10":{"start":{"line":29,"column":1},"end":{"line":29,"column":49}},"11":{"start":{"line":30,"column":1},"end":{"line":30,"column":24}},"12":{"start":{"line":33,"column":0},"end":{"line":33,"column":52}},"13":{"start":{"line":34,"column":0},"end":{"line":34,"column":39}},"14":{"start":{"line":35,"column":0},"end":{"line":35,"column":44}},"15":{"start":{"line":37,"column":0},"end":{"line":39,"column":2}},"16":{"start":{"line":41,"column":0},"end":{"line":43,"column":2}},"17":{"start":{"line":45,"column":0},"end":{"line":47,"column":2}},"18":{"start":{"line":49,"column":0},"end":{"line":51,"column":2}},"19":{"start":{"line":54,"column":0},"end":{"line":54,"column":27}}},"branchMap":{"1":{"line":21,"type":"if","locations":[{"start":{"line":21,"column":1},"end":{"line":21,"column":1}},{"start":{"line":21,"column":1},"end":{"line":21,"column":1}}]},"2":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":5},"end":{"line":21,"column":28}},{"start":{"line":21,"column":32},"end":{"line":21,"column":75}}]},"3":{"line":26,"type":"if","locations":[{"start":{"line":26,"column":1},"end":{"line":26,"column":1}},{"start":{"line":26,"column":1},"end":{"line":26,"column":1}}]}}};
}
__cov_os6SKsuY__8LJzZG1Boexw = __cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'];
__cov_os6SKsuY__8LJzZG1Boexw.s['1']++;
var TableFlowModel = require('../../dataTier/flow/tableFlowModel.js');
__cov_os6SKsuY__8LJzZG1Boexw.s['2']++;
var Flow = require('./flow.js');
function TableFlow(params, graphSocket) {
    __cov_os6SKsuY__8LJzZG1Boexw.f['1']++;
    __cov_os6SKsuY__8LJzZG1Boexw.s['4']++;
    if ((__cov_os6SKsuY__8LJzZG1Boexw.b['2'][0]++, graphSocket === undefined) || (__cov_os6SKsuY__8LJzZG1Boexw.b['2'][1]++, !graphSocket.hasOwnProperty('_namespace'))) {
        __cov_os6SKsuY__8LJzZG1Boexw.b['1'][0]++;
        __cov_os6SKsuY__8LJzZG1Boexw.s['5']++;
        console.log('Error: 201');
        __cov_os6SKsuY__8LJzZG1Boexw.s['6']++;
        return;
    } else {
        __cov_os6SKsuY__8LJzZG1Boexw.b['1'][1]++;
    }
    __cov_os6SKsuY__8LJzZG1Boexw.s['7']++;
    var tf = new TableFlowModel(params);
    __cov_os6SKsuY__8LJzZG1Boexw.s['8']++;
    if (!tf.hasOwnProperty('_ID')) {
        __cov_os6SKsuY__8LJzZG1Boexw.b['3'][0]++;
        __cov_os6SKsuY__8LJzZG1Boexw.s['9']++;
        return;
    } else {
        __cov_os6SKsuY__8LJzZG1Boexw.b['3'][1]++;
    }
    __cov_os6SKsuY__8LJzZG1Boexw.s['10']++;
    this.parent.constructor.call(this, graphSocket);
    __cov_os6SKsuY__8LJzZG1Boexw.s['11']++;
    this._dataTableFlow = tf;
}
__cov_os6SKsuY__8LJzZG1Boexw.s['12']++;
TableFlow.prototype = Object.create(Flow.prototype);
__cov_os6SKsuY__8LJzZG1Boexw.s['13']++;
TableFlow.prototype.constructor = Flow;
__cov_os6SKsuY__8LJzZG1Boexw.s['14']++;
TableFlow.prototype.parent = Flow.prototype;
__cov_os6SKsuY__8LJzZG1Boexw.s['15']++;
TableFlow.prototype.addRecord = function (record) {
    __cov_os6SKsuY__8LJzZG1Boexw.f['2']++;
};
__cov_os6SKsuY__8LJzZG1Boexw.s['16']++;
TableFlow.prototype.updateRecord = function (ID, record) {
    __cov_os6SKsuY__8LJzZG1Boexw.f['3']++;
};
__cov_os6SKsuY__8LJzZG1Boexw.s['17']++;
TableFlow.prototype.getReplaceDataJSON = function () {
    __cov_os6SKsuY__8LJzZG1Boexw.f['4']++;
};
__cov_os6SKsuY__8LJzZG1Boexw.s['18']++;
TableFlow.prototype.updateProperties = function (params) {
    __cov_os6SKsuY__8LJzZG1Boexw.f['5']++;
};
__cov_os6SKsuY__8LJzZG1Boexw.s['19']++;
module.exports = TableFlow;
