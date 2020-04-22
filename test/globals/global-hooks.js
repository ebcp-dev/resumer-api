import request from 'supertest';
import app from '../../src/server';
import { User, Profile, Job } from '../../src/sequelize';
import { userInput } from './testInput';

// Create test database before testing
before((done) => {
  app.on('Database ready.', () => {
    Job.destroy({ where: {}, force: true });
    Profile.destroy({ where: {}, force: true });
    User.destroy({ where: {}, force: true });
    request(app)
      .post('/api/user/signup')
      .send(userInput.testSignup1)
      .end((err, res) => {
        done();
      });
  });
});

// Destroy test data after testing
after((done) => {
  Job.destroy({ where: {}, force: true }).then((destroyed) => {
    Profile.destroy({ where: {}, force: true }).then((destroyed) => {
      User.destroy({ where: {}, force: true }).then((destroyed) => {
        process.exit(0);
      });
    });
  });
});
