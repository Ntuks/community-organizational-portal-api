const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// Decode the jwt so we can get the devId Id on each request, 
// Then verify incoming token before th request hits the graphql resolvers
module.exports = function(app) {
    app.use(async (req, res, next) => {
        const { token } = req.cookies;
        if (token) {
            try {
                const { devId } = await jwt.verify(token, process.env.APP_SECRET);
                // Put the devId onto the reqest for future requests to access
                req.devId = devId;
            } catch (error) {
                throw new AuthenticationError('Your session expired. Sign in again.');
            }
        }
        next();
    });
};