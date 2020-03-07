/** @module src/routes/profile */

/** Import dependencies. */
import express from 'express';
import passport from 'passport';
const router = express.Router();

/** Import defined Job schema from sequelize. */
import { User, Profile } from '../sequelize';

/** Import validation function. */
import validateProfileInput from '../validation/profile';

/** Create profile route. */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userProfile = {
      userId: req.user.id,
      username: req.body.username,
      status: req.body.status,
      website: req.body.website || '',
      linkedin: req.body.linkedin || '',
      github: req.body.github || '',
      stackoverflow: req.body.stackoverflow || '',
      dribbble: req.body.dribbble || '',
      twitter: req.body.twitter || ''
    };
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    /** Check if user has a profile already. */
    Profile.findOne({
      where: { userId: userProfile.userId }
    }).then(profile => {
      if (profile) {
        errors.profile = 'You already have a profile.';
        return res.status(400).json(errors);
      } else {
        /** Create profile if user has no profile set up yet. */
        Profile.findOrCreate({
          where: { username: userProfile.username },
          defaults: userProfile
        }).spread((profile, created) => {
          if (!created) {
            /** Must have unique username. */
            errors.username = 'Username already exists.';
            return res.status(400).json(errors);
          } else {
            return res.status(200).json(profile);
          }
        });
      }
    });
  }
);

/** Update profile route. */
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileUpdate = {
      userId: req.user.id,
      username: req.body.username,
      status: req.body.status,
      website: req.body.website || '',
      linkedin: req.body.linkedin || '',
      github: req.body.github || '',
      stackoverflow: req.body.stackoverflow || '',
      dribbble: req.body.dribbble || '',
      twitter: req.body.twitter || ''
    };

    const { errors, isValid } = validateProfileInput(profileUpdate);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    /** Check if username is unique first. */
    Profile.findOne({
      where: { username: profileUpdate.username }
    }).then(profile => {
      /** 400 error if already exists. */
      if (profile && profile.userId !== profileUpdate.userId) {
        errors.username = 'Username already exists.';
        return res.status(400).json(errors);
      } else {
        /** Update profile if username is unique. */
        Profile.update(profileUpdate, {
          returning: true,
          where: { userId: profileUpdate.userId }
        })
          .then(([rowsUpdated, [updatedProfile]]) => {
            return res.status(200).json(updatedProfile);
          })
          .catch(err => {
            return res.status(400).json(err);
          });
      }
    });
  }
);

/** Get list of profiles. */
router.get('/all', (req, res) => {
  Profile.findAll().then(profiles => {
    return res.status(200).json(profiles);
  });
});

/** Get profile of current user. */
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ where: { userId: req.user.id } }).then(profile => {
      User.findOne({ where: { id: req.user.id } }).then(user => {
        return res.status(200).json(profile);
      });
    });
  }
);

/** Get profile of specific user. */
router.get('/:username', (req, res) => {
  Profile.findOne({ where: { username: req.params.username } }).then(
    profile => {
      if (profile) {
        User.findOne({ where: { id: profile.userId } }).then(user => {
          if (user) {
            return res.status(200).json({ email: user.email, profile });
          }
        });
      } else {
        return res
          .status(400)
          .json({ error: 'No profiles found for this user.' });
      }
    }
  );
});

export default router;
