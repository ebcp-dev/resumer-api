'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _sequelize = require('../sequelize');

var _keys = require('../config/keys');

var _keys2 = _interopRequireDefault(_keys);

var _register = require('../validation/register');

var _register2 = _interopRequireDefault(_register);

var _login = require('../validation/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module src/routes/user */

/** Import dependencies. */
var router = _express2.default.Router();

/** Import defined User schema from sequelize. */


/** Import secretOrKey option from config/keys. */


/** Import validation function. */


/** User signup route */
router.post('/signup', function (req, res) {
  var _validateRegisterInpu = (0, _register2.default)(req.body),
      errors = _validateRegisterInpu.errors,
      isValid = _validateRegisterInpu.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var newUser = {
    email: req.body.email,
    password: req.body.password
  };
  // Hash password before storing into db
  _bcryptjs2.default.genSalt(10, function (err, salt) {
    _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
    });
  });
  _sequelize.User.findOrCreate({
    where: { email: newUser.email },
    defaults: newUser
  }).spread(function (user, created) {
    if (!created) {
      errors.email = 'Email already in use.';
      return res.status(400).json(errors);
    } else {
      return res.status(200).json(user);
    }
  });
});

/** User sign in route. */
router.post('/login', function (req, res) {
  var _validateLoginInput = (0, _login2.default)(req.body),
      errors = _validateLoginInput.errors,
      isValid = _validateLoginInput.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Get input from request body. */
  var email = req.body.email;
  var password = req.body.password;

  /** Find user by email firsts. */
  _sequelize.User.findOne({ where: { email: email } }).then(function (user) {
    if (!user) {
      errors.email = 'User not found.';
      return res.status(400).json(errors);
    }
    /** Compare input password with hashed password. */
    _bcryptjs2.default.compare(password, user.password).then(function (isMatch) {
      if (isMatch) {
        /** JWT payload */
        var payload = {
          email: user.email,
          joined: user.createdAt
        };
        /** Sign the token with payload if passwords matched. */
        _jsonwebtoken2.default.sign(payload, _keys2.default.secretOrKey, { expiresIn: 3600 }, function (err, token) {
          return res.status(200).json({
            success: true,
            session: 'Bearer ' + token
          });
        });
      } else {
        errors.password = 'Incorrect password.';
        return res.status(400).json(errors);
      }
    });
  });
});

/** Get current authenticated user route. */
router.get('/current', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  return res.status(200).json(req.user);
});

exports.default = router;
//# sourceMappingURL=user.js.map