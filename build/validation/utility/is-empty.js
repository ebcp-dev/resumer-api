'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @module src/validation/utility/is-empty */

/** Function to check if value is empty string or object. */
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;
};

exports.default = isEmpty;
//# sourceMappingURL=is-empty.js.map