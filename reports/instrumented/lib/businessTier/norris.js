"use strict";
var __cov_MRrwDuhWVcJt7u0WV0717A = (Function('return this'))();
if (!__cov_MRrwDuhWVcJt7u0WV0717A.__coverage__) { __cov_MRrwDuhWVcJt7u0WV0717A.__coverage__ = {}; }
__cov_MRrwDuhWVcJt7u0WV0717A = __cov_MRrwDuhWVcJt7u0WV0717A.__coverage__;
if (!(__cov_MRrwDuhWVcJt7u0WV0717A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/norris.js'])) {
   __cov_MRrwDuhWVcJt7u0WV0717A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/norris.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/norris.js","s":{"1":0,"2":0,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0},"b":{"1":[0,0],"2":[0,0,0,0,0,0,0,0,0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"Norris","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":40}}},"2":{"name":"(anonymous_2)","line":35,"loc":{"start":{"line":35,"column":30},"end":{"line":35,"column":47}}},"3":{"name":"(anonymous_3)","line":39,"loc":{"start":{"line":39,"column":33},"end":{"line":39,"column":44}}},"4":{"name":"(anonymous_4)","line":44,"loc":{"start":{"line":44,"column":31},"end":{"line":44,"column":48}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":50}},"2":{"start":{"line":18,"column":0},"end":{"line":18,"column":67}},"3":{"start":{"line":20,"column":0},"end":{"line":34,"column":1}},"4":{"start":{"line":21,"column":1},"end":{"line":28,"column":2}},"5":{"start":{"line":26,"column":2},"end":{"line":26,"column":28}},"6":{"start":{"line":27,"column":2},"end":{"line":27,"column":9}},"7":{"start":{"line":29,"column":1},"end":{"line":29,"column":15}},"8":{"start":{"line":30,"column":1},"end":{"line":30,"column":13}},"9":{"start":{"line":31,"column":1},"end":{"line":31,"column":59}},"10":{"start":{"line":32,"column":1},"end":{"line":32,"column":89}},"11":{"start":{"line":33,"column":1},"end":{"line":33,"column":58}},"12":{"start":{"line":35,"column":0},"end":{"line":38,"column":2}},"13":{"start":{"line":36,"column":1},"end":{"line":36,"column":21}},"14":{"start":{"line":39,"column":0},"end":{"line":43,"column":2}},"15":{"start":{"line":40,"column":1},"end":{"line":40,"column":35}},"16":{"start":{"line":41,"column":1},"end":{"line":41,"column":36}},"17":{"start":{"line":42,"column":1},"end":{"line":42,"column":13}},"18":{"start":{"line":44,"column":0},"end":{"line":46,"column":2}},"19":{"start":{"line":45,"column":1},"end":{"line":45,"column":21}},"20":{"start":{"line":47,"column":0},"end":{"line":47,"column":24}}},"branchMap":{"1":{"line":21,"type":"if","locations":[{"start":{"line":21,"column":1},"end":{"line":21,"column":1}},{"start":{"line":21,"column":1},"end":{"line":21,"column":1}}]},"2":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":4},"end":{"line":21,"column":19}},{"start":{"line":21,"column":23},"end":{"line":21,"column":37}},{"start":{"line":21,"column":41},"end":{"line":21,"column":62}},{"start":{"line":22,"column":2},"end":{"line":22,"column":25}},{"start":{"line":22,"column":29},"end":{"line":22,"column":55}},{"start":{"line":23,"column":2},"end":{"line":23,"column":24}},{"start":{"line":23,"column":28},"end":{"line":23,"column":47}},{"start":{"line":24,"column":2},"end":{"line":24,"column":31}},{"start":{"line":24,"column":35},"end":{"line":24,"column":53}},{"start":{"line":24,"column":57},"end":{"line":24,"column":83}}]}}};
}
__cov_MRrwDuhWVcJt7u0WV0717A = __cov_MRrwDuhWVcJt7u0WV0717A['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/norris.js'];
__cov_MRrwDuhWVcJt7u0WV0717A.s['1']++;
var NetworkHandler = require('./networkHandler.js');
__cov_MRrwDuhWVcJt7u0WV0717A.s['2']++;
var PageListModel = require('../dataTier/pageList/pageListModel.js');
function Norris(app, server, io, namespace) {
    __cov_MRrwDuhWVcJt7u0WV0717A.f['1']++;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['4']++;
    if ((__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][0]++, app === undefined) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][1]++, io === undefined) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][2]++, namespace === undefined) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][3]++, typeof app !== 'object') || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][4]++, app.lazyrouter === undefined) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][5]++, typeof io !== 'object') || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][6]++, io.nsps === undefined) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][7]++, typeof namespace !== 'string') || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][8]++, namespace.length < 2) || (__cov_MRrwDuhWVcJt7u0WV0717A.b['2'][9]++, namespace.indexOf('/') !== 0)) {
        __cov_MRrwDuhWVcJt7u0WV0717A.b['1'][0]++;
        __cov_MRrwDuhWVcJt7u0WV0717A.s['5']++;
        console.log('Error: 521');
        __cov_MRrwDuhWVcJt7u0WV0717A.s['6']++;
        return;
    } else {
        __cov_MRrwDuhWVcJt7u0WV0717A.b['1'][1]++;
    }
    __cov_MRrwDuhWVcJt7u0WV0717A.s['7']++;
    this._app = app;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['8']++;
    this._io = io;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['9']++;
    this._networkHandler = new NetworkHandler(app, io, namespace);
    __cov_MRrwDuhWVcJt7u0WV0717A.s['10']++;
    this._pageListSocket = this._networkHandler.createSocket(namespace, this, 'configPageList');
    __cov_MRrwDuhWVcJt7u0WV0717A.s['11']++;
    this._pageList = new PageListModel(namespace.substring(1));
}
__cov_MRrwDuhWVcJt7u0WV0717A.s['12']++;
Norris.prototype.createPage = function (params) {
    __cov_MRrwDuhWVcJt7u0WV0717A.f['2']++;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['13']++;
    console.log(params);
};
__cov_MRrwDuhWVcJt7u0WV0717A.s['14']++;
Norris.prototype.getConfigJSON = function () {
    __cov_MRrwDuhWVcJt7u0WV0717A.f['3']++;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['15']++;
    var data = this._pageList.getData();
    __cov_MRrwDuhWVcJt7u0WV0717A.s['16']++;
    data.name = this._pageList.getName();
    __cov_MRrwDuhWVcJt7u0WV0717A.s['17']++;
    return data;
};
__cov_MRrwDuhWVcJt7u0WV0717A.s['18']++;
Norris.prototype.pageChanged = function (params) {
    __cov_MRrwDuhWVcJt7u0WV0717A.f['4']++;
    __cov_MRrwDuhWVcJt7u0WV0717A.s['19']++;
    console.log(params);
};
__cov_MRrwDuhWVcJt7u0WV0717A.s['20']++;
module.exports = Norris;
