const { skip } = require('graphql-resolvers');
const { ForbiddenError } = require('apollo-server');

const isAuthenticated = (_, args, { req: { devId } }) => 
    devId ? skip : new ForbiddenError('Not Authenticated as a developer.');

module.exports = isAuthenticated;