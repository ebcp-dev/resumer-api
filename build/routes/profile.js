'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @module src/routes/profile */

/** Import dependencies. */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _sequelize = require('../sequelize');

var _profile = require('../validation/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/** Import defined Job schema from sequelize. */


/** Import validation function. */


/** Create profile route. */
router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var userProfile = {
    userId: req.user.id,
    username: req.body.username,
    status: req.body.status,
    website: req.body.website || '',
    linkedin: req.body.linkedin || '',
    github: req.body.github || '',
    stackoverflow: req.body.stackoverflow || '',
    dribbble: req.body.dribbble || '',
    twitter: req.body.twitter || ''
  };

  var _validateProfileInput = (0, _profile2.default)(req.body),
      errors = _validateProfileInput.errors,
      isValid = _validateProfileInput.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Check if user has a profile already. */
  _sequelize.Profile.findOne({
    where: { userId: userProfile.userId }
  }).then(function (profile) {
    if (profile) {
      errors.profile = 'You already have a profile.';
      return res.status(400).json(errors);
    } else {
      /** Create profile if user has no profile set up yet. */
      _sequelize.Profile.findOrCreate({
        where: { username: userProfile.username },
        defaults: userProfile
      }).spread(function (profile, created) {
        if (!created) {
          /** Must have unique username. */
          errors.username = 'Username already exists.';
          return res.status(400).json(errors);
        } else {
          return res.status(200).json(profile);
        }
      });
    }
  });
});

/** Update profile route. */
router.put('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var profileUpdate = {
    userId: req.user.id,
    username: req.body.username,
    status: req.body.status,
    website: req.body.website || '',
    linkedin: req.body.linkedin || '',
    github: req.body.github || '',
    stackoverflow: req.body.stackoverflow || '',
    dribbble: req.body.dribbble || '',
    twitter: req.body.twitter || ''
  };

  var _validateProfileInput2 = (0, _profile2.default)(profileUpdate),
      errors = _validateProfileInput2.errors,
      isValid = _validateProfileInput2.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Check if username is unique first. */
  _sequelize.Profile.findOne({
    where: { username: profileUpdate.username }
  }).then(function (profile) {
    /** 400 error if already exists. */
    if (profile && profile.userId !== profileUpdate.userId) {
      errors.username = 'Username already exists.';
      return res.status(400).json(errors);
    } else {
      /** Update profile if username is unique. */
      _sequelize.Profile.update(profileUpdate, {
        returning: true,
        where: { userId: profileUpdate.userId }
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            rowsUpdated = _ref2[0],
            _ref2$ = _slicedToArray(_ref2[1], 1),
            updatedProfile = _ref2$[0];

        return res.status(200).json(updatedProfile);
      }).catch(function (err) {
        return res.status(400).json(err);
      });
    }
  });
});

/** Get list of profiles. */
router.get('/all', function (req, res) {
  _sequelize.Profile.findAll().then(function (profiles) {
    return res.status(200).json(profiles);
  });
});

/** Get profile of current user. */
router.get('/', _passport2.default.authenticate('jwt', {
  session: false
}), function (req, res) {
  _sequelize.Profile.findOne({ where: { userId: req.user.id } }).then(function (profile) {
    _sequelize.User.findOne({ where: { id: req.user.id } }).then(function (user) {
      return res.status(200).json(profile);
    });
  });
});

/** Get profile of specific user. */
router.get('/:username', function (req, res) {
  _sequelize.Profile.findOne({ where: { username: req.params.username } }).then(function (profile) {
    if (profile) {
      _sequelize.User.findOne({ where: { id: profile.userId } }).then(function (user) {
        if (user) {
          return res.status(200).json({ email: user.email, profile: profile });
        }
      });
    } else {
      return res.status(400).json({ error: 'No profiles found for this user.' });
    }
  });
});

exports.default = router;
//# sourceMappingURL=profile.js.map