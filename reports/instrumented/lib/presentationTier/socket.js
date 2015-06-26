"use strict";
var __cov_CX2HGdIHhLqRZnyurH1UTw = (Function('return this'))();
if (!__cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__) { __cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__ = {}; }
__cov_CX2HGdIHhLqRZnyurH1UTw = __cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__;
if (!(__cov_CX2HGdIHhLqRZnyurH1UTw['/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js'])) {
   __cov_CX2HGdIHhLqRZnyurH1UTw['/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0},"b":{"1":[0,0],"2":[0,0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"Socket","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":25}}},"2":{"name":"(anonymous_2)","line":32,"loc":{"start":{"line":32,"column":31},"end":{"line":32,"column":53}}},"3":{"name":"(anonymous_3)","line":39,"loc":{"start":{"line":39,"column":32},"end":{"line":39,"column":65}}},"4":{"name":"(anonymous_4)","line":45,"loc":{"start":{"line":45,"column":21},"end":{"line":45,"column":39}},"skip":true}},"statementMap":{"1":{"start":{"line":20,"column":0},"end":{"line":29,"column":1}},"2":{"start":{"line":21,"column":1},"end":{"line":24,"column":2}},"3":{"start":{"line":22,"column":2},"end":{"line":22,"column":28}},"4":{"start":{"line":23,"column":2},"end":{"line":23,"column":9}},"5":{"start":{"line":25,"column":1},"end":{"line":25,"column":30}},"6":{"start":{"line":26,"column":1},"end":{"line":26,"column":24}},"7":{"start":{"line":27,"column":1},"end":{"line":27,"column":28}},"8":{"start":{"line":28,"column":1},"end":{"line":28,"column":15}},"9":{"start":{"line":32,"column":0},"end":{"line":36,"column":2}},"10":{"start":{"line":33,"column":1},"end":{"line":35,"column":2}},"11":{"start":{"line":34,"column":2},"end":{"line":34,"column":36}},"12":{"start":{"line":39,"column":0},"end":{"line":53,"column":2}},"13":{"start":{"line":40,"column":1},"end":{"line":52,"column":2}},"14":{"start":{"line":41,"column":2},"end":{"line":41,"column":26}},"15":{"start":{"line":42,"column":2},"end":{"line":42,"column":46}},"16":{"start":{"line":43,"column":2},"end":{"line":43,"column":20}},"17":{"start":{"line":45,"column":2},"end":{"line":48,"column":4},"skip":true},"18":{"start":{"line":46,"column":3},"end":{"line":46,"column":50},"skip":true},"19":{"start":{"line":47,"column":3},"end":{"line":47,"column":55},"skip":true},"20":{"start":{"line":49,"column":2},"end":{"line":49,"column":49}},"21":{"start":{"line":51,"column":2},"end":{"line":51,"column":28}},"22":{"start":{"line":55,"column":0},"end":{"line":55,"column":24}}},"branchMap":{"1":{"line":21,"type":"if","locations":[{"start":{"line":21,"column":1},"end":{"line":21,"column":1}},{"start":{"line":21,"column":1},"end":{"line":21,"column":1}}]},"2":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":4},"end":{"line":21,"column":19}},{"start":{"line":21,"column":23},"end":{"line":21,"column":45}},{"start":{"line":21,"column":49},"end":{"line":21,"column":68}}]},"3":{"line":33,"type":"if","locations":[{"start":{"line":33,"column":1},"end":{"line":33,"column":1}},{"start":{"line":33,"column":1},"end":{"line":33,"column":1}}]},"4":{"line":33,"type":"binary-expr","locations":[{"start":{"line":33,"column":4},"end":{"line":33,"column":21}},{"start":{"line":33,"column":25},"end":{"line":33,"column":41}}]},"5":{"line":40,"type":"if","locations":[{"start":{"line":40,"column":1},"end":{"line":40,"column":1}},{"start":{"line":40,"column":1},"end":{"line":40,"column":1}}]},"6":{"line":40,"type":"binary-expr","locations":[{"start":{"line":40,"column":4},"end":{"line":40,"column":19}},{"start":{"line":40,"column":23},"end":{"line":40,"column":52}}]}}};
}
__cov_CX2HGdIHhLqRZnyurH1UTw = __cov_CX2HGdIHhLqRZnyurH1UTw['/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js'];
function Socket(io, nsp) {
    __cov_CX2HGdIHhLqRZnyurH1UTw.f['1']++;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['2']++;
    if ((__cov_CX2HGdIHhLqRZnyurH1UTw.b['2'][0]++, nsp === undefined) || (__cov_CX2HGdIHhLqRZnyurH1UTw.b['2'][1]++, typeof nsp !== 'string') || (__cov_CX2HGdIHhLqRZnyurH1UTw.b['2'][2]++, io.nsps === undefined)) {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['1'][0]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['3']++;
        console.log('Error: 921');
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['4']++;
        return;
    } else {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['1'][1]++;
    }
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['5']++;
    this._namespace = io.of(nsp);
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['6']++;
    this._attachedObj = null;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['7']++;
    this._onConnectionEvent = '';
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['8']++;
    this._nsp = nsp;
}
__cov_CX2HGdIHhLqRZnyurH1UTw.s['9']++;
Socket.prototype.sendMessage = function (event, data) {
    __cov_CX2HGdIHhLqRZnyurH1UTw.f['2']++;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['10']++;
    if ((__cov_CX2HGdIHhLqRZnyurH1UTw.b['4'][0]++, event !== undefined) && (__cov_CX2HGdIHhLqRZnyurH1UTw.b['4'][1]++, data !== undefined)) {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['3'][0]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['11']++;
        this._namespace.emit(event, data);
    } else {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['3'][1]++;
    }
};
__cov_CX2HGdIHhLqRZnyurH1UTw.s['12']++;
Socket.prototype.attachObject = function (obj, onConnectionEvent) {
    __cov_CX2HGdIHhLqRZnyurH1UTw.f['3']++;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['13']++;
    if ((__cov_CX2HGdIHhLqRZnyurH1UTw.b['6'][0]++, obj !== undefined) && (__cov_CX2HGdIHhLqRZnyurH1UTw.b['6'][1]++, onConnectionEvent !== undefined)) {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['5'][0]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['14']++;
        this._attachedObj = obj;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['15']++;
        this._onConnectionEvent = onConnectionEvent;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['16']++;
        var nsp = this._nsp;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['17']++;
        var clientHandle = function (socket) {
            __cov_CX2HGdIHhLqRZnyurH1UTw.f['4']++;
            __cov_CX2HGdIHhLqRZnyurH1UTw.s['18']++;
            console.log(' new client connected to ' + nsp);
            __cov_CX2HGdIHhLqRZnyurH1UTw.s['19']++;
            socket.emit(onConnectionEvent, obj.getConfigJSON());
        };
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['20']++;
        this._namespace.on('connection', clientHandle);
    } else {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['5'][1]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['21']++;
        console.log('Error: 922');
    }
};
__cov_CX2HGdIHhLqRZnyurH1UTw.s['22']++;
module.exports = Socket;
