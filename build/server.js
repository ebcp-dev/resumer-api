'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Define express variable. */
/** @module src/server */
var app = (0, _express2.default)();
/** Define environment port variable. */

/** Import express and passport dependencies. */
var port = process.env.PORT || 5000;

/** Have express use middleware. */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_passport2.default.initialize());

/** Import and use passport config. */

(0, _passport4.default)(_passport2.default);

/** Define API routes. */
app.use('/api/user', require('./routes/user').default);
app.use('/api/profile', require('./routes/profile').default);
app.use('/api/job', require('./routes/job').default);

/** Server listen to port on 'Database ready' event. */
app.on('Database ready.', function () {
  app.listen(port, function () {
    return console.log('Server running on port ' + port + '.');
  });
});

exports.default = app;
//# sourceMappingURL=server.js.map