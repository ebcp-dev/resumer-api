/** @module src/routes/data */

/** Import dependencies. */
import express from 'express';
import passport from 'passport';
const router = express.Router();

/** Import defined Job schema from sequelize. */
import { User, Data } from '../sequelize';

/** Import validation function. */
import validateDataInput from '../validation/data';

/** Create data route. */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userData = {
      userId: req.user.id,
      uniqueData: req.body.uniqueData
    };
    const { errors, isValid } = validateDataInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    /** Check if data is unique. */
    Data.findOrCreate({
      where: { uniqueData: userData.uniqueData },
      defaults: userData
    }).spread((userData, created) => {
      if (!created) {
        /** Must have unique uniqueData. */
        errors.uniqueData = 'uniqueData already exists.';
        return res.status(400).json(errors);
      } else {
        return res.status(200).json(userData);
      }
    });
  }
);

/** Update data route. */
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const dataUpdate = {
      userId: req.user.id,
      uniqueData: req.body.uniqueData
    };

    const { errors, isValid } = validateDataInput(dataUpdate);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    /** Check if uniqueData is unique first. */
    Data.findOne({
      where: { uniqueData: dataUpdate.uniqueData }
    }).then((data) => {
      /** 400 error if already exists. */
      if (data && data.userId !== dataUpdate.userId) {
        errors.uniqueData = 'uniqueData already exists.';
        return res.status(400).json(errors);
      } else {
        /** Update data if uniqueData is unique. */
        Data.update(dataUpdate, {
          returning: true,
          where: { userId: dataUpdate.userId }
        })
          .then(([rowsUpdated, [updatedData]]) => {
            return res.status(200).json(updatedData);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    });
  }
);

/** Get list of data. */
router.get('/all', (req, res) => {
  Data.findAll().then((data) => {
    return res.status(200).json(data);
  });
});

/** Get data of current user. */
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Data.findOne({ where: { userId: req.user.id } }).then((data) => {
      User.findOne({ where: { id: req.user.id } }).then((user) => {
        return res.status(200).json(data);
      });
    });
  }
);

/** Get data of specific user. */
router.get('/:uniqueData', (req, res) => {
  Data.findOne({ where: { uniqueData: req.params.uniqueData } }).then(
    (data) => {
      if (data) {
        User.findOne({ where: { id: data.userId } }).then((user) => {
          if (user) {
            return res.status(200).json({ email: user.email, data });
          }
        });
      } else {
        return res.status(400).json({ error: 'No data found for this user.' });
      }
    }
  );
});

/** Delete data route. */
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    let dataToDelete = req.body.uniqueDataList || [];
    Data.destroy({
      where: { userId: req.user.id, uniqueData: dataToDelete }
    }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ deleted: true });
      } else {
        return res.status(400).json({ deleted: false });
      }
    });
  }
);

export default router;
