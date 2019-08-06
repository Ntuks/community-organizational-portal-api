require('winston-mongodb');
const winston = require('winston');
const appRoot = require('app-root-path');

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
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.json(), winston.format.colorize(), winston.format.simple()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI,
      collection: 'logs',
    }),
  ],
  handleExceptions: [
    new winston.transports.File({
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

module.exports = logger;
