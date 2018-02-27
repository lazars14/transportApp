var should = require("should"),
    config = require("../../../config/"),
    request  = require('supertest'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    app      = require("../../../server.js");

describe("Manager tests", function () {

    var token;
    var manager;
    var expense;

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "test@gmail.com"
        };
        return request(app).post('/managers/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - invalid password", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test123"
        };
        return request(app).post('/managers/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 409);
            return done();
        });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test"
        };
        return request(app).post('/managers/login')
        .type('application/json').send(data).end(function (err, res) {
            res.body.should.have.property("token");
            // data for further tests
            token = res.body.token;
            manager = res.body.manager;
            return done();
        });
    });

    it("all vehicles - fail - missing token", function (done) {
        return request(app).get('/managers/' +manager._id + '/vehicles')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("all vehicles - success - valid data", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("new expense - fail - missing token", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/managers/' +manager._id + '/vehicles/' + vehicle._id + '/expenses' )
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("new expense - fail - not found", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/managers/' +manager._id + '/vehicles/5a1e98c67ecb023338a3cac3/expenses')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("new expense - success - valid data", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/managers/' +manager._id + '/vehicles/' + vehicle._id + '/expenses')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                expense = res.body;
                return done();
            });
    });

    it("find expense by id - fail - missing token", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find expense by id - fail - not found", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/5a1e98c67ecb023338a3cac3/expenses/' + expense._id)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expense by id - fail - not found", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/' + vehicle._id + '/expenses/5a1e98c67ecb023338a3cac3')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expense by id - success - valid data", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("update expense - fail - missing token", function (done) {
        var data;
        data = ({
            name: "updatedExpense",
            amount: 1372.00
        });
        return request(app).put('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update expense - fail - not found", function (done) {
        var data;
        data = ({
            name: "updatedExpense",
            amount: 1372.00
        });
        return request(app).put('/managers/' + manager._id + '/vehicles/5a1e98c67ecb023338a3cac3/expenses/' + expense._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update expense - fail - not found", function (done) {
        var data;
        data = ({
            name: "updatedExpense",
            amount: 1372.00
        });
        return request(app).put('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/5a1e98c67ecb023338a3cac3')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update expense - success - valid data", function (done) {
        var data;
        data = ({
            name: "updatedExpense",
            amount: 1372.00
        });
        return request(app).put('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("delete expense - fail - missing token", function (done) {
        return request(app).delete('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("delete expense - fail - not found", function (done) {
        return request(app).delete('/managers/' + manager._id + '/vehicles/5a1e98c67ecb023338a3cac3/expenses/' + expense._id)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("delete expense - fail - not found", function (done) {
        return request(app).delete('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/5a1e98c67ecb023338a3cac3')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("delete expense - success - valid data", function (done) {
        return request(app).delete('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/' + expense._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find expenses for vehicle - fail - missing token", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses/')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find expenses for vehicle - fail - not found", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/5a1e98c67ecb023338a3cac3/expenses/')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expenses for vehicle - success - valid data", function (done) {
        return request(app).get('/managers/' + manager._id + '/vehicles/'+ vehicle._id + '/expenses')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });


});