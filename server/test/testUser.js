var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('User', () => {
    it('it should reset the user collection', (done) => {
        chai.request(app)
        .get('/setUserCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it should get all the users', (done) => {
        chai.request(app)
        .get('/getAllUsers')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            res.body.should.have.property('users');
            done();
        });
    });
    it('it should delete all users', (done) => {
        chai.request(app)
        .get('/deleteAllUsers')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            assert.equal(res.body.deletedCount, 12);
            done();
        });
    });

    it('it should validate a user', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': 'User', 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should create a user', (done) => {
        chai.request(app).post('/createUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': 'User', 'password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should check for an empty username', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': undefined, 'email': 'test@gmail.com', 'role': 'User', 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Enter a valid username");
                done();
            });
    });
    it('it should check for an empty email', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': undefined, 'role': 'User', 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Enter a valid email");
                done();
            });
    });
    it('it should check for a valid role', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': undefined, 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Enter a valid role");
                done();
            });
    });
    it('it should check for a valid password', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': 'User', 'password': undefined, 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Enter a valid password");
                done();
            });
    });
    it('it should check if the passwords match', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': 'User', 'password': '456', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Passwords don\'t match");
                done();
            });
    });
    it('it should check if the username is taken', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'test', 'email': 'test@gmail.com', 'role': 'User', 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Username is taken");
                res.body.should.have.property('user');
                done();
            });
    });
    it('it should check if the email is taken', (done) => {
        chai.request(app).post('/validateUser').type('form').send({'username': 'testNotTaken', 'email': 'test@gmail.com', 'role': 'User', 'password': '123', 'confirm_password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Email is taken");
                done();
            });
    });
    it('it should change a user\'s role', (done) => {
        chai.request(app).post('/changeUserRole').type('form').send({'username': 'test', 'role': 'Group Admin'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should change a user\'s image', (done) => {
        chai.request(app).post('/updateImg').type('form').send({'username': 'test', 'image': 'test.png'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('user');
                done();
            });
    });
});