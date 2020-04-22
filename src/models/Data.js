/** @module src/models/data */

/** Define Profile model as function. */
export const DataModel = (sequelize, type) => {
  return sequelize.define('data', {
    id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV4
    },
    userId: {
      type: type.UUID,
      allowNull: false
    },
    uniqueData: {
      type: type.STRING,
      unique: true,
      defaultValue: 'I am the data belonging to the user.',
      allowNull: false
    }
  });
};
