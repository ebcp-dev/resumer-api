/** @module src/sequelize */

/** Import sequelize dependency. */
import Sequelize from 'sequelize';
/** Import model definitions and database credentials. */
import { UserModel } from './models/User';
import { ProfileModel } from './models/Profile';
import { JobModel } from './models/Job';
import config from './config/keys';
import app from './server';
/** Connect to database using config keys. */
const { db, dbuser, dbpass, dbconfig } = config;
export const sequelize = new Sequelize(db, dbuser, dbpass, dbconfig);

/** Create models with imported definitions. */
export const User = UserModel(sequelize, Sequelize);
export const Profile = ProfileModel(sequelize, Sequelize);
export const Job = JobModel(sequelize, Sequelize);
/** User's primary key (id) will be Profile and Job's foreign key as 'userId'. */
Profile.belongsTo(User, { foreignKey: 'userId' });
Job.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(() => {
  console.log(`Connected to ${db} as ${dbuser}.`);
  console.log('Database & tables created!');
  /** Emit event once database has been created. */
  app.emit('Database ready.');
});
