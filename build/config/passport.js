'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _sequelize = require('../sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = _passportJwt2.default.Strategy; /** @module src/config/passport */

/** Import passport jwt strategy.  */

var ExtractJwt = _passportJwt2.default.ExtractJwt;

/** Import defined User schema from sequelize. */


/** Define options object to pass into JwtStrategy function. */
var opts = {};
/** Get token from Authorization Header. */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys2.default.secretOrKey;

/**
 * Create new JwtStrategy with passport.
 * Returns the payload once authenticated.
 * @param {passport} passport
 */
var useJwt = function useJwt(passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _sequelize.User.findOne({ where: { email: jwt_payload.email } }).then(function (user) {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};

/** Export the function. */
exports.default = useJwt;
//# sourceMappingURL=passport.js.map