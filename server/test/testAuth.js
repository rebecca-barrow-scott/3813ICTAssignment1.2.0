var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('/api/auth', () => {
    it('it should authenticate a user', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'super@gmail.com','password': 'super'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('the password should be wrong', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'super@gmail.com','password': 'incorrect'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Password is wrong");
                done();
            });
    });
    it('the user shouldn\'t exist', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'test@gmail.com','password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "User doesn't exist");
                done();
            });
    });
});