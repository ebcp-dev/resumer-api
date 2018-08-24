'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Job = exports.Profile = exports.User = exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('./models/User');

var _Profile = require('./models/Profile');

var _Job = require('./models/Job');

var _keys = require('./config/keys');

var _keys2 = _interopRequireDefault(_keys);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Connect to database using config keys. */
/** @module src/sequelize */

/** Import sequelize dependency. */
var db = _keys2.default.db,
    dbuser = _keys2.default.dbuser,
    dbpass = _keys2.default.dbpass,
    dbconfig = _keys2.default.dbconfig;
/** Import model definitions and database credentials. */

var sequelize = exports.sequelize = new _sequelize2.default(db, dbuser, dbpass, dbconfig);

/** Create models with imported definitions. */
var User = exports.User = (0, _User.UserModel)(sequelize, _sequelize2.default);
var Profile = exports.Profile = (0, _Profile.ProfileModel)(sequelize, _sequelize2.default);
var Job = exports.Job = (0, _Job.JobModel)(sequelize, _sequelize2.default);
/** User's primary key (id) will be Profile and Job's foreign key as 'userId'. */
Profile.belongsTo(User, { foreignKey: 'userId' });
Job.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(function () {
  console.log('Database & tables created!');
  /** Emit event once database has been created. */
  _server2.default.emit('Database ready.');
});
//# sourceMappingURL=sequelize.js.map