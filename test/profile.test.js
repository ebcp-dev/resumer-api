import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../src/server';
import { User, Profile } from '../src/sequelize';
import { userInput, profileInput } from './globals/testInput';
import './globals/global-hooks';

// Create and login test users
describe('Profile routes:', (done) => {
  let token, token2;
  before((done) => {
    request(app)
      .post('/api/user/login')
      .send(userInput.testLogin1)
      .then((res) => {
        token = res.body.session;
        request(app)
          .post('/api/user/signup')
          .send(userInput.testSignup2)
          .end((err, res) => {
            request(app)
              .post('/api/user/login')
              .send(userInput.testLogin2)
              .end((err, res) => {
                token2 = res.body.session;
                done();
              });
          });
      });
  });
  describe('GET /profile/all - no profiles created yet', () => {
    it('Status 200 with empty array', (done) => {
      request(app)
        .get('/api/profile/all')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });
  describe('POST /profile - create user profile', () => {
    it('Status 400 on empty create profile input', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.username).to.equal('Username is required.');
          expect(res.body.status).to.equal('Status is required.');
          done();
        });
    });
    it('Status 400 on invalid website URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileWebsite)
        .expect(400)
        .end((err, res) => {
          expect(res.body.website).to.equal('Website URL is invalid.');
          done();
        });
    });
    it('Status 400 on invalid LinkedIn URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileLinkedIn)
        .expect(400)
        .end((err, res) => {
          expect(res.body.linkedin).to.equal('LinkedIn URL is invalid.');
          done();
        });
    });
    it('Status 400 on invalid GitHub URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileGitHub)
        .expect(400)
        .end((err, res) => {
          expect(res.body.github).to.equal('GitHub URL is invalid.');
          done();
        });
    });
    it('Status 400 on invalid Stack Overflow URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileStackOverFlow)
        .expect(400)
        .end((err, res) => {
          expect(res.body.stackoverflow).to.equal(
            'Stack Overflow URL is invalid.'
          );
          done();
        });
    });
    it('Status 400 on invalid Dribbble URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileDribbble)
        .expect(400)
        .end((err, res) => {
          expect(res.body.dribbble).to.equal('Dribbble URL is invalid.');
          done();
        });
    });
    it('Status 400 on invalid Twitter URL', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.invalidProfileTwitter)
        .expect(400)
        .end((err, res) => {
          expect(res.body.twitter).to.equal('Twitter URL is invalid.');
          done();
        });
    });
    it('Status 200 on creating first profile', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.testCreateProfile1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.username).to.equal(
            profileInput.testCreateProfile1.username
          );
          done();
        });
    });
    it('Status 400 if user already has a profile', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileInput.testCreateProfile1)
        .expect(400)
        .end((err, res) => {
          expect(res.body.profile).to.equal('You already have a profile.');
          done();
        });
    });
    it('Status 400 on already existing username', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token2)
        .send(profileInput.testCreateProfile1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.username).to.equal('Username already exists.');
          done();
        });
    });
    it('Status 200 on creating second profile', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token2)
        .send(profileInput.testCreateProfile2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.username).to.equal(
            profileInput.testCreateProfile2.username
          );
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app)
        .post('/api/profile')
        .send(profileInput.testCreateProfile1)
        .expect(401, done);
    });
  });
  describe("GET /profile - get current authenticated user's profile", () => {
    it('Status 200 on authenticated request', (done) => {
      request(app)
        .get('/api/profile')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.username).to.equal(
            profileInput.testCreateProfile1.username
          );
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).get('/api/profile').expect(401, done);
    });
  });
  describe("GET /profile/:username - get specific user's profile by username", () => {
    it('Status 200 on authenticated request', (done) => {
      request(app)
        .get(`/api/profile/${profileInput.testCreateProfile1.username}`)
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.profile.username).to.equal(
            profileInput.testCreateProfile1.username
          );
          done();
        });
    });
    it('Status 400 if no profiles found for username', (done) => {
      request(app)
        .get('/api/profile/wrongUsername')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.equal('No profiles found for this user.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).get('/api/profile').expect(401, done);
    });
  });
  describe("PUT /profile - update authenticated user's profile", () => {
    it('Status 200 on updated profile username', (done) => {
      request(app)
        .put('/api/profile')
        .set('Authorization', token)
        .send(profileInput.testUpdateProfile1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.username).to.equal(
            profileInput.testUpdateProfile1.username
          );
          done();
        });
    });
    it('Status 400 on empty update input', (done) => {
      request(app)
        .put('/api/profile')
        .set('Authorization', token2)
        .end((err, res) => {
          expect(res.body.username).to.equal('Username is required.');
          expect(res.body.status).to.equal('Status is required.');
          done();
        });
    });
    it('Status 400 on non-unique update username', (done) => {
      request(app)
        .put('/api/profile')
        .set('Authorization', token2)
        .send(profileInput.testUpdateProfile1)
        .end((err, res) => {
          expect(res.body.username).to.equal('Username already exists.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).put('/api/profile').expect(401, done);
    });
  });
  describe('GET /profile/all - 2 profiles added', () => {
    it('Status 200 with array of 2 profiles', (done) => {
      request(app)
        .get('/api/profile/all')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
  after((done) => {
    Profile.destroy({
      where: { username: profileInput.testCreateProfile2.username },
      truncate: true
    }).then((destroyed) => {
      User.destroy({
        where: { email: userInput.testSignup2.email },
        force: true
      }).then((destroyed) => {
        done();
      });
    });
  });
});
