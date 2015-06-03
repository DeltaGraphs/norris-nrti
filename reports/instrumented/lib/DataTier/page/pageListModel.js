"use strict";
var __cov_0mhgun$6ukNWtxX9BSBFzA = (Function('return this'))();
if (!__cov_0mhgun$6ukNWtxX9BSBFzA.__coverage__) { __cov_0mhgun$6ukNWtxX9BSBFzA.__coverage__ = {}; }
__cov_0mhgun$6ukNWtxX9BSBFzA = __cov_0mhgun$6ukNWtxX9BSBFzA.__coverage__;
if (!(__cov_0mhgun$6ukNWtxX9BSBFzA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/page/pageListModel.js'])) {
   __cov_0mhgun$6ukNWtxX9BSBFzA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/page/pageListModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/page/pageListModel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"PageListModel","line":17,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":45}}},"2":{"name":"(anonymous_2)","line":24,"loc":{"start":{"line":24,"column":35},"end":{"line":24,"column":45}}},"3":{"name":"(anonymous_3)","line":39,"loc":{"start":{"line":39,"column":35},"end":{"line":39,"column":45}}},"4":{"name":"(anonymous_4)","line":43,"loc":{"start":{"line":43,"column":35},"end":{"line":43,"column":49}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":50,"column":2}},"2":{"start":{"line":18,"column":1},"end":{"line":20,"column":2}},"3":{"start":{"line":19,"column":2},"end":{"line":19,"column":14}},"4":{"start":{"line":21,"column":1},"end":{"line":21,"column":16}},"5":{"start":{"line":22,"column":1},"end":{"line":22,"column":15}},"6":{"start":{"line":24,"column":1},"end":{"line":37,"column":3}},"7":{"start":{"line":25,"column":2},"end":{"line":25,"column":22}},"8":{"start":{"line":26,"column":2},"end":{"line":26,"column":26}},"9":{"start":{"line":29,"column":2},"end":{"line":34,"column":3}},"10":{"start":{"line":30,"column":3},"end":{"line":33,"column":5}},"11":{"start":{"line":36,"column":2},"end":{"line":36,"column":22}},"12":{"start":{"line":39,"column":1},"end":{"line":41,"column":3}},"13":{"start":{"line":40,"column":2},"end":{"line":40,"column":15}},"14":{"start":{"line":43,"column":1},"end":{"line":49,"column":3}},"15":{"start":{"line":44,"column":2},"end":{"line":47,"column":3}},"16":{"start":{"line":45,"column":3},"end":{"line":45,"column":21}},"17":{"start":{"line":46,"column":3},"end":{"line":46,"column":15}},"18":{"start":{"line":48,"column":2},"end":{"line":48,"column":15}}},"branchMap":{"1":{"line":18,"type":"if","locations":[{"start":{"line":18,"column":1},"end":{"line":18,"column":1}},{"start":{"line":18,"column":1},"end":{"line":18,"column":1}}]},"2":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":2},"end":{"line":44,"column":2}},{"start":{"line":44,"column":2},"end":{"line":44,"column":2}}]}}};
}
__cov_0mhgun$6ukNWtxX9BSBFzA = __cov_0mhgun$6ukNWtxX9BSBFzA['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/page/pageListModel.js'];
__cov_0mhgun$6ukNWtxX9BSBFzA.s['1']++;
module.export = function PageListModel(name) {
    __cov_0mhgun$6ukNWtxX9BSBFzA.f['1']++;
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['2']++;
    if (typeof name !== 'string') {
        __cov_0mhgun$6ukNWtxX9BSBFzA.b['1'][0]++;
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['3']++;
        return null;
    } else {
        __cov_0mhgun$6ukNWtxX9BSBFzA.b['1'][1]++;
    }
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['4']++;
    var _name = name;
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['5']++;
    var _pages = [];
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['6']++;
    PageListModel.prototype.getData = function () {
        __cov_0mhgun$6ukNWtxX9BSBFzA.f['2']++;
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['7']++;
        var pageListData = [];
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['8']++;
        var pages = _pages.length;
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['9']++;
        for (var i = 0; i < pages; i++) {
            __cov_0mhgun$6ukNWtxX9BSBFzA.s['10']++;
            pageListData[i] = {
                properties: _pages.getProperties(),
                data: _pages.getData()
            };
        }
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['11']++;
        return pageListData;
    };
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['12']++;
    PageListModel.prototype.getName = function () {
        __cov_0mhgun$6ukNWtxX9BSBFzA.f['3']++;
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['13']++;
        return _name;
    };
    __cov_0mhgun$6ukNWtxX9BSBFzA.s['14']++;
    PageListModel.prototype.addPage = function (page) {
        __cov_0mhgun$6ukNWtxX9BSBFzA.f['4']++;
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['15']++;
        if (page) {
            __cov_0mhgun$6ukNWtxX9BSBFzA.b['2'][0]++;
            __cov_0mhgun$6ukNWtxX9BSBFzA.s['16']++;
            _pages.push(page);
            __cov_0mhgun$6ukNWtxX9BSBFzA.s['17']++;
            return true;
        } else {
            __cov_0mhgun$6ukNWtxX9BSBFzA.b['2'][1]++;
        }
        __cov_0mhgun$6ukNWtxX9BSBFzA.s['18']++;
        return false;
    };
};
