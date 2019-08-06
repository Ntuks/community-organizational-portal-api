const mongoose = require('mongoose');
const winston = require('../config/winston.js');

module.exports = function() {
  const db = process.env.MONGODB_URI;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => winston.info('Database Connection Successful'));
};
