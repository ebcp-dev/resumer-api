'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module src/config/keys */

var config = exports.config = {
  env: 'test',
  secretOrKey: 'secret',
  db: 'resumer-test',
  dbuser: 'postgres',
  dbpass: 'admin',
  dbconfig: {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
};
//# sourceMappingURL=test.js.map