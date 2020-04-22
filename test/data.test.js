import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../src/server';
import { User, Data } from '../src/sequelize';
import { userInput, dataInput } from './globals/testInput';
import './globals/global-hooks';

describe('Data routes:', (done) => {
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
  describe('GET /data/all - no data created yet', () => {
    it('Status 200 with empty array', (done) => {
      request(app)
        .get('/api/data/all')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(0);
          done();
        });
    });
  });
  describe('POST /data - add user data', () => {
    it('Status 400 on empty add data input', (done) => {
      request(app)
        .post('/api/data')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.uniqueData).equals('uniqueData is required.');
          done();
        });
    });
    it('Status 200 on creating first data', (done) => {
      request(app)
        .post('/api/data')
        .set('Authorization', token)
        .send(dataInput.testAddData1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.uniqueData).equals(dataInput.testAddData1.uniqueData);
          done();
        });
    });
    it('Status 400 on already existing uniqueData', (done) => {
      request(app)
        .post('/api/data')
        .set('Authorization', token2)
        .send(dataInput.testAddData1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.uniqueData).equals('uniqueData already exists.');
          done();
        });
    });
    it('Status 200 on creating second data', (done) => {
      request(app)
        .post('/api/data')
        .set('Authorization', token2)
        .send(dataInput.moreData1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.uniqueData).equals(dataInput.moreData1.uniqueData);
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app)
        .post('/api/data')
        .send(dataInput.testAddData1)
        .expect(401, done);
    });
  });
  describe("GET /data - get current authenticated user's data", () => {
    it('Status 200 on authenticated request', (done) => {
      request(app)
        .get('/api/data')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.uniqueData).equals(dataInput.testAddData1.uniqueData);
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).get('/api/data').expect(401, done);
    });
  });
  describe("GET /profile/:uniqueData - get specific user's data by uniqueData", () => {
    it('Status 200 on authenticated request', (done) => {
      request(app)
        .get(`/api/data/${dataInput.testAddData1.uniqueData}`)
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.uniqueData).equals(
            dataInput.testAddData1.uniqueData
          );
          done();
        });
    });
    it('Status 400 if no data found for data', (done) => {
      request(app)
        .get('/api/data/wrongUniqueData')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).equals('No data found for this user.');
          done();
        });
    });
  });
  describe("PUT /data - update authenticated user's data", () => {
    it('Status 200 on updated uniqueData', (done) => {
      request(app)
        .put('/api/data')
        .set('Authorization', token)
        .send(dataInput.testAddData1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.uniqueData).equals(dataInput.testAddData1.uniqueData);
          done();
        });
    });
    it('Status 400 on empty update input', (done) => {
      request(app)
        .put('/api/data')
        .set('Authorization', token2)
        .end((err, res) => {
          expect(res.body.uniqueData).equals('uniqueData is required.');
          done();
        });
    });
    it('Status 400 on non-unique update uniqueData', (done) => {
      request(app)
        .put('/api/data')
        .set('Authorization', token2)
        .send(dataInput.testAddData1)
        .end((err, res) => {
          expect(res.body.uniqueData).equals('uniqueData already exists.');
          done();
        });
    });
    it('Status 401 on unauthorized request', (done) => {
      request(app).put('/api/data').expect(401, done);
    });
  });
  describe('GET /data/all - 2 data added', () => {
    it('Status 200 with array of 2 unique data', (done) => {
      request(app)
        .get('/api/data/all')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).equals(2);
          done();
        });
    });
  });
  describe("DELETE /job - delete user's data by their uniqueData", () => {
    it('Status 200 on succesful delete of 1 data', (done) => {
      request(app)
        .delete('/api/data')
        .set('Authorization', token)
        .send(dataInput.testDeleteData1)
        .expect(200)
        .end((err, res) => {
          expect(res.body.deleted).to.be.true;
          done();
        });
    });
    it('Status 400 if no uniqueData provided for deletion', (done) => {
      request(app)
        .delete('/api/data')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.deleted).to.be.false;
          done();
        });
    });
  });
  after((done) => {
    Data.destroy({
      where: { uniqueData: dataInput.testAddData1.uniqueData },
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
