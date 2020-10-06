var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
const { idText } = require('typescript');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('Channels', () => {
    it('it should reset the channel collection', (done) => {
        chai.request(app)
        .get('/setChannelCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it should get all the channels', (done) => {
        chai.request(app)
        .get('/getChannels')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it validate a channel', (done) => {
        chai.request(app).post('/validateChannel').type('form').send({'name': 'test channel', 'group_id': 3})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should create a channel', (done) => {
        chai.request(app).post('/createChannel').type('form').send({'name': 'test channel', 'group_id': 3})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should check if the channel name is already taken', (done) => {
        chai.request(app).post('/validateChannel').type('form').send({'name': 'test channel', 'group_id': 3})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Channel name is already taken");
                done();
            });
    });
    it('it should delete a channel', (done) => {
        chai.request(app).post('/deleteChannel').type('form').send({'id': 7})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.deletedCount, 1);
                done();
            });
    });
});