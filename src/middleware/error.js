import winston from '../config/winston';

export default function(app) {
  app.use((err, req, res, next) => {
    // Including the winston logger
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // Rendering the error page
    res.status(err.status || 500);
    res.status(500).send('Something went wrong.');
  });
}
