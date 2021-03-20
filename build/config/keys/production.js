'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module src/config/keys */

/** Define database credentials. */
var DBNAME = process.env.DBNAME;
var DBUSER = process.env.DBUSER;
var DBPASS = process.env.DBPASS;
var DBHOST = process.env.DBHOST;

var config = exports.config = {
  env: 'production',
  secretOrKey: 'secret',
  db: DBNAME,
  dbuser: DBUSER,
  dbpass: DBPASS,
  dbconfig: {
    host: DBHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
};
//# sourceMappingURL=production.js.map