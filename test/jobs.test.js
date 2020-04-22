import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../src/server';
import { User, Job } from '../src/sequelize';
import { userInput, jobInput } from './globals/testInput';
import './globals/global-hooks';

// Create and login test users
describe('Job routes:', (done) => {
  let token, token2, job1Id;
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
  describe('GET /job/all - no jobs added yet', () => {
    it('Status 200 with empty array for user 1', (done) => {
      request(app)
        .get('/api/job/all')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(0);
          done();
        });
    });
    it('Status 200 with empty array for user 2', (done) => {
      request(app)
        .get('/api/job/all')
        .set('Authorization', token2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(0);
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).get('/api/job/all').expect(401, done);
    });
  });
  describe("POST /job - add jobs to user 1's collection", () => {
    it('Status 200 on succesful add 1', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .send(jobInput.testAddJob1)
        .expect(200)
        .end((err, res) => {
          job1Id = res.body.id;
          expect(res.body.link).equals(jobInput.testAddJob1.link);
          done();
        });
    });
    it('Status 200 on succesful add 2', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .send(jobInput.testAddJob2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.link).equals(jobInput.testAddJob2.link);
          done();
        });
    });
    it('Status 200 on succesful add 3', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .send(jobInput.testAddJob3)
        .expect(200)
        .end((err, res) => {
          expect(res.body.link).equals(jobInput.testAddJob3.link);
          done();
        });
    });
    it('Status 400 on non-unique job link', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .send(jobInput.testAddJob1)
        .expect(400)
        .end((err, res) => {
          expect(res.body.link).equals('Job already added.');
          done();
        });
    });
    it('Status 400 on empty job input', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.role).equals('Role is required.');
          expect(res.body.company).equals('Company is required.');
          expect(res.body.link).equals('Link is required.');
          done();
        });
    });
    it('Status 400 on invalid job link', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token)
        .send(jobInput.invalidJobLink)
        .expect(400)
        .end((err, res) => {
          expect(res.body.link).equals('Link is invalid.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app)
        .post('/api/job')
        .send(jobInput.testAddJob1)
        .expect(401, done);
    });
  });
  describe("PUT /job - update already existing job in user 1's collection", () => {
    it('Status 200 on succesful update to job1', (done) => {
      request(app)
        .get('/api/user/current')
        .set('Authorization', token)
        .then((res) => {
          const testUpdateJob1 = {
            id: job1Id,
            userId: res.body.id,
            role: 'Senior Software Engineer',
            company: 'Facebook',
            link: 'https://job1.com',
            location: 'Menlo Park, CA',
            seniority: 'Senior',
            salaryRange: '200-300k'
          };
          request(app)
            .put('/api/job')
            .set('Authorization', token)
            .send(testUpdateJob1)
            .expect(200)
            .end((err, res) => {
              expect(res.body.id).equals(testUpdateJob1.id);
              expect(res.body.link).equals(testUpdateJob1.link);
              done();
            });
        });
    });
    it('Status 400 on already existing job link', (done) => {
      request(app)
        .put('/api/job')
        .set('Authorization', token)
        .send(jobInput.testAddJob1)
        .expect(400)
        .end((err, res) => {
          expect(res.body.link).equals('Job already added.');
          done();
        });
    });
    it('Status 400 on empty job input', (done) => {
      request(app)
        .put('/api/job')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.role).equals('Role is required.');
          expect(res.body.company).equals('Company is required.');
          expect(res.body.link).equals('Link is required.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).put('/api/job').send(jobInput.testAddJob1).expect(401, done);
    });
  });

  describe("POST /job - add jobs to user 2's collection", () => {
    it('Status 200 on succesful add', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .send(jobInput.testAddJob1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.link).equals(jobInput.testAddJob1.link);
          done();
        });
    });
    it('Status 200 on succesful add', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .send(jobInput.testAddJob2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.link).equals(jobInput.testAddJob2.link);
          done();
        });
    });
    it('Status 200 on succesful add', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .send(jobInput.testAddJob3)
        .expect(200)
        .end((err, res) => {
          expect(res.body.link).equals(jobInput.testAddJob3.link);
          done();
        });
    });
    it('Status 400 on non-unique job link', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .send(jobInput.testAddJob1)
        .expect(400)
        .end((err, res) => {
          expect(res.body.link).equals('Job already added.');
          done();
        });
    });
    it('Status 400 on empty job input', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .expect(400)
        .end((err, res) => {
          expect(res.body.role).equals('Role is required.');
          expect(res.body.company).equals('Company is required.');
          expect(res.body.link).equals('Link is required.');
          done();
        });
    });
    it('Status 400 on invalid job link', (done) => {
      request(app)
        .post('/api/job')
        .set('Authorization', token2)
        .send(jobInput.invalidJobLink)
        .expect(400)
        .end((err, res) => {
          expect(res.body.link).equals('Link is invalid.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).post('/api/job').expect(401, done);
    });
  });
  describe("DELETE /job - delete user 1's jobs by their links", () => {
    it('Status 200 on succesful delete of 1 job', (done) => {
      request(app)
        .delete('/api/job')
        .set('Authorization', token)
        .send(jobInput.testDeleteJob3)
        .expect(200)
        .end((err, res) => {
          expect(res.body.deleted).to.be.true;
          done();
        });
    });
    it('Status 400 if no links provided for deletion', (done) => {
      request(app)
        .delete('/api/job')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.deleted).to.be.false;
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app)
        .delete('/api/job')
        .send(jobInput.testDeleteJob1)
        .expect(401, done);
    });
  });
  describe("DELETE /job - delete user 2's jobs by their links", () => {
    it('Status 200 on succesful delete of 2 jobs', (done) => {
      request(app)
        .delete('/api/job')
        .set('Authorization', token2)
        .send(jobInput.testDeleteJob12)
        .expect(200)
        .end((err, res) => {
          expect(res.body.deleted).to.be.true;
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app)
        .delete('/api/job')
        .send(jobInput.testDeleteJob1)
        .expect(401, done);
    });
  });
  describe('GET /job/all - no jobs added yet', () => {
    it('Status 200 with array of length 2 for user 1', (done) => {
      request(app)
        .get('/api/job/all')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(2);
          done();
        });
    });
    it('Status 200 with arrayof length 1 for user 2', (done) => {
      request(app)
        .get('/api/job/all')
        .set('Authorization', token2)
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(1);
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).get('/api/job/all').expect(401, done);
    });
  });
  after((done) => {
    Job.destroy({ where: {}, force: true }).then((destroyed) => {
      User.destroy({
        where: { email: userInput.testSignup2.email },
        force: true
      }).then((destroyed) => {
        done();
      });
    });
  });
});
