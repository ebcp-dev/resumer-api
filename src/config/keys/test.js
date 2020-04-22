/** @module src/config/keys */

export const config = {
  env: 'test',
  secretOrKey: 'secret',
  db: 'api-test',
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
