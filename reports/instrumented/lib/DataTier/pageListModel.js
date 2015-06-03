"use strict";
var __cov_TXsvmscR5bL84YKQjrfU5A = (Function('return this'))();
if (!__cov_TXsvmscR5bL84YKQjrfU5A.__coverage__) { __cov_TXsvmscR5bL84YKQjrfU5A.__coverage__ = {}; }
__cov_TXsvmscR5bL84YKQjrfU5A = __cov_TXsvmscR5bL84YKQjrfU5A.__coverage__;
if (!(__cov_TXsvmscR5bL84YKQjrfU5A['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageListModel.js'])) {
   __cov_TXsvmscR5bL84YKQjrfU5A['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageListModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageListModel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"PageListModel","line":17,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":45}}},"2":{"name":"(anonymous_2)","line":24,"loc":{"start":{"line":24,"column":35},"end":{"line":24,"column":45}}},"3":{"name":"(anonymous_3)","line":28,"loc":{"start":{"line":28,"column":35},"end":{"line":28,"column":45}}},"4":{"name":"(anonymous_4)","line":43,"loc":{"start":{"line":43,"column":35},"end":{"line":43,"column":49}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":50,"column":2}},"2":{"start":{"line":18,"column":1},"end":{"line":20,"column":2}},"3":{"start":{"line":19,"column":2},"end":{"line":19,"column":14}},"4":{"start":{"line":21,"column":1},"end":{"line":21,"column":16}},"5":{"start":{"line":22,"column":1},"end":{"line":22,"column":15}},"6":{"start":{"line":24,"column":1},"end":{"line":26,"column":3}},"7":{"start":{"line":25,"column":2},"end":{"line":25,"column":15}},"8":{"start":{"line":28,"column":1},"end":{"line":41,"column":3}},"9":{"start":{"line":29,"column":2},"end":{"line":29,"column":22}},"10":{"start":{"line":30,"column":2},"end":{"line":30,"column":26}},"11":{"start":{"line":33,"column":2},"end":{"line":38,"column":3}},"12":{"start":{"line":34,"column":3},"end":{"line":37,"column":5}},"13":{"start":{"line":40,"column":2},"end":{"line":40,"column":22}},"14":{"start":{"line":43,"column":1},"end":{"line":49,"column":3}},"15":{"start":{"line":44,"column":2},"end":{"line":47,"column":3}},"16":{"start":{"line":45,"column":3},"end":{"line":45,"column":21}},"17":{"start":{"line":46,"column":3},"end":{"line":46,"column":15}},"18":{"start":{"line":48,"column":2},"end":{"line":48,"column":15}}},"branchMap":{"1":{"line":18,"type":"if","locations":[{"start":{"line":18,"column":1},"end":{"line":18,"column":1}},{"start":{"line":18,"column":1},"end":{"line":18,"column":1}}]},"2":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":2},"end":{"line":44,"column":2}},{"start":{"line":44,"column":2},"end":{"line":44,"column":2}}]}}};
}
__cov_TXsvmscR5bL84YKQjrfU5A = __cov_TXsvmscR5bL84YKQjrfU5A['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageListModel.js'];
__cov_TXsvmscR5bL84YKQjrfU5A.s['1']++;
module.export = function PageListModel(name) {
    __cov_TXsvmscR5bL84YKQjrfU5A.f['1']++;
    __cov_TXsvmscR5bL84YKQjrfU5A.s['2']++;
    if (typeof name !== 'string') {
        __cov_TXsvmscR5bL84YKQjrfU5A.b['1'][0]++;
        __cov_TXsvmscR5bL84YKQjrfU5A.s['3']++;
        return null;
    } else {
        __cov_TXsvmscR5bL84YKQjrfU5A.b['1'][1]++;
    }
    __cov_TXsvmscR5bL84YKQjrfU5A.s['4']++;
    var _name = name;
    __cov_TXsvmscR5bL84YKQjrfU5A.s['5']++;
    var _pages = [];
    __cov_TXsvmscR5bL84YKQjrfU5A.s['6']++;
    PageListModel.prototype.getName = function () {
        __cov_TXsvmscR5bL84YKQjrfU5A.f['2']++;
        __cov_TXsvmscR5bL84YKQjrfU5A.s['7']++;
        return _name;
    };
    __cov_TXsvmscR5bL84YKQjrfU5A.s['8']++;
    PageListModel.prototype.getData = function () {
        __cov_TXsvmscR5bL84YKQjrfU5A.f['3']++;
        __cov_TXsvmscR5bL84YKQjrfU5A.s['9']++;
        var pageListData = [];
        __cov_TXsvmscR5bL84YKQjrfU5A.s['10']++;
        var pages = _pages.length;
        __cov_TXsvmscR5bL84YKQjrfU5A.s['11']++;
        for (var i = 0; i < pages; i++) {
            __cov_TXsvmscR5bL84YKQjrfU5A.s['12']++;
            pageListData[i] = {
                properties: _pages.getProperties(),
                data: _pages.getData()
            };
        }
        __cov_TXsvmscR5bL84YKQjrfU5A.s['13']++;
        return pageListData;
    };
    __cov_TXsvmscR5bL84YKQjrfU5A.s['14']++;
    PageListModel.prototype.addPage = function (page) {
        __cov_TXsvmscR5bL84YKQjrfU5A.f['4']++;
        __cov_TXsvmscR5bL84YKQjrfU5A.s['15']++;
        if (page) {
            __cov_TXsvmscR5bL84YKQjrfU5A.b['2'][0]++;
            __cov_TXsvmscR5bL84YKQjrfU5A.s['16']++;
            _pages.push(page);
            __cov_TXsvmscR5bL84YKQjrfU5A.s['17']++;
            return true;
        } else {
            __cov_TXsvmscR5bL84YKQjrfU5A.b['2'][1]++;
        }
        __cov_TXsvmscR5bL84YKQjrfU5A.s['18']++;
        return false;
    };
};
