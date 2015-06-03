"use strict";
var __cov_Iw5Q8En7QpvmbAFRpNqQoQ = (Function('return this'))();
if (!__cov_Iw5Q8En7QpvmbAFRpNqQoQ.__coverage__) { __cov_Iw5Q8En7QpvmbAFRpNqQoQ.__coverage__ = {}; }
__cov_Iw5Q8En7QpvmbAFRpNqQoQ = __cov_Iw5Q8En7QpvmbAFRpNqQoQ.__coverage__;
if (!(__cov_Iw5Q8En7QpvmbAFRpNqQoQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageList.js'])) {
   __cov_Iw5Q8En7QpvmbAFRpNqQoQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageList.js'] = {"path":"/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageList.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":19,"loc":{"start":{"line":19,"column":15},"end":{"line":19,"column":30}}},"2":{"name":"(anonymous_2)","line":26,"loc":{"start":{"line":26,"column":30},"end":{"line":26,"column":44}}},"3":{"name":"(anonymous_3)","line":34,"loc":{"start":{"line":34,"column":30},"end":{"line":34,"column":40}}},"4":{"name":"(anonymous_4)","line":38,"loc":{"start":{"line":38,"column":30},"end":{"line":38,"column":40}}}},"statementMap":{"1":{"start":{"line":19,"column":0},"end":{"line":70,"column":2}},"2":{"start":{"line":20,"column":1},"end":{"line":22,"column":2}},"3":{"start":{"line":21,"column":2},"end":{"line":21,"column":14}},"4":{"start":{"line":23,"column":1},"end":{"line":23,"column":16}},"5":{"start":{"line":24,"column":1},"end":{"line":24,"column":15}},"6":{"start":{"line":26,"column":1},"end":{"line":32,"column":3}},"7":{"start":{"line":27,"column":2},"end":{"line":30,"column":3}},"8":{"start":{"line":28,"column":3},"end":{"line":28,"column":21}},"9":{"start":{"line":29,"column":3},"end":{"line":29,"column":15}},"10":{"start":{"line":31,"column":2},"end":{"line":31,"column":15}},"11":{"start":{"line":34,"column":1},"end":{"line":36,"column":3}},"12":{"start":{"line":35,"column":2},"end":{"line":35,"column":15}},"13":{"start":{"line":38,"column":1},"end":{"line":69,"column":3}},"14":{"start":{"line":39,"column":2},"end":{"line":39,"column":22}},"15":{"start":{"line":40,"column":2},"end":{"line":40,"column":26}},"16":{"start":{"line":43,"column":2},"end":{"line":63,"column":3}},"17":{"start":{"line":44,"column":3},"end":{"line":44,"column":36}},"18":{"start":{"line":45,"column":3},"end":{"line":45,"column":37}},"19":{"start":{"line":46,"column":3},"end":{"line":46,"column":21}},"20":{"start":{"line":49,"column":3},"end":{"line":55,"column":4}},"21":{"start":{"line":50,"column":4},"end":{"line":54,"column":6}},"22":{"start":{"line":57,"column":3},"end":{"line":62,"column":5}},"23":{"start":{"line":65,"column":2},"end":{"line":68,"column":4}},"24":{"start":{"line":72,"column":0},"end":{"line":72,"column":25}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":1},"end":{"line":20,"column":1}},{"start":{"line":20,"column":1},"end":{"line":20,"column":1}}]},"2":{"line":27,"type":"if","locations":[{"start":{"line":27,"column":2},"end":{"line":27,"column":2}},{"start":{"line":27,"column":2},"end":{"line":27,"column":2}}]}}};
}
__cov_Iw5Q8En7QpvmbAFRpNqQoQ = __cov_Iw5Q8En7QpvmbAFRpNqQoQ['/home/travis/build/DeltaGraphs/norris-nrti/lib/DataTier/pageList.js'];
__cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['1']++;
var PageList = function (name) {
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.f['1']++;
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['2']++;
    if (typeof name !== 'string') {
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.b['1'][0]++;
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['3']++;
        return null;
    } else {
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.b['1'][1]++;
    }
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['4']++;
    var _name = name;
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['5']++;
    var _pages = [];
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['6']++;
    PageList.prototype.addPage = function (page) {
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.f['2']++;
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['7']++;
        if (page) {
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.b['2'][0]++;
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['8']++;
            _pages.push(page);
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['9']++;
            return true;
        } else {
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.b['2'][1]++;
        }
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['10']++;
        return false;
    };
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['11']++;
    PageList.prototype.getName = function () {
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.f['3']++;
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['12']++;
        return _name;
    };
    __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['13']++;
    PageList.prototype.getData = function () {
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.f['4']++;
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['14']++;
        var pageListdata = [];
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['15']++;
        var pages = _pages.length;
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['16']++;
        for (var i = 0; i < pages; i++) {
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['17']++;
            var pageData = _pages[i].getData();
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['18']++;
            var graphs = pageData.graphs.length;
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['19']++;
            var graphsData = [];
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['20']++;
            for (var j = 0; j < graphs; j++) {
                __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['21']++;
                graphsData[j] = {
                    ID: pageData.graphs[j].ID,
                    title: pageData.graphs[j].title,
                    type: pageData.graphs[j].type
                };
            }
            __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['22']++;
            pageListdata[i] = {
                ID: pageData.ID,
                name: pageData.name,
                description: pageData.description,
                graphs: graphsData
            };
        }
        __cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['23']++;
        return {
            name: _name,
            data: pageListdata
        };
    };
};
__cov_Iw5Q8En7QpvmbAFRpNqQoQ.s['24']++;
module.export = PageList;
