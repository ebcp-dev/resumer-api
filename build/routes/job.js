'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @module src/routes/job */

/** Import dependencies. */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _sequelize = require('../sequelize');

var _addJob = require('../validation/addJob');

var _addJob2 = _interopRequireDefault(_addJob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/** Import defined Job schema from sequelize. */


/** Import validation function. */


/** Add job route. */
router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var _validateJobInput = (0, _addJob2.default)(req.body),
      errors = _validateJobInput.errors,
      isValid = _validateJobInput.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var newJob = {
    userId: req.user.id,
    role: req.body.role,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location || 'Unspecified',
    seniority: req.body.seniority || 'Unspecified',
    salaryRange: req.body.salaryRange || 'Unspecified'
  };

  _sequelize.Job.findOrCreate({
    where: { userId: newJob.userId, link: newJob.link },
    defaults: newJob
  }).spread(function (job, created) {
    if (!created) {
      errors.link = 'Job already added.';
      return res.status(400).json(errors);
    } else {
      return res.status(200).json(job);
    }
  }).catch(function (err) {
    return res.status(400).json(err);
  });
});

/** Update job route. */
router.put('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var _validateJobInput2 = (0, _addJob2.default)(req.body),
      errors = _validateJobInput2.errors,
      isValid = _validateJobInput2.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var updateJob = {
    id: req.body.id,
    role: req.body.role,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location || 'Unspecified',
    seniority: req.body.seniority || 'Unspecified',
    salaryRange: req.body.salaryRange || 'Unspecified',
    status: req.body.status || 'Saved'
  };
  /** Check if link is already in user's list. */
  _sequelize.Job.findOne({
    where: { userId: req.user.id, link: updateJob.link }
  }).then(function (job) {
    if (job && job.id !== updateJob.id) {
      /** 400 error if link is not unique. */
      errors.link = 'Job already added.';
      return res.status(400).json(errors);
    } else {
      /** Update and return updated if link is unique. */
      _sequelize.Job.update(updateJob, {
        returning: true,
        where: { id: updateJob.id }
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            rowsUpdate = _ref2[0],
            _ref2$ = _slicedToArray(_ref2[1], 1),
            updatedJob = _ref2$[0];

        return res.status(200).json(updatedJob);
      }).catch(function (err) {
        return res.status(400).json(err);
      });
    }
  });
});

/** Delete job route. */
router.delete('/', _passport2.default.authenticate('jwt', {
  session: false
}), function (req, res) {
  var linksToDelete = req.body.links || [];
  _sequelize.Job.destroy({ where: { userId: req.user.id, link: linksToDelete } }).then(function (deleted) {
    if (deleted) {
      return res.status(200).json({ deleted: true });
    } else {
      return res.status(400).json({ deleted: false });
    }
  });
});

/** Get list of jobs added by current authenticated user. */
router.get('/all', _passport2.default.authenticate('jwt', {
  session: false
}), function (req, res) {
  _sequelize.Job.findAll({
    where: { userId: req.user.id }
  }).then(function (jobs) {
    return res.status(200).json(jobs);
  });
});

exports.default = router;
//# sourceMappingURL=job.js.map