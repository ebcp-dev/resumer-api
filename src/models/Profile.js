/** @module src/models/profile */

/** Define Profile model as function. */
export const ProfileModel = (sequelize, type) => {
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
    }
  });
};
