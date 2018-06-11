var should = require("should"),
    config = require("../../../config/"),
    request  = require('supertest'),
    jwt = require('jsonwebtoken'),
    app      = require("../../../server.js");

describe("Manager tests for manipulating requests", function () {

    this.timeout(0);

    var token;
    var manager;
    var destination;
    var destinationRequest;

    var dummyId = '5a1e98c67ecb023338a3cac3';
    var managerDummyToken = jwt.sign({
        email: "client@gmail.com",
        managerId: dummyId
    }, config.token.secret, {
        expiresIn: 1440
    });

    it("set data", function (done) {
        token = global.manager1token;
        manager = global.manager1;
        destination = global.destination1test;
        destinationRequest = global.destinationRequest1test;
        done();
    });

    it("manager get submitted requests - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinationRequests/submitted')
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("manager get submitted requests - fail - not found", function (done){
        return request(app).get('/manager/' + dummyId + '/destinationRequests/submitted')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("manager get submitted requests - success - valid data", function (done){
        return request(app).get('/manager/' + manager._id + '/destinationRequests/submitted')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 200);
            return done();
        });
    });

    it("manager get requests by destination - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinationRequests/' + destination._id)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("manager get requests by destination - fail - not found", function (done){
        return request(app).get('/manager/' + dummyId + '/destinationRequests/' + destination._id)
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("manager get requests by destination - fail - not found", function (done){
        return request(app).get('/manager/'+ manager._id + '/destinationRequests/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("manager get requests by destination - success - valid data", function (done){
        return request(app).get('/manager/' + manager._id + '/destinationRequests/' + destination._id)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 200);
            return done();
        });
    });
    
    it("set request status awaiting - fail - missing token", function (done) {
        var data;
        data = ({
            destinationId: destination._id,
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1
        });
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set request status awaiting - fail - bad request", function (done) {
        var data;
        data = ({
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1
        });
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("set request status awaiting - fail - not found", function (done) {
        var data;
        data = ({
            destinationId: destination._id,
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1,
            price: 1234,
            distance: 123
        });
        return request(app).put('/manager/' + dummyId + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status awaiting - fail - not found", function (done) {
        var data;
        data = ({
            destinationId: destination._id,
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1,
            price: 1234,
            distance: 123
        });
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ dummyId + '/setAwaiting')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status awaiting - success - valid data", function (done) {
        var data;
        data = ({
            destinationId: destination._id,
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1,
            price: 1234,
            distance: 123
        });
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("set request status awaiting - fail - not allowed", function (done) {
    //     var data;
    //     data = ({
    //         destinationId: destination._id,
    //         startDate: "2018-03-15",
    //         endDate: "2018-03-20",
    //         destinationOrder: 1
    //     });
    //     return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
    //     .set('x-access-token', token)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 405);
    //             return done();
    //         });
    // });

    it("set request status accepted - fail - missing token", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAccepted')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set request status accepted - fail - not found", function (done) {
        return request(app).put('/manager/' + dummyId + '/destinationRequests/'+ destinationRequest._id + '/setAccepted')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status accepted - fail - not found", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ dummyId + '/setAccepted')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status accepted - success - valid data", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAccepted')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("set request status accepted - fail - not allowed", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAccepted')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("set request status submitted - fail - missing token", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setSubmitted')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set request status submitted - fail - not found", function (done) {
        return request(app).put('/manager/' + dummyId + '/destinationRequests/'+ destinationRequest._id + '/setSubmitted')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status submitted - fail - not found", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ dummyId + '/setSubmitted')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status submitted - success - valid data", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setSubmitted')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("set request status rejected - fail - missing token", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setRejected')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set request status rejected - fail - not found", function (done) {
        return request(app).put('/manager/' + dummyId + '/destinationRequests/'+ destinationRequest._id + '/setRejected')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status rejected - fail - not found", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ dummyId + '/setRejected')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set request status rejected - success - valid data", function (done) {
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setRejected')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("set request status awaiting - fail - not allowed", function (done) {
        var data;
        data = ({
            destinationId: destination._id,
            startDate: "2018-03-15",
            endDate: "2018-03-20",
            destinationOrder: 1,
            price: 1234,
            distance: 123
        });
        return request(app).put('/manager/' + manager._id + '/destinationRequests/'+ destinationRequest._id + '/setAwaiting')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

});