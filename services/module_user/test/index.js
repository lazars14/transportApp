var should = require("should"),
    config = require("../../../config/"),
    request  = require('supertest'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    app      = require("../../../server.js");

describe("User tests", function () {

    var token;
    var user;
    var destinationRequest;

    var dummyId = '5a1e98c67ecb023338a3cac3';
    var dummyToken = jwt.sign({
        email: "user@gmail.com",
        userId: dummyId
    }, config.token.secret, {
        expiresIn: 1440 // expires in 24 hours
    });

    it("register - fail - missing data", function (done) {
        var data;
        data = {
            email: "user@gmail.com"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("register - fail - missing data - wrong email format", function (done) {
        var data;
        data = {
            email: "test",
            password: "test"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                done();
            });
    });

    it("register - success - valid data ", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };

        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property('status', 200);
                done();
            });
    });

    it("register - fail - already registered", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 406);
                done();
            });
    });

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "user@gmail.com"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                done();
            });
    });

    it("login - fail - wrong email format", function (done) {
        var data;
        data = {
            email: "user"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                done();
            });
    });

    it("login - fail - invalid password", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test123"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 409);
                done();
            });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.body.should.have.property("token");
                token = res.body.token;
                user = res.body.user;
                return done();
            });
    });

    it("user add request - fail - missing token", function (done){
        var data = {
            "startLocation": {
                "lat": 45.32,
                "lng": 45.32
            },
            "endLocation": {
                "lat": 45.33,
                "lng": 45.33
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("user add request - fail - missing data", function (done){
        var data = {
            "startLocation": {
                "lat": 45.32,
                "lng": 45.32
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("user add request - fail - not found", function (done){
        var data = {
            "startLocation": {
                "lat": 45.32,
                "lng": 45.32
            },
            "endLocation": {
                "lat": 45.33,
                "lng": 45.33
            }
        };

        return request(app).post('/user/' + dummyId + '/requests')
            .set('x-access-token', dummyToken)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("user add request - success - valid data", function (done){
        var data = {
            "startLocation": {
                "lat": 45.32,
                "lng": 45.32
            },
            "endLocation": {
                "lat": 45.33,
                "lng": 45.33
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);

                destinationRequest = res.body;
                global.destinationRequest1test = res.body;

                return done();
            });
    });

    it("user add request - success - valid data - for testing in frontend", function (done){
        var data = {
            // Novi Sad - Subotica
            "startLocation": {
                "lat": 45.2671,
                "lng": 19.8335
            },
            "endLocation": {
                "lat": 46.1003,
                "lng": 19.6675
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("user add request - success - valid data - for testing in frontend", function (done){
        var data = {
            // Backa Palanka - Subotica
            "startLocation": {
                "lat": 45.2497,
                "lng": 19.3967
            },
            "endLocation": {
                "lat": 46.1003,
                "lng": 19.6675
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("user add request - success - valid data - for testing in frontend", function (done){
        var data = {
            // Vrbas - Subotica
            "startLocation": {
                "lat": 45.5701,
                "lng": 19.6449
            },
            "endLocation": {
                "lat": 46.1003,
                "lng": 19.6675
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("user add request - success - valid data - for testing in frontend", function (done){
        var data = {
            // Kikinda - Subotica
            "startLocation": {
                "lat": 45.8272,
                "lng": 20.4615
            },
            "endLocation": {
                "lat": 46.1003,
                "lng": 19.6675
            }
        };
        return request(app).post('/user/' + user._id + '/requests')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });
    
    it("user get requests - fail - missing token", function (done) {
        return request(app).get('/user/' + user._id + '/requests')
            .type('application/json').end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("user get requests - fail - not found", function (done){
        return request(app).get('/user/' + dummyId + '/requests')
        .set('x-access-token', dummyToken)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("user get requests - success - valid data", function (done){
        return request(app).get('/user/' + user._id + '/requests')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 200);
            return done();
        });
    });

    it("change user password - fail - missing token", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatPassword: "newPassword"
        });
        return request(app).put('/user/' + user._id + '/changePassword')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("change user password - fail - not found", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatPassword: "newPassword"
        });
        return request(app).put('/user/' + dummyId + '/changePassword')
        .set('x-access-token', dummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("change user password - fail - missing data", function (done) {
        var data;
        data = ({
            newPassword: "newPassword",
            repeatPassword: "newPassword"
        });
        return request(app).put('/user/' + user._id + '/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("change user password - fail - not allowed", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatPassword: "newPassword123"
        });
        return request(app).put('/user/' + user._id + '/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("change user password - success - valid data", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatPassword: "newPassword"
        });
        return request(app).put('/user/' + user._id + '/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("change user email - fail - missing token", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com",
            newEmail: "test123@gmail.com"
        });
        return request(app).put('/user/' + user._id + '/changeEmail')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("change user email - fail - missing data", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com"
        });
        return request(app).put('/user/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("change user email - fail - not allowed", function (done) {
        var data;
        data = ({
            oldEmail: "user123@gmail.com",
            newEmail: "test123@gmail.com"
        });
        return request(app).put('/user/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 405);
                return done();
            });
    });

    it("change user email - fail - not found", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com",
            newEmail: "test123@gmail.com"
        });
        return request(app).put('/user/' + dummyId + '/changeEmail')
        .set('x-access-token', dummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("change user email - success - valid data", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com",
            newEmail: "user123@gmail.com"
        });
        return request(app).put('/user/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    it("update user info - fail - missing token", function (done) {
        var data;
        data = ({
            firstName: "firstName",
            lastName: "lastName",
            address: "address",
            phone: "05232352520"
        });
        return request(app).put('/user/' + user._id)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("update user info - fail - missing data", function (done) {
        var data;
        data = ({
            firstName: "firstName",
            lastName: "lastName",
            address: "address"
        });
        return request(app).put('/user/' + user._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("update user info - fail - not found", function (done) {
        var data;
        data = ({
            firstName: "firstName",
            lastName: "lastName",
            address: "address",
            phone: "05232352520"
        });
        return request(app).put('/user/' + dummyId)
        .set('x-access-token', dummyToken)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("update user info - success - valid data", function (done) {
        var data;
        data = ({
            firstName: "firstName",
            lastName: "lastName",
            address: "address",
            phone: "05232352520"
        });
        return request(app).put('/user/' + user._id)
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

    // it("accept request - fail - missing token", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ destinationRequest._id + '/accept')
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("accept request - fail - not found", function (done) {
    //     return request(app).put('/user/' + dummyId + '/requests/'+ destinationRequest._id + '/accept')
    //     .set('x-access-token', dummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("accept request - fail - not found", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ dummyId + '/accept')
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("accept request - success - valid data", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ destinationRequest._id + '/accept')
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    // it("reject request - fail - missing token", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ destinationRequest._id + '/reject')
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 401);
    //             return done();
    //         });
    // });

    // it("reject request - fail - not found", function (done) {
    //     return request(app).put('/user/' + dummyId + '/requests/'+ destinationRequest._id + '/reject')
    //     .set('x-access-token', dummyToken)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("reject request - fail - not found", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ dummyId + '/reject')
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 404);
    //             return done();
    //         });
    // });

    // it("reject request - success - valid data", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ destinationRequest._id + '/reject')
    //         .set('x-access-token', token)
    //         .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 200);
    //             return done();
    //         });
    // });

    // it("accept request - fail - not allowed", function (done) {
    //     return request(app).put('/user/' + user._id + '/requests/'+ destinationRequest._id + '/accept')
    //     .set('x-access-token', token)
    //     .type('application/json').end(function (err, res) {
    //             res.should.have.property("status", 405);
    //             return done();
    //         });
    // });



});