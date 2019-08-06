const models = require('../models');

module.exports = function(app){
    // This middleware populates the dev object on each request
    app.use(async (req, res, next) => {
        // if the dev is not logged in, skip this
        if (!req.devId) return next();

        const dev = await models.Developer.findById(req.devId);
        req.dev = dev;
        next();
    });
};
