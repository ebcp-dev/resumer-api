/** @module src/routes/job */

/** Import dependencies. */
import express from 'express';
import passport from 'passport';
const router = express.Router();

/** Import defined Job schema from sequelize. */
import { Job } from '../sequelize';

/** Import validation function. */
import validateJobInput from '../validation/addJob';

/** Add job route. */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newJob = {
      userId: req.user.id,
      role: req.body.role,
      company: req.body.company,
      link: req.body.link,
      location: req.body.location,
      seniority: req.body.seniority,
      salaryRange: req.body.salaryRange
    };

    Job.findOrCreate({
      where: { userId: newJob.userId, link: newJob.link },
      defaults: newJob
    })
      .spread((job, created) => {
        if (!created) {
          errors.link = 'Job already added.';
          return res.status(400).json(errors);
        } else {
          return res.status(200).json(job);
        }
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
);

/** Update job route. */
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updateJob = {
      id: req.body.id,
      role: req.body.role,
      company: req.body.company,
      link: req.body.link,
      location: req.body.location,
      seniority: req.body.seniority,
      salaryRange: req.body.salaryRange,
      status: req.body.status || 'Saved'
    };
    /** Check if link is already in user's list. */
    Job.findOne({
      where: { userId: req.user.id, link: updateJob.link }
    }).then((job) => {
      if (job && job.id !== updateJob.id) {
        /** 400 error if link is not unique. */
        errors.link = 'Job already added.';
        return res.status(400).json(errors);
      } else {
        /** Update and return updated if link is unique. */
        Job.update(updateJob, {
          returning: true,
          where: { id: updateJob.id }
        })
          .then(([rowsUpdate, [updatedJob]]) => {
            return res.status(200).json(updatedJob);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    });
  }
);

/** Delete job route. */
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    let linksToDelete = req.body.links || [];
    Job.destroy({ where: { userId: req.user.id, link: linksToDelete } }).then(
      (deleted) => {
        if (deleted) {
          return res.status(200).json({ deleted: true });
        } else {
          return res.status(400).json({ deleted: false });
        }
      }
    );
  }
);

/** Get list of jobs added by current authenticated user. */
router.get(
  '/all',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Job.findAll({
      where: { userId: req.user.id }
    }).then((jobs) => {
      return res.status(200).json(jobs);
    });
  }
);

export default router;
