'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = exports.User = exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('./models/User');

var _Profile = require('./models/Profile');

var _keys = require('./config/keys');

var _keys2 = _interopRequireDefault(_keys);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Connect to database using config keys. */

/** Import model definitions and database credentials. */
var db = _keys2.default.db,
    dbuser = _keys2.default.dbuser,
    dbpass = _keys2.default.dbpass,
    dbconfig = _keys2.default.dbconfig; /** @module src/sequelize */

/** Import sequelize dependency. */

var sequelize = exports.sequelize = new _sequelize2.default(db, dbuser, dbpass, dbconfig);

/** Create models with imported definitions. */
var User = exports.User = (0, _User.UserModel)(sequelize, _sequelize2.default);
var Data = exports.Data = (0, _Profile.DataModel)(sequelize, _sequelize2.default);
/** User's primary key (id) will be Profile and Job's foreign key as 'userId'. */
Data.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(function () {
  console.log('Connected to ' + db + ' as ' + dbuser + '.');
  console.log('Database & tables created!');
  /** Emit event once database has been created. */
  _server2.default.emit('Database ready.');
});
//# sourceMappingURL=sequelize.js.map