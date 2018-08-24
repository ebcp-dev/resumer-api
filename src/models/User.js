/** @module src/models/User */

/** Define User model as function. */
export const UserModel = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV4
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: type.STRING,
      allowNull: false
    }
  });
};
