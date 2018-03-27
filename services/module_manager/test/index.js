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
    var userId;
    var destination;
    var driver1;
    var driver2;

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
            global.manager1token = res.body.token;
            global.manager1 = res.body.manager;
            return done();
        });
    });

    it("update manager - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "manager",
            email: "manager@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/manager/' + manager._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update manager - fail - wrong email format", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "manager",
            email: "manager",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/manager/' + manager._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("update manager - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "manager",
            email: "firstmanager@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/manager/' + dummyId)
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update manager - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "manager",
            email: "firstmanager@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/manager/' + manager._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
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

    it("all vehicles - fail - not found", function (done) {
        return request(app).get('/manager/' + dummyId + '/vehicles')
            .set('x-access-token', managerDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
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

    it("new expense - fail - bad request", function (done) {
        var data;
        data = {
            name: "someExpense"
        };
        return request(app).post('/manager/' + manager._id + '/vehicles/' + vehicleId + '/expenses')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new expense - fail - not found", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/manager/' + dummyId + '/vehicles/' + vehicleId + '/expenses')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("new expense - fail - not found", function (done) {
        var data;
        data = ({
            name: "someExpense",
            amount: 1352.00
        });
        return request(app).post('/manager/' + manager._id + '/vehicles/' + dummyId + '/expenses')
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
        return request(app).get('/manager/' + dummyId + '/vehicles/' + vehicleId + '/expenses/' + expense._id)
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
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
        return request(app).put('/manager/' + dummyId + '/vehicles/' + vehicleId + '/expenses/' + expense._id)
        .set('x-access-token', managerDummyToken)
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
    //     return request(app).delete('/manager/' + dummyId + '/vehicles/' + vehicleId + '/expenses/' + expense._id)
    //     .set('x-access-token', managerDummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
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
        return request(app).get('/manager/' + dummyId + '/vehicles/' + vehicleId + '/expenses/')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
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
        return request(app).put('/manager/' + dummyId + '/vehicles/' + vehicleId + '/extendRegistration')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
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

    it("find all users - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/users')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find all users - fail - not found", function (done) {
        return request(app).get('/manager/' + dummyId + '/users')
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expenses for vehicle - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/users')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("register user (for delete test) - success - valid data ", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };

        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property('status', 200);
                userId = res.body._id;
                done();
            });
    });
  
    it("delete user - fail - missing token", function (done) {
        return request(app).delete('/manager/' + manager._id + '/users/'+ userId)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("delete user - fail - not found", function (done) {
        return request(app).delete('/manager/' + dummyId + '/users/'+ userId)
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("delete user - fail - not found", function (done) {
        return request(app).delete('/manager/' + manager._id + '/users/'+ dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("delete user - success - valid data", function (done) {
        return request(app).delete('/manager/' + manager._id + '/users/'+ userId)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("new destination - fail - missing token", function (done) {
        var data;
        data = ({
            startLocation : {
                "lat": "45.30",
                "lng": "45.30"
            },
            endLocation : {
            "lat": "45.31",
            "lng": "45.31"
            }
        });
        return request(app).post('/manager/' + manager._id + '/destinations')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("new destination - fail - bad request", function (done) {
        var data;
        data = ({
            startLocation : {
                "lat": "45.30",
                "lng": "45.30"
            }
        });
        return request(app).post('/manager/' + manager._id + '/destinations')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new destination - fail - not found", function (done) {
        var data;
        data = ({
            startLocation : {
                "lat": "45.30",
                "lng": "45.30"
            },
            endLocation : {
                "lat": "45.31",
                "lng": "45.31"
            },
            startDate: new Date(),
            endDate: new Date()
        });
        return request(app).post('/manager/' + dummyId + '/destinations')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("new destination - success - valid data", function (done) {
        var data;
        data = ({
            startLocation : {
                "lat": "45.30",
                "lng": "45.30"
            },
            endLocation : {
                "lat": "45.31",
                "lng": "45.31"
            },
            startDate: new Date(),
            endDate: new Date()
        });
        return request(app).post('/manager/' + manager._id + '/destinations')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                destination = res.body;
                global.destination1test = res.body;
                return done();
            });
    });
    
    it("all destinations for manager - fail - missing token", function (done) {
        return request(app).get('/manager/' +manager._id + '/destinations')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("all destinations for manager - fail - not found", function (done) {
        return request(app).get('/manager/' + dummyId + '/destinations')
            .set('x-access-token', managerDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("all destinations for manager - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinations')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("all destinations not for manager - fail - missing token", function (done) {
        return request(app).get('/manager/' +manager._id + '/destinations/other')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("all destinations not for manager - fail - not found", function (done) {
        return request(app).get('/manager/' + dummyId + '/destinations/other')
            .set('x-access-token', managerDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("all destinations not for manager - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinations/other')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find destination by id - fail - missing token", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinations/'+ destination._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find destination by id - fail - not found", function (done) {
        return request(app).get('/manager/' + dummyId + '/destinations/' + destination._id)
        .set('x-access-token', managerDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find destination by id - fail - not found", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinations/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find destination by id - success - valid data", function (done) {
        return request(app).get('/manager/' + manager._id + '/destinations/'+ destination._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("update destination - fail - missing token", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            numberOfKms: 148.53
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update destination - fail - bad request", function (done) {
        var data;
        data = ({
            numberOfKms: 148.53
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("update destination - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            numberOfKms: 148.53
        });
        return request(app).put('/manager/' + dummyId + '/destinations/'+ destination._id)
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update destination - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            numberOfKms: 148.53
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update destination - fail - not allowed", function (done) {
        var data;
        data = ({
            destinationManagerId: dummyId,
            numberOfKms: 148.53
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + destination._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("update destination - success - valid data", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            numberOfKms: 148.53,
            startDate: "2018-03-05",
            endDate: "2018-03-10"
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });
    
    // it("delete destination - fail - missing token", function (done) {
    //     var data;
    //     data = ({
    //         destinationManagerId: destination.managerId
    //     });
    //     return request(app).delete('/manager/' + manager._id + '/destinations/'+ destination._id)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("delete destination - fail - bad request", function (done) {
    //     var data;
    //     data = {};
    //     return request(app).delete('/manager/' + manager._id + '/destinations/'+ destination._id)
    //     .set('x-access-token', token)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 400);
    //             return done();
    //         });
    // });

    // it("delete destination - fail - not found", function (done) {
    //     var data;
    //     data = ({
    //         destinationManagerId: destination.managerId
    //     });
    //     return request(app).delete('/manager/' + dummyId + '/destinations/'+ destination._id)
    //     .set('x-access-token', managerDummyToken)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete destination - fail - not found", function (done) {
    //     var data;
    //     data = ({
    //         destinationManagerId: destination.managerId
    //     });
    //     return request(app).delete('/manager/' + manager._id + '/destinations/' + dummyId)
    //     .set('x-access-token', token)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete destination - fail - not allowed", function (done) {
    //     var data;
    //     data = ({
    //         destinationManagerId: dummyId
    //     });
    //     return request(app).delete('/manager/' + manager._id + '/destinations/' + destination._id)
    //     .set('x-access-token', token)
    //     .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 405);
    //             return done();
    //         });
    // });

    // it("delete expense - success - valid data", function (done) {
    //     var data;
    //     data = ({
    //         destinationManagerId: destination.managerId
    //     });
    //     return request(app).delete('/manager/' + manager._id + '/destinations/'+ destination._id)
    //         .set('x-access-token', token)
    //         .type('application/json').send(data).end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });



    it("set destination drivers - fail - missing token", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05",
            drivers: [{'_id' : global.driver1test._id}, {'_id' : global.driver2test._id}]
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setDrivers')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set destination drivers - fail - bad request", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05"
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setDrivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("set destination drivers - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05",
            drivers: [{'_id' : global.driver1test._id}, {'_id' : global.driver2test._id}]
        });
        return request(app).put('/manager/' + dummyId + '/destinations/'+ destination._id + '/setDrivers')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set destination drivers - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05",
            drivers: [{'_id' : global.driver1test._id}, {'_id' : global.driver2test._id}]
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + dummyId + '/setDrivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set destination drivers - success - valid data", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-08",
            drivers: [{'_id' : global.driver1test._id}, {'_id' : global.driver2test._id}]
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setDrivers')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // @here
    it("set destination drivers - fail - not allowed", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-08",
            drivers: [{'_id' : global.driver1test._id}, {'_id' : global.driver2test._id}]
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + destination._id + '/setDrivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("set destination vehicle - fail - missing token", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "",
            endDate: "",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setVehicle')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("set destination vehicle - fail - bad request", function (done) {
        var data;
        data = ({
            startDate: "",
            endDate: "",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setVehicle')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("set destination vehicle - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + dummyId + '/destinations/'+ destination._id + '/setVehicle')
        .set('x-access-token', managerDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set destination vehicle - fail - not found", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-05",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + dummyId + '/setVehicle')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("set destination vehicle - success - valid data", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-10",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/'+ destination._id + '/setVehicle')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("set destination vehicle - fail - not allowed", function (done) {
        var data;
        data = ({
            destinationManagerId: dummyId,
            startDate: "2018-03-05",
            endDate: "2018-03-10",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + destination._id + '/setVehicle')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("set destination vehicle - fail - not allowed", function (done) {
        var data;
        data = ({
            destinationManagerId: destination.managerId,
            startDate: "2018-03-05",
            endDate: "2018-03-10",
            vehicleId: vehicleId
        });
        return request(app).put('/manager/' + manager._id + '/destinations/' + destination._id + '/setVehicle')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });






});