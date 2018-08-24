/** @module src/validation/profile */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateProfileInput = data => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.username = !isEmpty(data.username) ? data.username : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  /** Set username value to required error message if empty. */
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required.';
  }

  /** Set status value to required error message if empty. */
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required.';
  }

  /** Set website value to invalid if invalid url. */
  if (
    data.website &&
    !Validator.isURL(data.website, { require_protocol: true })
  ) {
    errors.website = 'Website URL is invalid.';
  }

  /** Set linkedin value to invalid if invalid url. */
  if (
    data.linkedin &&
    !Validator.isURL(data.linkedin, { require_protocol: true })
  ) {
    errors.linkedin = 'LinkedIn URL is invalid.';
  }

  /** Set github value to invalid if invalid url. */
  if (
    data.github &&
    !Validator.isURL(data.github, { require_protocol: true })
  ) {
    errors.github = 'GitHub URL is invalid.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateProfileInput;
