/*jshint node: true, -W106 */
'use strict';

/*
* Name : routesSpec.js
* Module : UnitTest
* Location : /test/presentationTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Samuele Zanella    Initial code
* =========================================================
*/

var Routes = require('../../lib/presentationTier/routes.js');

var assert = require('assert');
var Express = require('express');
//var request = require('superagent');
var request = require('supertest');
//var http = require('http');

var app = new Express();

describe('Routes', function() {
    it('returns null when there are no params', function() {
        assert.strictEqual((new Routes()).hasOwnProperty('_app'), false);
    });

    it('returns null when there is a non-valid app in params', function() {
        assert.strictEqual((new Routes('wrong', '/namespace')).hasOwnProperty('_app'), false);
    });

    it('returns null when there is a non-valid namepace in params', function() {
        assert.strictEqual((new Routes(app, 123)).hasOwnProperty('_app'), false);
    });

    it('set param values to properties', function() {
        var routes1 = new Routes(app, '/namespace');
        //assert.strictEqual(routes1._app, );
        assert.strictEqual(routes1._norrisNamespace, '/namespace');
    });

    describe('#addRoutingPath', function() {
        var routes2 = new Routes(app, '/namespace');
        it('returns false if passed an invalid namespace', function() {
            assert.strictEqual(routes2.addRoutingPath(123, 'page'), false);
        });
        it('returns false if passed an invalid filename', function() {
            assert.strictEqual(routes2.addRoutingPath('/page', 123), false);
        });
        it('returns true if passed valid parameters', function() {
            assert.strictEqual(routes2.addRoutingPath('/page', 'page'), true);
        });
        it('behaves correctly if passed valid parameters', function(done) {
            var app2 = new Express();
            var routes3 = new Routes(app2, '/norris');
            routes3.addRoutingPath('/page', 'page');
            var server = app2.listen(3000);
            console.dir('RESBODY ext'+server);

            app2.get('/', function (req, res) {
                var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                console.log(' HOME APS - expressEsempio.js '+ fullUrl);
                res.send('HOME APS - expressEsempio.js '+ fullUrl);
            });
            request(app2).get('localhost:3000').expect(200, done);
            request(app2).get('localhost:3000/page').expect(200, done);
/*            
            console.dir(request(server).get('/page'));
            assert(request(server).get('/page'), 200);
            /*request.post('localhost:3000/page').end(function(res){
                assert.strictEqual(res.status,200);
                console.log('localhost:3000/page');
                //expect(res).to.exist;
                //expect(res.status).to.equal(200);
                //expect(res.body).to.contain('world');
                console.dir('RESBODY');
                console.dir(res.body);
                assert.strictEqual(res.status,404);
                done();
            });*/
        });
    });
});