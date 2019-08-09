import 'winston-mongodb';
import { createLogger, format as _format, transports as _transports } from 'winston';
import appRoot from 'app-root-path';

// Defining the custom settings for each transport (file and console in this case)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    prettyPrint: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
  },
};

// Instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: _format.combine(_format.json(), _format.colorize(), _format.simple()),
  transports: [
    new _transports.File(options.file),
    new _transports.Console(options.console),
    new _transports.MongoDB({
      db: process.env.MONGODB_URI,
      collection: 'logs',
    }),
  ],
  handleExceptions: [
    new _transports.File({
      filename: `${appRoot}/logs/unCaughtExceptions.log`,
    }),
  ],
  exitOnError: false,
});

// Create a stream object with a 'write' function that will be use by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so that the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
