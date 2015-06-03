"use strict";
var __cov_os6SKsuY__8LJzZG1Boexw = (Function('return this'))();
if (!__cov_os6SKsuY__8LJzZG1Boexw.__coverage__) { __cov_os6SKsuY__8LJzZG1Boexw.__coverage__ = {}; }
__cov_os6SKsuY__8LJzZG1Boexw = __cov_os6SKsuY__8LJzZG1Boexw.__coverage__;
if (!(__cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'])) {
   __cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js","s":{"1":0,"2":0,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"TableFlow","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":40}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":68}},"2":{"start":{"line":18,"column":0},"end":{"line":18,"column":30}},"3":{"start":{"line":20,"column":0},"end":{"line":29,"column":1}},"4":{"start":{"line":22,"column":1},"end":{"line":22,"column":35}},"5":{"start":{"line":23,"column":1},"end":{"line":25,"column":2}},"6":{"start":{"line":24,"column":2},"end":{"line":24,"column":9}},"7":{"start":{"line":27,"column":1},"end":{"line":27,"column":49}},"8":{"start":{"line":31,"column":0},"end":{"line":31,"column":52}},"9":{"start":{"line":32,"column":0},"end":{"line":32,"column":39}},"10":{"start":{"line":33,"column":0},"end":{"line":33,"column":44}},"11":{"start":{"line":35,"column":0},"end":{"line":35,"column":27}}},"branchMap":{"1":{"line":23,"type":"if","locations":[{"start":{"line":23,"column":1},"end":{"line":23,"column":1}},{"start":{"line":23,"column":1},"end":{"line":23,"column":1}}]}}};
}
__cov_os6SKsuY__8LJzZG1Boexw = __cov_os6SKsuY__8LJzZG1Boexw['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/tableFlow.js'];
__cov_os6SKsuY__8LJzZG1Boexw.s['1']++;
var TableFlowModel = require('../../dataTier/flow/tableFlowModel.js');
__cov_os6SKsuY__8LJzZG1Boexw.s['2']++;
var Flow = require('./flow.js');
function TableFlow(params, graphSocket) {
    __cov_os6SKsuY__8LJzZG1Boexw.f['1']++;
    __cov_os6SKsuY__8LJzZG1Boexw.s['4']++;
    var tf = new TableFlowModel(params);
    __cov_os6SKsuY__8LJzZG1Boexw.s['5']++;
    if (!tf.hasOwnProperty('_ID')) {
        __cov_os6SKsuY__8LJzZG1Boexw.b['1'][0]++;
        __cov_os6SKsuY__8LJzZG1Boexw.s['6']++;
        return;
    } else {
        __cov_os6SKsuY__8LJzZG1Boexw.b['1'][1]++;
    }
    __cov_os6SKsuY__8LJzZG1Boexw.s['7']++;
    this.parent.constructor.call(this, graphSocket);
}
__cov_os6SKsuY__8LJzZG1Boexw.s['8']++;
TableFlow.prototype = Object.create(Flow.prototype);
__cov_os6SKsuY__8LJzZG1Boexw.s['9']++;
TableFlow.prototype.constructor = Flow;
__cov_os6SKsuY__8LJzZG1Boexw.s['10']++;
TableFlow.prototype.parent = Flow.prototype;
__cov_os6SKsuY__8LJzZG1Boexw.s['11']++;
module.exports = TableFlow;
