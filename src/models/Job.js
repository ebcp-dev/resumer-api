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
      type: type.STRING,
      defaultValue: 'Unspecified'
    },
    seniority: {
      type: type.STRING,
      defaultValue: 'Unspecified'
    },
    salaryRange: {
      type: type.STRING,
      defaultValue: 'Unspecified'
    },
    status: {
      type: type.STRING,
      defaultValue: 'Saved'
    }
  });
};
