import { verify } from 'jsonwebtoken';
import models from '../models/index';

export const update = async (req, res) => {
  const { orgId } = req.params;
  const args = req.body;

  // const { orgManagerId } = await verify(orgToken, process.env.APP_SECRET);
  // if (args.posts != null || args.status != null || args.orgManager != null) {
  //   res.send({ message: 'Not allowed to edit organization manager, posts and/or status like this.' });
  //   return;
  // }

  const org = await models.Organization.findOneAndUpdate(
    { _id: orgId },
    {
      $set: { ...args },
    },
    { new: true }
  );

  res.send(org);
};

export const test = async (req, res) => {
  res.send('test');
};

export const getAll = async (req, res) => {
  const org = await models.Organization.find({});
  res.send(org);
};

export const getOne = async (req, res) => {
  console.log(req.params.orgToken);
  const org = await models.Organization.findById(req.params.orgToken);
  res.send(org);
};

export default {
  update,
  getAll,
  getOne,
  test,
};
