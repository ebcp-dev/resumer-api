/** @module src/models/Job */

/** Define Website model as function. */
export const JobModel = (sequelize, type) => {
  return sequelize.define('job', {
    id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV4
    },
    userId: {
      type: type.UUID,
      allowNull: false
    },
    role: {
      type: type.STRING,
      allowNull: false
    },
    company: {
      type: type.STRING,
      allowNull: false
    },
    link: {
      type: type.STRING,
      allowNull: false
    },
    location: {
      type: type.STRING
    },
    seniority: {
      type: type.STRING
    },
    salaryRange: {
      type: type.STRING
    },
    status: {
      type: type.STRING,
      defaultValue: 'Saved'
    }
  });
};
