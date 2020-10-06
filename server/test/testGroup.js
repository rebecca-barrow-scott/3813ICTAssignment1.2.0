var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
const { Db } = require('mongodb');
const { idText } = require('typescript');
let should = chai.should();
chai.use(chaiHttp);
module.exports = describe('Groups', () => {
    it('it should reset the group collection', (done) => {
        chai.request(app)
        .get('/setGroupCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it should reset the group assistant collection', (done) => {
        chai.request(app)
        .get('/setGroupAssistCollection')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.feedback, null);
            done();
        });
    });
    it('it should get all the groups', (done) => {
        chai.request(app)
        .get('/getGroups')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.groups.length, 3);
            done();
        });
    });
    it('it should get a specific group', (done) => {
        chai.request(app).post('/getGroup').type('form').send({'id': 1})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                res.body.should.have.property('groups');
                done();
            });
    });
    it('it should get all the group assistants', (done) => {
        chai.request(app)
        .get('/getGroupAssists')
        .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.groupAssists.length, 5);
            done();
        });
    });
    it('it should create a group', (done) => {
        chai.request(app).post('/createGroup').type('form').send({'id': 4, 'name': 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('group');
                done();
            });
    });
    it('it should check an empty group name', (done) => {
        chai.request(app).post('/validateGroup').type('form').send({'name': undefined})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Create a group name");
                done();
            });
    });
    it('it should check if the group name is taken', (done) => {
        chai.request(app).post('/validateGroup').type('form').send({'name': 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, "Group name is already taken");
                done();
            });
    });
    it('it should validate the group', (done) => {
        chai.request(app).post('/validateGroup').type('form').send({'name': 'newTestGroup'})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                done();
            });
    });
    it('it should remove all the group assistants from a group', (done) => {
        chai.request(app).post('/removeGroup').type('form').send({'id': 1})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                res.body.should.have.property('groupAssists');
                assert.equal(res.body.deletedCount, 3);
                done();
            });
    });
    it('it should delete a group', (done) => {
        chai.request(app).post('/deleteGroup').type('form').send({'id': 1})
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.feedback, null);
                res.body.should.have.property('groups');
                assert.equal(res.body.deletedCount, 1);
                done();
            });
    });
});