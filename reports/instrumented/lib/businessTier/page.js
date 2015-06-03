"use strict";
var __cov_OjFr6qdlHhcdaTaGeI4PEQ = (Function('return this'))();
if (!__cov_OjFr6qdlHhcdaTaGeI4PEQ.__coverage__) { __cov_OjFr6qdlHhcdaTaGeI4PEQ.__coverage__ = {}; }
__cov_OjFr6qdlHhcdaTaGeI4PEQ = __cov_OjFr6qdlHhcdaTaGeI4PEQ.__coverage__;
if (!(__cov_OjFr6qdlHhcdaTaGeI4PEQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/page.js'])) {
   __cov_OjFr6qdlHhcdaTaGeI4PEQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/page.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/page.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"Page","line":17,"loc":{"start":{"line":17,"column":0},"end":{"line":17,"column":43}}},"2":{"name":"(anonymous_2)","line":25,"loc":{"start":{"line":25,"column":31},"end":{"line":25,"column":42}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":24,"column":1}},"2":{"start":{"line":18,"column":1},"end":{"line":21,"column":2}},"3":{"start":{"line":19,"column":2},"end":{"line":19,"column":28}},"4":{"start":{"line":20,"column":2},"end":{"line":20,"column":9}},"5":{"start":{"line":22,"column":1},"end":{"line":22,"column":37}},"6":{"start":{"line":23,"column":1},"end":{"line":23,"column":21}},"7":{"start":{"line":25,"column":0},"end":{"line":27,"column":2}},"8":{"start":{"line":28,"column":0},"end":{"line":28,"column":22}}},"branchMap":{"1":{"line":18,"type":"if","locations":[{"start":{"line":18,"column":1},"end":{"line":18,"column":1}},{"start":{"line":18,"column":1},"end":{"line":18,"column":1}}]},"2":{"line":18,"type":"binary-expr","locations":[{"start":{"line":18,"column":4},"end":{"line":18,"column":22}},{"start":{"line":18,"column":26},"end":{"line":18,"column":52}},{"start":{"line":18,"column":56},"end":{"line":18,"column":74}}]}}};
}
__cov_OjFr6qdlHhcdaTaGeI4PEQ = __cov_OjFr6qdlHhcdaTaGeI4PEQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/page.js'];
function Page(params, networkHandler, norris) {
    __cov_OjFr6qdlHhcdaTaGeI4PEQ.f['1']++;
    __cov_OjFr6qdlHhcdaTaGeI4PEQ.s['2']++;
    if ((__cov_OjFr6qdlHhcdaTaGeI4PEQ.b['2'][0]++, params === undefined) || (__cov_OjFr6qdlHhcdaTaGeI4PEQ.b['2'][1]++, networkHandler === undefined) || (__cov_OjFr6qdlHhcdaTaGeI4PEQ.b['2'][2]++, norris === undefined)) {
        __cov_OjFr6qdlHhcdaTaGeI4PEQ.b['1'][0]++;
        __cov_OjFr6qdlHhcdaTaGeI4PEQ.s['3']++;
        console.log('Error: 421');
        __cov_OjFr6qdlHhcdaTaGeI4PEQ.s['4']++;
        return;
    } else {
        __cov_OjFr6qdlHhcdaTaGeI4PEQ.b['1'][1]++;
    }
    __cov_OjFr6qdlHhcdaTaGeI4PEQ.s['5']++;
    this._networkHandler = networkHandler;
    __cov_OjFr6qdlHhcdaTaGeI4PEQ.s['6']++;
    this._norris = norris;
}
__cov_OjFr6qdlHhcdaTaGeI4PEQ.s['7']++;
Page.prototype.getConfigJSON = function () {
    __cov_OjFr6qdlHhcdaTaGeI4PEQ.f['2']++;
};
__cov_OjFr6qdlHhcdaTaGeI4PEQ.s['8']++;
module.exports = Page;
