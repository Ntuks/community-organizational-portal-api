import { verify } from 'jsonwebtoken';
import models from '../models';

// Decode the jwt so we can get the user Id on each request,
// Then verify incoming token before th request hits the graphql resolvers
export default function(app) {
  app.use(async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      try {
        const { userId, orgId } = await verify(token, process.env.APP_SECRET);
        if (!userId) {
          res.send({ message: 'Not Authenticated as a user - Invalid Token.' });
          return;
        }
        // Put the userId onto the reqest for future requests to access
        req.userId = userId;
        const user = await models.User.findById(req.userId)
          .populate({
            path: 'orgManager',
            select: 'role',
          })
          .select('-password -__v');

        req.user = user;
        req.orgId = orgId;
      } catch (error) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
    next();
  });
}
