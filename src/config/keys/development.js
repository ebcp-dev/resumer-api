/** @module src/config/keys */

export const config = {
  env: 'development',
  secretOrKey: 'secret',
  db: 'api-db',
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
