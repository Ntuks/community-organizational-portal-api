import models from '../models/index';

const activateOrganization = async (req, res) => {
  const { status, orgId } = req.body;
  if (orgId === '') {
    res.send({ message: 'Please provide the organization id.' });
    return;
  }

  const org = await models.Organization.findOneAndUpdate(
    { _id: orgId },
    {
      $set: { status },
    },
    { new: true }
  );

  if (!org) {
    res.send({ message: 'No organization found with the given orgId.' });
    return;
  }

  res.send(org);
};

const deactivateOrganization = async (req, res) => {
  const { status, orgId } = req.body;
  if (orgId === '') {
    res.send({ message: 'Please provide the organization id.' });
    return;
  }

  const org = await models.Organization.findOneAndUpdate(
    { _id: orgId },
    {
      $set: { status },
    },
    { new: true }
  );

  if (!org) {
    res.send({ message: 'No organization found with the given orgId.' });
    return;
  }

  res.send(org);
};

export default {
  activateOrganization,
  deactivateOrganization,
};
