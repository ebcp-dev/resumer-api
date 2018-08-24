'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./utility/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
/** @module src/validation/addJob */

/** Import Validator dependency. */
var validateJobInput = function validateJobInput(data) {
  /** Define errors object. */
  var errors = {};

  /** Replace values to empty string if object key is empty. */
  data.role = !(0, _isEmpty2.default)(data.role) ? data.role : '';
  data.company = !(0, _isEmpty2.default)(data.company) ? data.company : '';
  data.link = !(0, _isEmpty2.default)(data.link) ? data.link : '';

  /** Return error if invalid link. */
  if (!_validator2.default.isURL(data.link)) {
    errors.link = 'Link is invalid.';
  }

  /** Set role value to required error message if empty. */
  if (_validator2.default.isEmpty(data.role)) {
    errors.role = 'Role is required.';
  }

  /** Set company value to required error message if empty. */
  if (_validator2.default.isEmpty(data.company)) {
    errors.company = 'Company is required.';
  }

  /** Set link value to required error message if empty. */
  if (_validator2.default.isEmpty(data.link)) {
    errors.link = 'Link is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};
/** Import isEmpty custom function*/
exports.default = validateJobInput;
//# sourceMappingURL=addJob.js.map