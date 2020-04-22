/** @module src/validation/register */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateRegisterInput = (data) => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  /** Set email to invalid error message if invalid email. */
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }

  /** Set email value to required error message if empty. */
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  /** Set password value to required error message if empty. */
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  /** Set password 2 value to required error message if empty. */
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required.';
  }

  /** Passwords must match error. */
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
