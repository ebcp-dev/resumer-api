/** @module src/server */
import 'babel-polyfill';
/** Import express and passport dependencies. */
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

/** Define express variable. */
const app = express();
/** Define environment port variable. */
const port = process.env.PORT || 5000;

/** Have express use middleware. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

/** Import and use passport config. */
import useJwt from './config/passport';
useJwt(passport);

/** Define API routes. */
app.use('/api/user', require('./routes/user').default);
app.use('/api/data', require('./routes/data').default);

/** Server listen to port on 'Database ready' event. */
app.on('Database ready.', () => {
  app.listen(port, () => console.log(`Server running on port ${port}.`));
});

export default app;
