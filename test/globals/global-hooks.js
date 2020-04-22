import request from 'supertest';
import app from '../../src/server';
import { User, Data } from '../../src/sequelize';
import { userInput } from './testInput';

before((done) => {
  app.on('Database ready.', () => {
    Data.destroy({ where: {}, force: true });
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
  Data.destroy({ where: {}, force: true }).then((destroyed) => {
    User.destroy({ where: {}, force: true }).then((destroyed) => {
      process.exit(0);
    });
  });
});
