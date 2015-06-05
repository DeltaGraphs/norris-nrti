"use strict";
var __cov_2FXO8YHpLOOieI8Fo_n_6A = (Function('return this'))();
if (!__cov_2FXO8YHpLOOieI8Fo_n_6A.__coverage__) { __cov_2FXO8YHpLOOieI8Fo_n_6A.__coverage__ = {}; }
__cov_2FXO8YHpLOOieI8Fo_n_6A = __cov_2FXO8YHpLOOieI8Fo_n_6A.__coverage__;
if (!(__cov_2FXO8YHpLOOieI8Fo_n_6A['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/pageList/pageListModel.js'])) {
   __cov_2FXO8YHpLOOieI8Fo_n_6A['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/pageList/pageListModel.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/pageList/pageListModel.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"PageListModel","line":18,"loc":{"start":{"line":18,"column":0},"end":{"line":18,"column":28}}},"2":{"name":"(anonymous_2)","line":26,"loc":{"start":{"line":26,"column":32},"end":{"line":26,"column":42}}},"3":{"name":"(anonymous_3)","line":41,"loc":{"start":{"line":41,"column":32},"end":{"line":41,"column":42}}},"4":{"name":"(anonymous_4)","line":45,"loc":{"start":{"line":45,"column":32},"end":{"line":45,"column":46}}}},"statementMap":{"1":{"start":{"line":16,"column":0},"end":{"line":16,"column":48}},"2":{"start":{"line":18,"column":0},"end":{"line":24,"column":1}},"3":{"start":{"line":19,"column":1},"end":{"line":21,"column":2}},"4":{"start":{"line":20,"column":2},"end":{"line":20,"column":9}},"5":{"start":{"line":22,"column":1},"end":{"line":22,"column":17}},"6":{"start":{"line":23,"column":1},"end":{"line":23,"column":16}},"7":{"start":{"line":26,"column":0},"end":{"line":39,"column":2}},"8":{"start":{"line":27,"column":1},"end":{"line":27,"column":21}},"9":{"start":{"line":28,"column":1},"end":{"line":28,"column":30}},"10":{"start":{"line":31,"column":1},"end":{"line":36,"column":2}},"11":{"start":{"line":32,"column":2},"end":{"line":35,"column":4}},"12":{"start":{"line":38,"column":1},"end":{"line":38,"column":21}},"13":{"start":{"line":41,"column":0},"end":{"line":43,"column":2}},"14":{"start":{"line":42,"column":1},"end":{"line":42,"column":19}},"15":{"start":{"line":45,"column":0},"end":{"line":52,"column":2}},"16":{"start":{"line":47,"column":1},"end":{"line":50,"column":2}},"17":{"start":{"line":48,"column":2},"end":{"line":48,"column":25}},"18":{"start":{"line":49,"column":2},"end":{"line":49,"column":14}},"19":{"start":{"line":51,"column":1},"end":{"line":51,"column":12}},"20":{"start":{"line":54,"column":0},"end":{"line":54,"column":31}}},"branchMap":{"1":{"line":19,"type":"if","locations":[{"start":{"line":19,"column":1},"end":{"line":19,"column":1}},{"start":{"line":19,"column":1},"end":{"line":19,"column":1}}]},"2":{"line":19,"type":"binary-expr","locations":[{"start":{"line":19,"column":5},"end":{"line":19,"column":29}},{"start":{"line":19,"column":33},"end":{"line":19,"column":49}}]},"3":{"line":47,"type":"if","locations":[{"start":{"line":47,"column":1},"end":{"line":47,"column":1}},{"start":{"line":47,"column":1},"end":{"line":47,"column":1}}]}}};
}
__cov_2FXO8YHpLOOieI8Fo_n_6A = __cov_2FXO8YHpLOOieI8Fo_n_6A['/home/travis/build/DeltaGraphs/norris-nrti/lib/dataTier/pageList/pageListModel.js'];
__cov_2FXO8YHpLOOieI8Fo_n_6A.s['1']++;
var PageModel = require('../page/pageModel.js');
function PageListModel(name) {
    __cov_2FXO8YHpLOOieI8Fo_n_6A.f['1']++;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['3']++;
    if ((__cov_2FXO8YHpLOOieI8Fo_n_6A.b['2'][0]++, typeof name !== 'string') || (__cov_2FXO8YHpLOOieI8Fo_n_6A.b['2'][1]++, name.trim() === '')) {
        __cov_2FXO8YHpLOOieI8Fo_n_6A.b['1'][0]++;
        __cov_2FXO8YHpLOOieI8Fo_n_6A.s['4']++;
        return;
    } else {
        __cov_2FXO8YHpLOOieI8Fo_n_6A.b['1'][1]++;
    }
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['5']++;
    this._name = name;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['6']++;
    this._pages = [];
}
__cov_2FXO8YHpLOOieI8Fo_n_6A.s['7']++;
PageListModel.prototype.getData = function () {
    __cov_2FXO8YHpLOOieI8Fo_n_6A.f['2']++;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['8']++;
    var pageListData = [];
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['9']++;
    var pages = this._pages.length;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['10']++;
    for (var i = 0; i < pages; i++) {
        __cov_2FXO8YHpLOOieI8Fo_n_6A.s['11']++;
        pageListData[i] = {
            properties: this._pages[i].getProperties(),
            data: this._pages[i].getData()
        };
    }
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['12']++;
    return pageListData;
};
__cov_2FXO8YHpLOOieI8Fo_n_6A.s['13']++;
PageListModel.prototype.getName = function () {
    __cov_2FXO8YHpLOOieI8Fo_n_6A.f['3']++;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['14']++;
    return this._name;
};
__cov_2FXO8YHpLOOieI8Fo_n_6A.s['15']++;
PageListModel.prototype.addPage = function (page) {
    __cov_2FXO8YHpLOOieI8Fo_n_6A.f['4']++;
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['16']++;
    if (page instanceof PageModel) {
        __cov_2FXO8YHpLOOieI8Fo_n_6A.b['3'][0]++;
        __cov_2FXO8YHpLOOieI8Fo_n_6A.s['17']++;
        this._pages.push(page);
        __cov_2FXO8YHpLOOieI8Fo_n_6A.s['18']++;
        return true;
    } else {
        __cov_2FXO8YHpLOOieI8Fo_n_6A.b['3'][1]++;
    }
    __cov_2FXO8YHpLOOieI8Fo_n_6A.s['19']++;
    return 511;
};
__cov_2FXO8YHpLOOieI8Fo_n_6A.s['20']++;
module.exports = PageListModel;