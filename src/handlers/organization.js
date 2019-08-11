import { verify } from 'jsonwebtoken';
import models from '../models/index';

const update = async (req, res) => {
  // check if there is a current society ID
  // get the user
  const { orgToken } = req.params;
  const { orgId } = await verify(orgToken, process.env.APP_SECRET);

  const args = req.body;
  if (args.posts != null || args.status != null || args.orgManager != null) {
    res.send({ message: 'Not allowed to edit organization manager, posts and/or status like this.' });
    return;
  }

  const org = await models.Organization.findOneAndUpdate(
    { orgManager: { _id: orgId } },
    {
      $set: { ...args },
    },
    { new: true }
  );

  res.send(org);
};

export default {
  update,
};
