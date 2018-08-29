/** @module src/config/keys */

/** Define database credentials. */
const DBNAME = process.env.DBNAME;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;
const DBHOST = process.env.DBHOST;

export const config = {
  env: 'production',
  secretOrKey: 'secret',
  db: DBNAME,
  dbuser: DBUSER,
  dbpass: DBPASS,
  dbconfig: {
    host: DBHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
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
