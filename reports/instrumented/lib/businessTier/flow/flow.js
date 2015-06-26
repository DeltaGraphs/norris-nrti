"use strict";
var __cov_VCE_of9sBfMMmpWtsJGa3A = (Function('return this'))();
if (!__cov_VCE_of9sBfMMmpWtsJGa3A.__coverage__) { __cov_VCE_of9sBfMMmpWtsJGa3A.__coverage__ = {}; }
__cov_VCE_of9sBfMMmpWtsJGa3A = __cov_VCE_of9sBfMMmpWtsJGa3A.__coverage__;
if (!(__cov_VCE_of9sBfMMmpWtsJGa3A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/flow.js'])) {
   __cov_VCE_of9sBfMMmpWtsJGa3A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/flow.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/flow.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"Flow","line":18,"loc":{"start":{"line":18,"column":0},"end":{"line":18,"column":27}}}},"statementMap":{"1":{"start":{"line":18,"column":0},"end":{"line":27,"column":1}},"2":{"start":{"line":20,"column":1},"end":{"line":24,"column":2}},"3":{"start":{"line":22,"column":2},"end":{"line":22,"column":28}},"4":{"start":{"line":23,"column":2},"end":{"line":23,"column":9}},"5":{"start":{"line":26,"column":1},"end":{"line":26,"column":31}},"6":{"start":{"line":29,"column":0},"end":{"line":29,"column":22}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":1},"end":{"line":20,"column":1}},{"start":{"line":20,"column":1},"end":{"line":20,"column":1}}]},"2":{"line":20,"type":"binary-expr","locations":[{"start":{"line":20,"column":5},"end":{"line":20,"column":28}},{"start":{"line":20,"column":32},"end":{"line":20,"column":75}}]}}};
}
__cov_VCE_of9sBfMMmpWtsJGa3A = __cov_VCE_of9sBfMMmpWtsJGa3A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/flow/flow.js'];
function Flow(graphSocket) {
    __cov_VCE_of9sBfMMmpWtsJGa3A.f['1']++;
    __cov_VCE_of9sBfMMmpWtsJGa3A.s['2']++;
    if ((__cov_VCE_of9sBfMMmpWtsJGa3A.b['2'][0]++, graphSocket === undefined) || (__cov_VCE_of9sBfMMmpWtsJGa3A.b['2'][1]++, !graphSocket.hasOwnProperty('_namespace'))) {
        __cov_VCE_of9sBfMMmpWtsJGa3A.b['1'][0]++;
        __cov_VCE_of9sBfMMmpWtsJGa3A.s['3']++;
        console.log('Error: 201');
        __cov_VCE_of9sBfMMmpWtsJGa3A.s['4']++;
        return;
    } else {
        __cov_VCE_of9sBfMMmpWtsJGa3A.b['1'][1]++;
    }
    __cov_VCE_of9sBfMMmpWtsJGa3A.s['5']++;
    this._graphSocket = graphSocket;
}
__cov_VCE_of9sBfMMmpWtsJGa3A.s['6']++;
module.exports = Flow;
