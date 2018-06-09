var should = require("should"),
    config = require("../../../config/"),
    request  = require('supertest'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    app      = require("../../../server.js");

describe("Client tests", function () {

    this.timeout(0);

    var token;
    var client;
    var driver;
    var manager;
    var vehicle;

    var dummyId = '5a1e98c67ecb023338a3cac3';
    var clientDummyToken = jwt.sign({
        email: "client@gmail.com",
        clientId: dummyId
    }, config.token.secret, {
        expiresIn: 1440
    }); 

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "client@gmail.com"
        };
        return request(app).post('/client/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - wrong email format", function (done) {
        var data;
        data = {
            email: "client@gmail.com"
        };
        return request(app).post('/client/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - invalid password", function (done) {
        // this.timeout(0);
        var data;
        data = {
            email: "client@gmail.com",
            password: "test123"
        };
        return request(app).post('/client/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 409);
            return done();
        });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "client@gmail.com",
            password: "test"
        };
        return request(app).post('/client/login')
        .type('application/json').send(data).end(function (err, res) {
            res.body.should.have.property("token");
            res.should.have.property("status", 200);
            // data for further tests
            token = res.body.token;
            client = res.body.client;
            return done();
        });
    });

    it("update client - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "UpdatedClient",
            lastName: "Client",
            email: "client@gmail.com",
            phone: "060987653",
            password: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + client._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update client - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "UpdatedClient",
            lastName: "Client",
            email: "client@gmail.com",
            phone: "060987653",
            password: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + dummyId)
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update client - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "UpdatedClient",
            lastName: "Client",
            email: "client@gmail.com",
            phone: "060987653",
            password: "test"
        });
        return request(app).put('/client/' + client._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("new manager - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "manager",
            email: "manager@gmail.com",
            phone: "060987654",
            password: "test"
        });
        return request(app).post('/client/' +client._id + '/managers')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("new manager - fail - missing data", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "manager",
            email: "manager@gmail.com",
            phone: "060987654",
        });
        return request(app).post('/client/' +client._id + '/managers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new manager - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "manager",
            email: "manager@gmail.com",
            phone: "060987654",
            password: "test"
        });
        return request(app).post('/client/' + dummyId + '/managers')
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("new manager - fail - wrong email format", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "manager",
            email: "manager",
            phone: "060987654",
            password: "test"
        });
        return request(app).post('/client/' +client._id + '/managers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new manager - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "manager",
            email: "manager@gmail.com",
            phone: "060987654",
            password: "test"
        });
        return request(app).post('/client/' +client._id + '/managers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                manager = res.body;
                return done();
            });
    });

    it("find all managers - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/managers')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find all managers - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/managers')
            .set('x-access-token', clientDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find all managers - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/managers')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find manager by id - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/managers/'+ manager._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find manager by id - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/managers/' + manager._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find manager by id - fail - not found", function (done) {
        return request(app).get('/client/' + client._id + '/managers/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find manager by id - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/managers/'+ manager._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
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
        return request(app).put('/client/' + client._id + '/managers/'+ manager._id)
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
        return request(app).put('/client/' + client._id + '/managers/'+ manager._id)
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
        return request(app).put('/client/' + dummyId + '/managers/' + manager._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
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
        return request(app).put('/client/' + client._id + '/managers/' + dummyId)
        .set('x-access-token', token)
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
        return request(app).put('/client/' + client._id + '/managers/'+ manager._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("delete manager - fail - missing token", function (done) {
    //     return request(app).delete('/client/' + client._id + '/managers/'+ manager._id)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("delete manager - fail - not found", function (done) {
    //     return request(app).delete('/client/' + dummyId + '/managers/' + manager._id)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete manager - fail - not found", function (done) {
    //     return request(app).delete('/client/' + client._id + '/managers/' + dummyId)
    //     .set('x-access-token', clientDummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete manager - success - valid data", function (done) {
    //     return request(app).delete('/client/' + client._id + '/managers/'+ manager._id)
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    it("new driver - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("new driver - fail - missing data", function (done) {
        var data;
        data = ({
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new driver - fail - wrong email format", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("new driver - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' + dummyId + '/drivers')
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("new driver - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                driver = res.body;
                global.driver1test = res.body;
                return done();
            });
    });

    it("new driver - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver2@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                global.driver2test = res.body;
                return done();
            });
    });

    it("new driver - fail - already registered", function (done) {
        var data;
        data = ({
            firstName: "First",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987654",
            address: "St. John's Boulevard 12"
        });
        return request(app).post('/client/' +client._id + '/drivers')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 406);
                return done();
            });
    });

    it("find all drivers - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/drivers')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find all drivers - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/drivers')
            .set('x-access-token', clientDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find all drivers - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/drivers')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find driver by id - fail - missing token", function (done) 
    {
        return request(app).get('/client/' + client._id + '/drivers/'+ driver._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find driver by id - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/drivers/' + driver._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find driver by id - fail - not found", function (done) {
        return request(app).get('/client/' + client._id + '/drivers/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find driver by id - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/drivers/'+ driver._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("update driver - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + client._id + '/drivers/'+ driver._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update driver - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + dummyId + '/drivers/' + driver._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update driver - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + client._id + '/drivers/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update driver - fail - wrong email format", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "Driver",
            email: "driver",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + client._id + '/drivers/' + driver._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("update driver - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "UpdatedFirst",
            lastName: "Driver",
            email: "driver@gmail.com",
            phone: "060987653",
            address: "St. John's Boulevard 11"
        });
        return request(app).put('/client/' + client._id + '/drivers/'+ driver._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("delete driver - fail - missing token", function (done) {
    //     return request(app).delete('/client/' + client._id + '/drivers/'+ driver._id)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("delete driver - fail - not found", function (done) {
    //     return request(app).delete('/client/' + dummyId + '/drivers/' + driver._id)
    //     .set('x-access-token', clientDummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete driver - fail - not found", function (done) {
    //     return request(app).delete('/client/' + client._id + '/drivers/' + dummyId)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete driver - success - valid data", function (done) {
    //     return request(app).delete('/client/' + client._id + '/drivers/'+ driver._id)
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    it("new vehicle - fail - missing token", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "licensePlate" : "NS-123-AD",
            "licenseExpireDate": "2019-10-21",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).post('/client/' +client._id + '/vehicles')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("new vehicle - fail - not found", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "licensePlate" : "NS-123-AD",
            "licenseExpireDate": "2019-04-23T18:25:43.511Z",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).post('/client/' + dummyId + '/vehicles')
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                vehicle = res.body;
                return done();
            });
    });

    it("new vehicle - success - valid data", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "licensePlate" : "NS-123-AD",
            "licenseExpireDate": "2019-04-23T18:25:43.511Z",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).post('/client/' +client._id + '/vehicles')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                vehicle = res.body;
                return done();
            });
    });

    it("new vehicle - fail - already registered", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "licensePlate" : "NS-123-AD",
            "licenseExpireDate": "2019-04-23T18:25:43.511Z",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).post('/client/' +client._id + '/vehicles')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 406);
                return done();
            });
    });

    it("find all vehicles - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find all vehicles - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/vehicles')
            .set('x-access-token', clientDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find all vehicles - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find vehicle by id - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/'+ vehicle._id)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find vehicle by id - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/vehicles/' + vehicle._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find vehicle by id - fail - not found", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find vehicle by id - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/'+ vehicle._id)
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("update vehicle - fail - missing token", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "licensePlate" : "NS-123-AD",
            "licenseExpireDate": "2019-10-21",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).put('/client/' + client._id + '/vehicles/'+ vehicle._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update vehicle - fail - not found", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).put('/client/' + dummyId + '/vehicles/' + vehicle._id)
        .set('x-access-token', clientDummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update vehicle - fail - not found", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).put('/client/' + client._id + '/vehicles/' + dummyId)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update vehicle - success - valid data", function (done) {
        var data;
        data = ({
            "name": "First bus",
            "model": "Mercedes-Benz do Brasil",
            "numberOfSeats": "50",
            "productionYear": "2015",
            "numberOfKmPassed": "50000"
        });
        return request(app).put('/client/' + client._id + '/vehicles/'+ vehicle._id)
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("find expenses for vehicle - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/'+ vehicle._id + '/expenses/')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find expenses for vehicle - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/vehicles/' + vehicle._id + '/expenses/')
        .set('x-access-token', clientDummyToken)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expenses for vehicle - fail - not found", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/' + dummyId + '/expenses/')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find expenses for vehicle - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/vehicles/'+ vehicle._id + '/expenses')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("delete vehicle - fail - missing token", function (done) {
    //     return request(app).delete('/client/' + client._id + '/vehicles/'+ vehicle._id)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("delete vehicle - fail - not found", function (done) {
    //     return request(app).delete('/client/' + dummyId + '/vehicles/' + vehicle._id)
    //     .set('x-access-token', clientDummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete vehicle - fail - not found", function (done) {
    //     return request(app).delete('/client/' + client._id + '/vehicles/' + dummyId)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("delete vehicle - success - valid data", function (done) {
    //     return request(app).delete('/client/' + client._id + '/vehicles/'+ vehicle._id)
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    it("find all finished destinations - fail - missing token", function (done) {
        return request(app).get('/client/' + client._id + '/finishedDestinations')
        .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("find all finished destinations - fail - not found", function (done) {
        return request(app).get('/client/' + dummyId + '/finishedDestinations')
            .set('x-access-token', clientDummyToken)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("find all finished destinations - success - valid data", function (done) {
        return request(app).get('/client/' + client._id + '/finishedDestinations')
            .set('x-access-token', token)
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("get requests by destination - fail - missing token", function (done) {
    //     return request(app).get('/client/' + client._id + '/destinationRequests/' + destination._id)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("get requests by destination - fail - not found", function (done){
    //     return request(app).get('/client/' + dummyId + '/destinationRequests/' + destination._id)
    //     .set('x-access-token', clientDummyToken)
    //     .type('application/json').end(function (err, res){
    //         res.should.have.property("status", 404);
    //         return done();
    //     });
    // });

    // it("get requests by destination - fail - not found", function (done){
    //     return request(app).get('/client/'+ client._id + '/destinationRequests/' + dummyId)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res){
    //         res.should.have.property("status", 404);
    //         return done();
    //     });
    // });

    // it("get requests by destination - success - valid data", function (done){
    //     return request(app).get('/client/' + client._id + '/destinationRequests/' + destination._id)
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res){
    //         res.should.have.property("status", 200);
    //         return done();
    //     });
    // });
    
});
