/** @module src/routes/user */

/** Import dependencies. */
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passport from 'passport';
const router = express.Router();

/** Import defined User schema from sequelize. */
import { User } from '../sequelize';

/** Import secretOrKey option from config/keys. */
import config from '../config/keys';

/** Import validation function. */
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';

/** User signup route */
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = {
    email: req.body.email,
    password: req.body.password
  };
  // Hash password before storing into db
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
    });
  });
  User.findOrCreate({
    where: { email: newUser.email },
    defaults: newUser
  }).spread((user, created) => {
    if (!created) {
      errors.email = 'Email already in use.';
      return res.status(400).json(errors);
    } else {
      return res.status(200).json(user);
    }
  });
});

/** User sign in route. */
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Get input from request body. */
  const email = req.body.email;
  const password = req.body.password;

  /** Find user by email firsts. */
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      errors.email = 'User not found.';
      return res.status(400).json(errors);
    }
    /** Compare input password with hashed password. */
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        /** JWT payload */
        const payload = {
          email: user.email,
          joined: user.createdAt
        };
        /** Sign the token with payload if passwords matched. */
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            return res.status(200).json({
              success: true,
              session: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Incorrect password.';
        return res.status(400).json(errors);
      }
    });
  });
});

/** Get current authenticated user route. */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

export default router;
