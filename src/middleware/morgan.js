const morgan = require('morgan');
const winston = require('../config/winston');

module.exports = function(app) {
    app.use(morgan('combined', { stream: winston.stream }));
};