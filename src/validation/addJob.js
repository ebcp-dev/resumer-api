/** @module src/validation/addJob */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateJobInput = data => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.role = !isEmpty(data.role) ? data.role : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.link = !isEmpty(data.link) ? data.link : '';

  /** Return error if invalid link. */
  if (!Validator.isURL(data.link)) {
    errors.link = 'Link is invalid.';
  }

  /** Set role value to required error message if empty. */
  if (Validator.isEmpty(data.role)) {
    errors.role = 'Role is required.';
  }

  /** Set company value to required error message if empty. */
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company is required.';
  }

  /** Set link value to required error message if empty. */
  if (Validator.isEmpty(data.link)) {
    errors.link = 'Link is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateJobInput;
