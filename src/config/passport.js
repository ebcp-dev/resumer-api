/** @module src/config/passport */

/** Import passport jwt strategy.  */
import passportJWT from 'passport-jwt';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import config from './keys';

/** Import defined User schema from sequelize. */
import { User } from '../sequelize';

/** Define options object to pass into JwtStrategy function. */
const opts = {};
/** Get token from Authorization Header. */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

/**
 * Create new JwtStrategy with passport.
 * Returns the payload once authenticated.
 * @param {passport} passport
 */
const useJwt = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ where: { email: jwt_payload.email } }).then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};

/** Export the function. */
export default useJwt;
