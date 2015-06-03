"use strict";
var __cov_CX2HGdIHhLqRZnyurH1UTw = (Function('return this'))();
if (!__cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__) { __cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__ = {}; }
__cov_CX2HGdIHhLqRZnyurH1UTw = __cov_CX2HGdIHhLqRZnyurH1UTw.__coverage__;
if (!(__cov_CX2HGdIHhLqRZnyurH1UTw['/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js'])) {
   __cov_CX2HGdIHhLqRZnyurH1UTw['/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/presentationTier/socket.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"Socket","line":18,"loc":{"start":{"line":18,"column":0},"end":{"line":18,"column":25}}},"2":{"name":"(anonymous_2)","line":28,"loc":{"start":{"line":28,"column":31},"end":{"line":28,"column":53}}},"3":{"name":"(anonymous_3)","line":34,"loc":{"start":{"line":34,"column":32},"end":{"line":34,"column":65}}},"4":{"name":"(anonymous_4)","line":40,"loc":{"start":{"line":40,"column":21},"end":{"line":40,"column":39}},"skip":true}},"statementMap":{"1":{"start":{"line":18,"column":0},"end":{"line":26,"column":1}},"2":{"start":{"line":19,"column":1},"end":{"line":22,"column":2}},"3":{"start":{"line":20,"column":2},"end":{"line":20,"column":28}},"4":{"start":{"line":21,"column":2},"end":{"line":21,"column":9}},"5":{"start":{"line":23,"column":1},"end":{"line":23,"column":30}},"6":{"start":{"line":24,"column":1},"end":{"line":24,"column":24}},"7":{"start":{"line":25,"column":1},"end":{"line":25,"column":28}},"8":{"start":{"line":28,"column":0},"end":{"line":32,"column":2}},"9":{"start":{"line":29,"column":1},"end":{"line":31,"column":2}},"10":{"start":{"line":30,"column":2},"end":{"line":30,"column":36}},"11":{"start":{"line":34,"column":0},"end":{"line":48,"column":2}},"12":{"start":{"line":35,"column":1},"end":{"line":47,"column":2}},"13":{"start":{"line":36,"column":2},"end":{"line":36,"column":26}},"14":{"start":{"line":37,"column":2},"end":{"line":37,"column":46}},"15":{"start":{"line":38,"column":2},"end":{"line":38,"column":26}},"16":{"start":{"line":40,"column":2},"end":{"line":43,"column":4},"skip":true},"17":{"start":{"line":41,"column":3},"end":{"line":41,"column":50},"skip":true},"18":{"start":{"line":42,"column":3},"end":{"line":42,"column":55},"skip":true},"19":{"start":{"line":44,"column":2},"end":{"line":44,"column":49}},"20":{"start":{"line":46,"column":2},"end":{"line":46,"column":28}},"21":{"start":{"line":50,"column":0},"end":{"line":50,"column":24}}},"branchMap":{"1":{"line":19,"type":"if","locations":[{"start":{"line":19,"column":1},"end":{"line":19,"column":1}},{"start":{"line":19,"column":1},"end":{"line":19,"column":1}}]},"2":{"line":19,"type":"binary-expr","locations":[{"start":{"line":19,"column":4},"end":{"line":19,"column":19}},{"start":{"line":19,"column":23},"end":{"line":19,"column":45}},{"start":{"line":19,"column":49},"end":{"line":19,"column":68}}]},"3":{"line":29,"type":"if","locations":[{"start":{"line":29,"column":1},"end":{"line":29,"column":1}},{"start":{"line":29,"column":1},"end":{"line":29,"column":1}}]},"4":{"line":29,"type":"binary-expr","locations":[{"start":{"line":29,"column":4},"end":{"line":29,"column":21}},{"start":{"line":29,"column":25},"end":{"line":29,"column":41}}]},"5":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":1},"end":{"line":35,"column":1}},{"start":{"line":35,"column":1},"end":{"line":35,"column":1}}]},"6":{"line":35,"type":"binary-expr","locations":[{"start":{"line":35,"column":4},"end":{"line":35,"column":19}},{"start":{"line":35,"column":23},"end":{"line":35,"column":52}}]}}};
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
}
__cov_CX2HGdIHhLqRZnyurH1UTw.s['8']++;
Socket.prototype.sendMessage = function (event, data) {
    __cov_CX2HGdIHhLqRZnyurH1UTw.f['2']++;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['9']++;
    if ((__cov_CX2HGdIHhLqRZnyurH1UTw.b['4'][0]++, event !== undefined) && (__cov_CX2HGdIHhLqRZnyurH1UTw.b['4'][1]++, data !== undefined)) {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['3'][0]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['10']++;
        this._namespace.emit(event, data);
    } else {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['3'][1]++;
    }
};
__cov_CX2HGdIHhLqRZnyurH1UTw.s['11']++;
Socket.prototype.attachObject = function (obj, onConnectionEvent) {
    __cov_CX2HGdIHhLqRZnyurH1UTw.f['3']++;
    __cov_CX2HGdIHhLqRZnyurH1UTw.s['12']++;
    if ((__cov_CX2HGdIHhLqRZnyurH1UTw.b['6'][0]++, obj !== undefined) && (__cov_CX2HGdIHhLqRZnyurH1UTw.b['6'][1]++, onConnectionEvent !== undefined)) {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['5'][0]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['13']++;
        this._attachedObj = obj;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['14']++;
        this._onConnectionEvent = onConnectionEvent;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['15']++;
        var nsp = this._namespace;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['16']++;
        var clientHandle = function (socket) {
            __cov_CX2HGdIHhLqRZnyurH1UTw.f['4']++;
            __cov_CX2HGdIHhLqRZnyurH1UTw.s['17']++;
            console.log(' new client connected to ' + nsp);
            __cov_CX2HGdIHhLqRZnyurH1UTw.s['18']++;
            socket.emit(onConnectionEvent, obj.getConfigJSON());
        };
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['19']++;
        this._namespace.on('connection', clientHandle);
    } else {
        __cov_CX2HGdIHhLqRZnyurH1UTw.b['5'][1]++;
        __cov_CX2HGdIHhLqRZnyurH1UTw.s['20']++;
        console.log('Error: 922');
    }
};
__cov_CX2HGdIHhLqRZnyurH1UTw.s['21']++;
module.exports = Socket;
