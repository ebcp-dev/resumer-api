import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../src/server';
import { userInput } from './globals/testInput';
import './globals/global-hooks';

describe('User routes:', (done) => {
  describe('POST /user/signup - register user account', () => {
    it('Status 200 on successful signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send(userInput.testSignup2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.email).to.equal(userInput.testSignup2.email);
          done();
        });
    });
    it('Status 400 on existing signup email', (done) => {
      request(app)
        .post('/api/user/signup')
        .send(userInput.testSignup1)
        .expect(400)
        .end((err, res) => {
          expect(res.body.email).to.equal('Email already in use.');
          done();
        });
    });
    it('Status 400 on empty signup input', (done) => {
      request(app)
        .post('/api/user/signup')
        .send(userInput.emptySignupInput)
        .expect(400)
        .end((err, res) => {
          expect(res.body.email).to.equal('Email is required.');
          expect(res.body.password).to.equal('Password is required.');
          expect(res.body.password2).to.equal('Confirm password is required.');
          done();
        });
    });
    it('Status 400 on confirm password signup failure', (done) => {
      request(app)
        .post('/api/user/signup')
        .send(userInput.unconfirmedSignupPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body.password2).to.equal('Passwords must match.');
          done();
        });
    });
    it('Status 400 on invalid email', (done) => {
      request(app)
        .post('/api/user/signup')
        .send(userInput.invalidSignupEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body.email).to.equal('Email is invalid.');
          done();
        });
    });
  });
  describe('POST /user/login - login to registered account', () => {
    it('Status 200 on successful login', (done) => {
      request(app)
        .post('/api/user/login')
        .send(userInput.testLogin1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });
    it('Status 400 on wrong login email', (done) => {
      request(app)
        .post('/api/user/login')
        .send(userInput.wrongLoginEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body.email).to.equal('User not found.');
          done();
        });
    });
    it('Status 400 on wrong login password', (done) => {
      request(app)
        .post('/api/user/login')
        .send(userInput.wrongLoginPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body.password).to.equal('Incorrect password.');
          done();
        });
    });
    it('Status 400 on empty login input', (done) => {
      request(app)
        .post('/api/user/login')
        .send(userInput.emptyLoginInput)
        .expect(400)
        .end((err, res) => {
          expect(res.body.email).to.equal('Email is required.');
          expect(res.body.password).to.equal('Password is required.');
          done();
        });
    });
  });
  describe("GET /user/current - get authenticated user's details", () => {
    let token;
    before((done) => {
      request(app)
        .post('/api/user/login')
        .send(userInput.testLogin1)
        .end((err, res) => {
          token = res.body.session;
          done();
        });
    });
    it('Status 200 on authorized access for /current', (done) => {
      request(app)
        .get('/api/user/current')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.email).to.equal(userInput.testLogin1.email);
          done();
        });
    });
    it('Status 401 on unauthorized access for /current', (done) => {
      request(app).get('/api/user/current').expect(401, done);
    });
  });
});
