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
/** @module src/validation/profile */

/** Import Validator dependency. */
var validateProfileInput = function validateProfileInput(data) {
  /** Define errors object. */
  var errors = {};

  /** Replace values to empty string if object key is empty. */
  data.username = !(0, _isEmpty2.default)(data.username) ? data.username : '';
  data.status = !(0, _isEmpty2.default)(data.status) ? data.status : '';

  /** Set username value to required error message if empty. */
  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'Username is required.';
  }

  /** Set status value to required error message if empty. */
  if (_validator2.default.isEmpty(data.status)) {
    errors.status = 'Status is required.';
  }

  /** Set website value to invalid if invalid url. */
  if (data.website && !_validator2.default.isURL(data.website, { require_protocol: true })) {
    errors.website = 'Website URL is invalid.';
  }

  /** Set linkedin value to invalid if invalid url. */
  if (data.linkedin && !_validator2.default.isURL(data.linkedin, { require_protocol: true })) {
    errors.linkedin = 'LinkedIn URL is invalid.';
  }

  /** Set github value to invalid if invalid url. */
  if (data.github && !_validator2.default.isURL(data.github, { require_protocol: true })) {
    errors.github = 'GitHub URL is invalid.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};
/** Import isEmpty custom function*/
exports.default = validateProfileInput;
//# sourceMappingURL=profile.js.map