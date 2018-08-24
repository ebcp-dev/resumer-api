/** @module src/config/keys */

/** Define database credentials. */
const DBNAME = 'resumer_db';
const DBUSER = 'ebcp_dev';
const DBPASS = 'resumeradmin';
const DBHOST = 'resumer-db.ci0c5bgcnsn0.us-east-2.rds.amazonaws.com';

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
