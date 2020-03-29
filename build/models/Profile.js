'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module src/models/profile */

/** Define Profile model as function. */
var ProfileModel = exports.ProfileModel = function ProfileModel(sequelize, type) {
  return sequelize.define('profile', {
    id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV4
    },
    userId: {
      type: type.UUID,
      allowNull: false
    },
    username: {
      type: type.STRING,
      unique: true,
      allowNull: false,
      max: 20
    },
    status: {
      type: type.STRING,
      allowNull: false
    },
    website: {
      type: type.STRING
    },
    linkedin: {
      type: type.STRING
    },
    github: {
      type: type.STRING
    },
    stackoverflow: {
      type: type.STRING
    },
    dribbble: {
      type: type.STRING
    },
    twitter: {
      type: type.STRING
    }
  });
};
//# sourceMappingURL=Profile.js.map