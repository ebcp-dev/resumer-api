import request from 'supertest';
import app from '../../src/server';
import { User, Profile, Job } from '../../src/sequelize';
import { userInput } from './testInput';

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

after((done) => {
  Job.destroy({ where: {}, force: true }).then((destroyed) => {
    Profile.destroy({ where: {}, force: true }).then((destroyed) => {
      User.destroy({ where: {}, force: true }).then((destroyed) => {
        done();
        process.exit(0);
      });
    });
  });
});
