import { verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import models from '../models/index';

const createCampaign = async (req, res) => {
  try {
    // check if the token of the user allows them to create a campaign.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to campaign. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const { title, description, location, time, date, poster } = args;

    // check if this campaign already exists
    let campaign = await models.Campaign.findOne({ title }).select('-__v');
    if (campaign) {
      res.send({ message: 'Campaign already exists.' });
      return;
    }

    // create and save new campaign
    campaign = new models.Campaign({
      _id: Types.ObjectId(),
      title,
      description,
      location,
      time,
      date,
      poster,
      organization: org._id,
      orgManager: org.orgManager._id,
    });
    try {
      await campaign.save();
      res.send(campaign);
    } catch (error) {
      res.send({
        message: error.message.substring(error.message.lastIndexOf(':') + 2),
      });
      return;
    }

    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $push: {
          campaigns: campaign,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $push: {
          campaigns: campaign,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getCampaign = async (req, res) => {
  try {
    // check if the token of the user allows them to create a campaign.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to campaign. Account not yet activated.',
      });
      return;
    }

    const { campaignId } = req.params;
    const campaign = await models.Campaign.findOne({ _id: campaignId }).select('-__v');

    res.send(campaign);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getAllCampaigns = async (req, res) => {
  try {
    // check if the token of the user allows them to create a campaign.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to campaign. Account not yet activated.',
      });
      return;
    }

    // check if this campaign already exists
    const campaigns = await models.Campaign.find().select('-__v');
    res.send(campaigns);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const updateCampaign = async (req, res) => {
  try {
    // check if the token of the user allows them to create a campaign.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (org.status === 'INACTIVE') {
      res.send({
        message: 'Not allowed to campaign. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const campaign = await models.Campaign.findOneAndUpdate(
      { _id: args._id },
      {
        $set: { ...args },
      },
      { new: true }
    );

    res.send(campaign);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    // check if the token of the user allows them to create a campaign.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org) {
      res.send({
        message: 'Not allowed to delete the campaign.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }
    const { campaignId } = req.params;
    const campaign = await models.Campaign.findByIdAndRemove({ _id: campaignId });
    res.send({
      message: 'Campaign deleted successfully.',
    });

    // this functionality has not been tested yet --> might be buggy
    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $pop: {
          campaigns: campaign,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $pop: {
          campaigns: campaign,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

export default {
  createCampaign,
  getCampaign,
  getAllCampaigns,
  updateCampaign,
  deleteCampaign,
};
