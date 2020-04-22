/** @module src/validation/login */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateLoginInput = (data) => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  /** Set email to invalid error message if invalid email. */
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }

  /** Set email value to required error message if empty. */
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  /** Set passport value to required error message if empty. */
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
