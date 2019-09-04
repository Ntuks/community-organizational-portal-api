import { verify } from 'jsonwebtoken';
import models from '../models/index';

export const update = async (req, res) => {
  const { orgId } = req.params;
  const args = req.body;
  const org = await models.Organization.findOneAndUpdate(
    { _id: orgId },
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
  const org = await models.Organization.findById(req.params.orgToken);
  res.send(org);
};

export default {
  update,
  getAll,
  getOne,
};
