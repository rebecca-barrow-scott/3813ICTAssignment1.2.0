var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('User Channel', () => {
    it('it should reset the user channel collection', (done) => {
        chai.request(app)
        .get('/userChannel/setUserChannelCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });

    it('it should get all the user channels', (done) => {
        chai.request(app)
        .get('/userChannel/getAllUserChannels')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.userChannels.length, 9);
            done();
        });
    });

    it('it should add a user to a channel', (done) => {
        chai.request(app).post('/addUserChannel').type('form').send({'channel_id': 6, 'user_id': 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });

    it('it should promote a user to group assistant', (done) => {
        chai.request(app).post('/changeUserChannelRole').type('form').send({'channels': [{'id': 6}], 'username': 'test', 'group_id': 3})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });

    it('it should check if a user is already in a channel', (done) => {
        chai.request(app).post('/addUserChannel').type('form').send({'channel_id': 6, 'user_id': 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "User is already in channel");
                done();
            });
    });

    it('it should get the channels a user is in', (done) => {
        chai.request(app).post('/userChannel/getUserChannels').type('form').send({"username": "Rebecca", "role": "User"})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.userChannels.length, 5);
                done();
            });
    });

    it('it should remove a user from a channel', (done) => {
        chai.request(app).post('/removeUserChannel').type('form').send({"channel_id": 1, "user_id": "Rebecca"})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.deleteCount, 1);
                done();
            });
    });
    it('it should remove a channel', (done) => {
        chai.request(app).post('/userChannel/removeChannel').type('form').send({"id": 2})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.deletedCount, 3);
                done();
        });
    });
    
});