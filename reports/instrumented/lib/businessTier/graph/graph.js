"use strict";
var __cov_J_Xm1Pd8gmPRaxTSqwyjQg = (Function('return this'))();
if (!__cov_J_Xm1Pd8gmPRaxTSqwyjQg.__coverage__) { __cov_J_Xm1Pd8gmPRaxTSqwyjQg.__coverage__ = {}; }
__cov_J_Xm1Pd8gmPRaxTSqwyjQg = __cov_J_Xm1Pd8gmPRaxTSqwyjQg.__coverage__;
if (!(__cov_J_Xm1Pd8gmPRaxTSqwyjQg['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/graph/graph.js'])) {
   __cov_J_Xm1Pd8gmPRaxTSqwyjQg['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/graph/graph.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/graph/graph.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"Graph","line":19,"loc":{"start":{"line":19,"column":0},"end":{"line":19,"column":34}}}},"statementMap":{"1":{"start":{"line":19,"column":0},"end":{"line":32,"column":1}},"2":{"start":{"line":20,"column":1},"end":{"line":23,"column":2}},"3":{"start":{"line":21,"column":2},"end":{"line":21,"column":28}},"4":{"start":{"line":22,"column":2},"end":{"line":22,"column":9}},"5":{"start":{"line":24,"column":1},"end":{"line":27,"column":2}},"6":{"start":{"line":25,"column":2},"end":{"line":25,"column":28}},"7":{"start":{"line":26,"column":2},"end":{"line":26,"column":9}},"8":{"start":{"line":28,"column":1},"end":{"line":28,"column":17}},"9":{"start":{"line":29,"column":1},"end":{"line":29,"column":31}},"10":{"start":{"line":31,"column":1},"end":{"line":31,"column":53}},"11":{"start":{"line":34,"column":0},"end":{"line":34,"column":23}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":1},"end":{"line":20,"column":1}},{"start":{"line":20,"column":1},"end":{"line":20,"column":1}}]},"2":{"line":20,"type":"binary-expr","locations":[{"start":{"line":20,"column":5},"end":{"line":20,"column":21}},{"start":{"line":20,"column":25},"end":{"line":20,"column":56}}]},"3":{"line":24,"type":"if","locations":[{"start":{"line":24,"column":1},"end":{"line":24,"column":1}},{"start":{"line":24,"column":1},"end":{"line":24,"column":1}}]},"4":{"line":24,"type":"binary-expr","locations":[{"start":{"line":24,"column":5},"end":{"line":24,"column":28}},{"start":{"line":24,"column":32},"end":{"line":24,"column":75}}]}}};
}
__cov_J_Xm1Pd8gmPRaxTSqwyjQg = __cov_J_Xm1Pd8gmPRaxTSqwyjQg['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/graph/graph.js'];
function Graph(page, graphSocket) {
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.f['1']++;
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['2']++;
    if ((__cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['2'][0]++, page === undefined) || (__cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['2'][1]++, !page.hasOwnProperty('_page'))) {
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['1'][0]++;
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['3']++;
        console.log('Error: 302');
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['4']++;
        return;
    } else {
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['1'][1]++;
    }
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['5']++;
    if ((__cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['4'][0]++, graphSocket === undefined) || (__cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['4'][1]++, !graphSocket.hasOwnProperty('_namespace'))) {
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['3'][0]++;
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['6']++;
        console.log('Error: 301');
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['7']++;
        return;
    } else {
        __cov_J_Xm1Pd8gmPRaxTSqwyjQg.b['3'][1]++;
    }
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['8']++;
    this._page = page;
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['9']++;
    this._graphSocket = graphSocket;
    __cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['10']++;
    this._graphSocket.attachObject(this, 'configGraph');
}
__cov_J_Xm1Pd8gmPRaxTSqwyjQg.s['11']++;
module.exports = Graph;
