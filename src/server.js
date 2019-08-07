/* eslint-disable class-methods-use-this */
import express from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

// Express App
const app = express();

class Server {
  // Express App
  app = express();

  constructor() {
    this.initDB();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  initDB() {
    // Config
    require('./config/db.js')();
  }

  initExpressMiddleware() {
    // Middlewares
    require('./middleware/cookieParser.js')(app);
    require('./middleware/auth.js')(app);
    require('./middleware/cors.js')(app);
    require('./middleware/loggedIn.js')(app);
    require('./middleware/bodyParser.js')(app);
    require('./middleware/morgan.js')(app);
    require('./middleware/error.js')(app);
  }

  initRoutes() {
    // Routes
    require('./routes/auth.js')(app);
    require('./routes/user.js')(app);
    require('./routes/video.js')(app);
  }

  start() {
    app.listen(process.env.PORT, () => {
      console.log(`🚀Express Server is now running on port: ${process.env.PORT}!!! Enjoy moderately`);
    });
  }
}

new Server();
