/** @module src/validation/data */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateDataInput = (data) => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.uniqueData = !isEmpty(data.uniqueData) ? data.uniqueData : '';

  /** Set uniqueData value to required error message if empty. */
  if (Validator.isEmpty(data.uniqueData)) {
    errors.uniqueData = 'uniqueData is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateDataInput;
