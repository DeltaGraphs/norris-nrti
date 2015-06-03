"use strict";
var __cov_npY9XBTYUVd0SiOTMslt8g = (Function('return this'))();
if (!__cov_npY9XBTYUVd0SiOTMslt8g.__coverage__) { __cov_npY9XBTYUVd0SiOTMslt8g.__coverage__ = {}; }
__cov_npY9XBTYUVd0SiOTMslt8g = __cov_npY9XBTYUVd0SiOTMslt8g.__coverage__;
if (!(__cov_npY9XBTYUVd0SiOTMslt8g['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/networkHandler.js'])) {
   __cov_npY9XBTYUVd0SiOTMslt8g['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/networkHandler.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/networkHandler.js","s":{"1":0,"2":0,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0},"b":{"1":[0,0],"2":[0,0,0,0,0,0,0,0,0],"3":[0,0],"4":[0,0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"NetworkHandler","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":47}}},"2":{"name":"(anonymous_2)","line":35,"loc":{"start":{"line":35,"column":44},"end":{"line":35,"column":68}}},"3":{"name":"(anonymous_3)","line":41,"loc":{"start":{"line":41,"column":40},"end":{"line":41,"column":75}}}},"statementMap":{"1":{"start":{"line":17,"column":0},"end":{"line":17,"column":52}},"2":{"start":{"line":18,"column":0},"end":{"line":18,"column":52}},"3":{"start":{"line":20,"column":0},"end":{"line":34,"column":1}},"4":{"start":{"line":21,"column":1},"end":{"line":28,"column":2}},"5":{"start":{"line":26,"column":2},"end":{"line":26,"column":28}},"6":{"start":{"line":27,"column":2},"end":{"line":27,"column":9}},"7":{"start":{"line":29,"column":1},"end":{"line":29,"column":15}},"8":{"start":{"line":30,"column":1},"end":{"line":30,"column":13}},"9":{"start":{"line":31,"column":1},"end":{"line":31,"column":39}},"10":{"start":{"line":32,"column":1},"end":{"line":32,"column":58}},"11":{"start":{"line":33,"column":1},"end":{"line":33,"column":63}},"12":{"start":{"line":35,"column":0},"end":{"line":40,"column":2}},"13":{"start":{"line":36,"column":1},"end":{"line":38,"column":2}},"14":{"start":{"line":37,"column":2},"end":{"line":37,"column":15}},"15":{"start":{"line":39,"column":1},"end":{"line":39,"column":58}},"16":{"start":{"line":41,"column":0},"end":{"line":45,"column":2}},"17":{"start":{"line":42,"column":1},"end":{"line":42,"column":41}},"18":{"start":{"line":43,"column":1},"end":{"line":43,"column":54}},"19":{"start":{"line":44,"column":1},"end":{"line":44,"column":13}},"20":{"start":{"line":46,"column":0},"end":{"line":46,"column":32}}},"branchMap":{"1":{"line":21,"type":"if","locations":[{"start":{"line":21,"column":1},"end":{"line":21,"column":1}},{"start":{"line":21,"column":1},"end":{"line":21,"column":1}}]},"2":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":4},"end":{"line":21,"column":19}},{"start":{"line":21,"column":23},"end":{"line":21,"column":37}},{"start":{"line":21,"column":41},"end":{"line":21,"column":68}},{"start":{"line":22,"column":2},"end":{"line":22,"column":25}},{"start":{"line":22,"column":29},"end":{"line":22,"column":67}},{"start":{"line":23,"column":2},"end":{"line":23,"column":24}},{"start":{"line":23,"column":28},"end":{"line":23,"column":66}},{"start":{"line":24,"column":2},"end":{"line":24,"column":37}},{"start":{"line":24,"column":41},"end":{"line":24,"column":65}}]},"3":{"line":36,"type":"if","locations":[{"start":{"line":36,"column":1},"end":{"line":36,"column":1}},{"start":{"line":36,"column":1},"end":{"line":36,"column":1}}]},"4":{"line":36,"type":"binary-expr","locations":[{"start":{"line":36,"column":4},"end":{"line":36,"column":37}},{"start":{"line":36,"column":41},"end":{"line":36,"column":63}},{"start":{"line":36,"column":67},"end":{"line":36,"column":97}}]}}};
}
__cov_npY9XBTYUVd0SiOTMslt8g = __cov_npY9XBTYUVd0SiOTMslt8g['/home/travis/build/DeltaGraphs/norris-nrti/lib/businessTier/networkHandler.js'];
__cov_npY9XBTYUVd0SiOTMslt8g.s['1']++;
var Socket = require('../presentationTier/socket.js');
__cov_npY9XBTYUVd0SiOTMslt8g.s['2']++;
var Routes = require('../presentationTier/routes.js');
function NetworkHandler(app, io, norrisNamespace) {
    __cov_npY9XBTYUVd0SiOTMslt8g.f['1']++;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['4']++;
    if ((__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][0]++, app === undefined) || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][1]++, io === undefined) || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][2]++, norrisNamespace === undefined) || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][3]++, typeof app !== 'object') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][4]++, app.prototype.costructor !== 'Express') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][5]++, typeof io !== 'object') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][6]++, io.prototype.costructor !== 'SocketIO') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][7]++, typeof norrisNamespace !== 'object') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['2'][8]++, norrisNamespace.length < 2)) {
        __cov_npY9XBTYUVd0SiOTMslt8g.b['1'][0]++;
        __cov_npY9XBTYUVd0SiOTMslt8g.s['5']++;
        console.log('Error: 811');
        __cov_npY9XBTYUVd0SiOTMslt8g.s['6']++;
        return;
    } else {
        __cov_npY9XBTYUVd0SiOTMslt8g.b['1'][1]++;
    }
    __cov_npY9XBTYUVd0SiOTMslt8g.s['7']++;
    this._app = app;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['8']++;
    this._io = io;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['9']++;
    this._norrisNamespace = norrisNamespace;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['10']++;
    this._routes = new Routes(this._app, this._norrisNamespace);
    __cov_npY9XBTYUVd0SiOTMslt8g.s['11']++;
    this._routes.addRoutingPath(this._norrisNamespace, 'pageList');
}
__cov_npY9XBTYUVd0SiOTMslt8g.s['12']++;
NetworkHandler.prototype.addPageToRouting = function (namespacePage) {
    __cov_npY9XBTYUVd0SiOTMslt8g.f['2']++;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['13']++;
    if ((__cov_npY9XBTYUVd0SiOTMslt8g.b['4'][0]++, typeof namespacePage !== 'string') || (__cov_npY9XBTYUVd0SiOTMslt8g.b['4'][1]++, namespacePage.length < 2) || (__cov_npY9XBTYUVd0SiOTMslt8g.b['4'][2]++, namespacePage.indexOf('/') !== 0)) {
        __cov_npY9XBTYUVd0SiOTMslt8g.b['3'][0]++;
        __cov_npY9XBTYUVd0SiOTMslt8g.s['14']++;
        return false;
    } else {
        __cov_npY9XBTYUVd0SiOTMslt8g.b['3'][1]++;
    }
    __cov_npY9XBTYUVd0SiOTMslt8g.s['15']++;
    return this._routes.addRoutingPath(namespacePage, 'page');
};
__cov_npY9XBTYUVd0SiOTMslt8g.s['16']++;
NetworkHandler.prototype.createSocket = function (namespace, attachedObject) {
    __cov_npY9XBTYUVd0SiOTMslt8g.f['3']++;
    __cov_npY9XBTYUVd0SiOTMslt8g.s['17']++;
    var sock = new Socket(this._io, namespace);
    __cov_npY9XBTYUVd0SiOTMslt8g.s['18']++;
    sock.attachedObject(attachedObject, 'configPageList');
    __cov_npY9XBTYUVd0SiOTMslt8g.s['19']++;
    return sock;
};
__cov_npY9XBTYUVd0SiOTMslt8g.s['20']++;
module.exports = NetworkHandler;
