var should = require("should"),
    config = require("../../../config/"),
    request  = require('supertest'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    app      = require("../../../server.js");

describe("Manager tests", function () {

    var token;
    var manager;
    var vehicleId;
    var expense;

    var dummyId = '5a1e98c67ecb023338a3cac3';
    var managerDummyToken = jwt.sign({
        email: "client@gmail.com",
        managerId: dummyId
    }, config.token.secret, {
        expiresIn: 1440
    });

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "manager@gmail.com"
        };
        return request(app).post('/manager/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - wrong email format", function (done) {
        var data;
        data = {
            email: "test",
            password: "test"
        };
        return request(app).post('/manager/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - invalid password", function (done) {
        var data;
        data = {
            email: "manager@gmail.com",
            password: "test123"
        };
        return request(app).post('/manager/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 409);
            return done();
        });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "manager@gmail.com",
            password: "test"
        };
        return request(app).post('/manager/login')
        .type('application/json').send(data).end(function (err, res) {
            res.body.should.have.property("token");
            // data for further tests
            token = res.body.token;
            manager = res.body.manager;
            return done();
        });
    });

    it("all vehicles - fail - missing token", function (done) {
        return request(app).get('/manager/' +manager._id + '/vehicles')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("all vehicles - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                var vehicleArray = res.body;
                vehicleId = vehicleArray[0]._id;
                return done();
            });
    });

    it("new expense - fail - missing token", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/manager/' + manager._id + '/vehicles/' + vehicleId + '/expenses' )
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
        return request(app).post('/manager/' +manager._id + '/vehicles/' + dummyId + '/expenses')
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
        return request(app).post('/manager/' +manager._id + '/vehicles/' + vehicleId + '/expenses')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                expense = res.body;
                return done();
            });
    });

    it("find expense by id - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find expense by id - fail - not found", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/' + dummyId + '/expenses/' + expense._id)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expense by id - fail - not found", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/' + vehicleId + '/expenses/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expense by id - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
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
        return request(app).put('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
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
        return request(app).put('/manager/' + manager._id + '/vehicles/' + dummyId + '/expenses/' + expense._id)
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
        return request(app).put('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + dummyId)
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
        return request(app).put('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("delete expense - fail - missing token", function (done) {
    //     return request(app).delete('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("delete expense - fail - not found", function (done) {
    //     return request(app).delete('/manager/' + manager._id + '/vehicles/' + dummyId + '/expenses/' + expense._id)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete expense - fail - not found", function (done) {
    //     return request(app).delete('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + dummyId)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete expense - success - valid data", function (done) {
    //     return request(app).delete('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/' + expense._id)
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    it("find expenses for vehicle - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses/')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find expenses for vehicle - fail - not found", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/' + dummyId + '/expenses/')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expenses for vehicle - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/expenses')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("extend registration for vehicle - fail - missing token", function (done) {
        var data = {
            licensePlate: "NS-233-SF",
            licenseExpireDate: "2019-12-21"
        };
        return request(app).put('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/extendRegistration')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("extend registration for vehicle - fail - missing data", function (done) {
        var data = {
            licenseExpireDate: "2019-12-21"
        };
        return request(app).put('/manager/' + manager._id + '/vehicles/' + vehicleId + '/extendRegistration')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("extend registration for vehicle - fail - not found", function (done) {
        var data = {
            licensePlate: "NS-233-SF",
            licenseExpireDate: "2019-12-21"
        };
        return request(app).put('/manager/' + manager._id + '/vehicles/' + dummyId + '/extendRegistration')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("extend registration for vehicle - success - valid data", function (done) {
        var data = {
            licensePlate: "NS-233-SF",
            licenseExpireDate: "2019-12-21"
        };
        return request(app).put('/manager/' + manager._id + '/vehicles/'+ vehicleId + '/extendRegistration')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

});