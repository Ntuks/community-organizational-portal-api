/* eslint-disable class-methods-use-this */
import express from 'express';
import user from './routes/user';
import orgmanager from './routes/orgmanager';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

// Express App
const app = express();

// Config
// Config
require('./config/db.js').default();

// Middlewares
// Middlewares
require('./middleware/cookieParser.js').default(app);
require('./middleware/cors.js').default(app);
require('./middleware/bodyParser.js').default(app);

const auth = async () => {
  // Routes that don't need security middleware
  try {
    // eslint-disable-next-line no-console
    console.log('auth is being defined.');
    await user.auth(app);
    await orgmanager.auth(app);
  } catch (error) {
    throw new Error('Something went wrong with the auth system');
  }
};

auth();
// eslint-disable-next-line no-console
console.log('after auth is called.');
require('./middleware/auth.js').default(app);
require('./middleware/morgan.js').default(app);
require('./middleware/error.js').default(app);

// Routes that need to be secured under security middleware
// require('./routes/admin.js')(app);
require('./routes/organization.js').default(app);
// require('./routes/posts.js')(app);

export default { app };
