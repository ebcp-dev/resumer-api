'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var environment = process.env.NODE_ENV || 'development';
var config = require('./' + environment).config;
console.log('Environment: ' + environment);
exports.default = config;
//# sourceMappingURL=index.js.map