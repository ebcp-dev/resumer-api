'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @module src/routes/data */

/** Import dependencies. */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _sequelize = require('../sequelize');

var _data = require('../validation/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/** Import defined Job schema from sequelize. */


/** Import validation function. */


/** Add data route. */
router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var userData = {
    userId: req.user.id,
    uniqueData: req.body.data
  };

  var _validateDataInput = (0, _data2.default)(req.body),
      errors = _validateDataInput.errors,
      isValid = _validateDataInput.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Check if data is unique. */
  _sequelize.Data.findOne({
    where: { userId: userData.userId }
  }).then(function (data) {
    if (data) {
      errors.data = 'Data is not unique.';
      return res.status(400).json(errors);
    } else {
      /** Create data if user has no data yet. */
      _sequelize.Data.findOrCreate({
        where: { username: userData.uniqueData },
        defaults: userData
      }).spread(function (userData, created) {
        if (!created) {
          /** Must have unique uniqueData. */
          errors.uniqueData = 'uniqueData already exists.';
          return res.status(400).json(errors);
        } else {
          return res.status(200).json(userData);
        }
      });
    }
  });
});

/** Update data route. */
router.put('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var dataUpdate = {
    userId: req.user.id,
    uniqueData: req.body.data
  };

  var _validateDataInput2 = (0, _data2.default)(dataUpdate),
      errors = _validateDataInput2.errors,
      isValid = _validateDataInput2.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Check if uniqueData is unique first. */
  _sequelize.Data.findOne({
    where: { uniqueData: dataUpdate.uniqueData }
  }).then(function (data) {
    /** 400 error if already exists. */
    if (data && data.userId !== dataUpdate.userId) {
      errors.uniqueData = 'Data already exists.';
      return res.status(400).json(errors);
    } else {
      /** Update data if uniqueData is unique. */
      _sequelize.Data.update(dataUpdate, {
        returning: true,
        where: { userId: dataUpdate.userId }
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            rowsUpdated = _ref2[0],
            _ref2$ = _slicedToArray(_ref2[1], 1),
            updatedData = _ref2$[0];

        return res.status(200).json(updatedData);
      }).catch(function (err) {
        return res.status(400).json(err);
      });
    }
  });
});

/** Get list of data. */
router.get('/all', function (req, res) {
  _sequelize.Data.findAll().then(function (data) {
    return res.status(200).json(data);
  });
});

/** Get data of current user. */
router.get('/', _passport2.default.authenticate('jwt', {
  session: false
}), function (req, res) {
  _sequelize.Data.findOne({ where: { userId: req.user.id } }).then(function (data) {
    _sequelize.User.findOne({ where: { id: req.user.id } }).then(function (user) {
      return res.status(200).json(data);
    });
  });
});

/** Get data of specific user. */
router.get('/:username', function (req, res) {
  _sequelize.Data.findOne({ where: { username: req.params.username } }).then(function (data) {
    if (data) {
      _sequelize.User.findOne({ where: { id: data.userId } }).then(function (user) {
        if (user) {
          return res.status(200).json({ email: user.email, data: data });
        }
      });
    } else {
      return res.status(400).json({ error: 'No data found for this user.' });
    }
  });
});

exports.default = router;
//# sourceMappingURL=data.js.map