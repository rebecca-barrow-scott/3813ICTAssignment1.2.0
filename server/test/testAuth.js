var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('Authenticate User', () => {
    it('it should reset the user collection', (done) => {
        chai.request(app)
        .get('/setUserCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it should authenticate a user', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'super@gmail.com','password': 'super'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should check an incorrect password', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'super@gmail.com','password': 'incorrect'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Password is wrong");
                done();
            });
    });
    it('it should check the user exists', (done) => {
        chai.request(app).post('/api/auth').type('form').send({'email': 'test@gmail.com','password': '123'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "User doesn't exist");
                done();
            });
    });
});