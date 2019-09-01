import { verify } from 'jsonwebtoken';
import models from '../models/index';

const update = async (req, res) => {
  // check if there is a current society ID
  // get the user
  const { orgToken } = req.params;
  const { orgManagerId } = await verify(orgToken, process.env.APP_SECRET);
  const args = req.body;
  if (args.posts != null || args.status != null || args.orgManager != null) {
    res.send({ message: 'Not allowed to edit organization manager, posts and/or status like this.' });
    return;
  }

  const org = await models.Organization.findOneAndUpdate(
    { orgManager: { _id: orgManagerId } },
    {
      $set: { ...args },
    },
    { new: true }
  );

  res.send(org);
};

export const getAll = async (req, res) => {
  const org = await models.Organization.find({});
  res.send(org);
};

export const getOne = async (req, res) => {
  // eslint-disable-next-line no-console
  // console.log(req.query);
  // eslint-disable-next-line no-console
  console.log(req.params.orgToken);
  const org = await models.Organization.findById(req.params.orgToken);
  res.send(org);
};

export default {
  update,
  getAll,
  getOne,
};
