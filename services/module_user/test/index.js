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

    it("register - fail - missing data", function (done) {
        var data;
        data = {
            email: "user@gmail.com"
        };
        return request(app).post('/users/register')
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
        return request(app).post('/clients/register')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
        });
    });

    it("register - success - valid data ", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };

        return request(app).post('/clients/register')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property('status', 200);
            return done();
        });
    });

    it("register - fail - already registered", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };
        return request(app).post('/clients/register')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 406);
            return done();
        });
    });

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "user@gmail.com"
        };
        return request(app).post('/users/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 400);
            return done();
            });
    });

    it("login - fail - invalid password", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test123"
        };
        return request(app).post('/users/login')
        .type('application/json').send(data).end(function (err, res) {
            res.should.have.property("status", 409);
            return done();
        });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "user@gmail.com",
            password: "test"
        };
        return request(app).post('/users/login')
        .type('application/json').send(data).end(function (err, res) {
            res.body.should.have.property("token");
            // data for further tests
            token = res.body.token;
            user = res.body.user;
            return done();
        });
    });

    it("user add request - fail - missing token", function (done){
        var data = {
            "startLocation" : {
                "lat": "45.32",
                "lng": "45.32"
            },
            "endLocation" : {
                "lat": "45.33",
                "lng": "45.33"
            }
        };
        return request(app).post('/users/' + user._id + '/requests')
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 401);
            return done();
        });
    });

    it("user add request - fail - missing data", function (done){
        var data = {
            "startLocation" : {
                "lat": "45.32",
                "lng": "45.32"
            }
        };
        return request(app).post('/users/' + user._id + '/requests')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 400);
            return done();
        });
    });

    it("user add request - fail - not found", function (done){
        var data = {
            "startLocation" : {
                "lat": "45.32",
                "lng": "45.32"
            },
            "endLocation" : {
                "lat": "45.33",
                "lng": "45.33"
            }
        };
        return request(app).post('/users/5a1e98c67ecb023338a3cac3/requests')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("user add request - success - valid data", function (done){
        var data = {
            "startLocation" : {
                "lat": "45.32",
                "lng": "45.32"
            },
            "endLocation" : {
                "lat": "45.33",
                "lng": "45.33"
            }
        };
        return request(app).post('/users/' + user._id + '/requests')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 200);

            destinationRequest = res.body.request;
            // or request.body, check in debugger

            return done();
        });
    });
    
    it("user get requests - fail - missing token", function (done){
        return request(app).get('/users/' + user._id + '/requests')
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 401);
            return done();
        });
    });

    it("user get requests - fail - missing data", function (done){
        return request(app).get('/users/requests')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 400);
            return done();
        });
    });

    it("user get requests - fail - not found", function (done){
        return request(app).get('/users/5a1e98c67ecb023338a3cac3/requests')
        .set('x-access-token', token)
        .type('application/json').end(function (err, res){
            res.should.have.property("status", 404);
            return done();
        });
    });

    it("user get requests - success - valid data", function (done){
        return request(app).get('/users/' + user._id + '/requests')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res){
            res.should.have.property("status", 200);
            return done();
        });
    });

    it("change user password - fail - missing token", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatedPassword: "newPassword"
        });
        return request(app).put('/users/' + user._id + '/changePassword')
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("change user password - fail - not found", function (done) {
        var data;
        data = ({
            newPassword: "newPassword",
            repeatedPassword: "newPassword"
        });
        return request(app).put('/users/5a1e98c67ecb023338a3cac3/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("change user password - fail - missing data", function (done) {
        var data;
        data = ({
            newPassword: "newPassword",
            repeatedPassword: "newPassword"
        });
        return request(app).put('/users/' + user._id + '/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("change user password - fail - not allowed", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatedPassword: "newPassword123"
        });
        return request(app).put('/users/' + user._id + '/changePassword')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 403);
                return done();
            });
    });

    it("change user password - success - valid data", function (done) {
        var data;
        data = ({
            oldPassword: "test",
            newPassword: "newPassword",
            repeatedPassword: "newPassword"
        });
        return request(app).put('/users/' + user._id + '/changePassword')
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
        return request(app).put('/users/' + user._id + '/changeEmail')
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
        return request(app).put('/users/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("change user email - fail - not allowed", function (done) {
        var data;
        data = ({
            oldEmail: "user123@gmail.com",
            newEmail: "test123@gmail.com"
        });
        return request(app).put('/users/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 403);
                return done();
            });
    });

    it("change user email - fail - not found", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com",
            newEmail: "test123@gmail.com"
        });
        return request(app).put('/users/5a1e98c67ecb023338a3cac3/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 403);
                return done();
            });
    });

    it("change user email - success - valid data", function (done) {
        var data;
        data = ({
            oldEmail: "user@gmail.com",
            newEmail: "user123@gmail.com"
        });
        return request(app).put('/users/' + user._id + '/changeEmail')
        .set('x-access-token', token)
        .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

});